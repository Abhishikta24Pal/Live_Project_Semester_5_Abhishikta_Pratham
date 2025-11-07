import { useEffect, useRef, useState } from "react";

const SIGNAL_URL = import.meta.env.VITE_SIGNAL_URL || "ws://localhost:8080";
const iceServers = [{ urls: "stun:stun.l.google.com:19302" }];

export default function ProHelp() {
  const [roomId, setRoomId] = useState("");
  const [connected, setConnected] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [log, setLog] = useState([]);

  const wsRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const localAudioRef = useRef(null);
  const pendingCandidatesRef = useRef([]); // NEW

  const pushLog = (m) => setLog((p) => [...p, `[${new Date().toLocaleTimeString()}] ${m}`]);

  useEffect(() => {
    return () => {
      endCall();
      if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.close();
    };
  }, []);

  function connectWS() {
    if (!roomId || wsRef.current?.readyState === WebSocket.OPEN) return;
    const ws = new WebSocket(SIGNAL_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      pushLog("Signaling connected");
      ws.send(JSON.stringify({ type: "join", roomId }));
    };

    // UPDATED HANDLER
    ws.onmessage = async (ev) => {
      const payload = JSON.parse(ev.data);
      if (payload.type === "system") pushLog(payload.message);
      if (payload.type === "peer-joined") pushLog("Peer joined");
      if (payload.type === "peer-left") pushLog("Peer left");

      if (payload.type === "signal") {
        const { data } = payload;
        await ensurePC();
        const pc = pcRef.current;

        if (data.sdp) {
          await pc.setRemoteDescription(data.sdp);
          pushLog(`Remote SDP set (${data.sdp.type})`);

          // Drain queued candidates
          if (pendingCandidatesRef.current.length) {
            pushLog(`Draining ${pendingCandidatesRef.current.length} queued ICE candidates`);
            for (const c of pendingCandidatesRef.current) {
              try { await pc.addIceCandidate(c); }
              catch (e) { pushLog("Queued ICE add error: " + e.message); }
            }
            pendingCandidatesRef.current = [];
          }

          if (data.sdp.type === "offer") {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            ws.send(JSON.stringify({ type: "signal", data: { sdp: pc.localDescription } }));
            pushLog("Sent SDP answer");
          }
        } else if (data.candidate) {
          if (!pc.remoteDescription) {
            pendingCandidatesRef.current.push(data.candidate);
            pushLog("Queued ICE (remote SDP not set yet)");
          } else {
            try { await pc.addIceCandidate(data.candidate); }
            catch (e) { pushLog("ICE add error: " + e.message); }
          }
        }
      }
    };

    ws.onclose = () => {
      setConnected(false);
      pushLog("Signaling disconnected");
    };
    ws.onerror = () => pushLog("WS error");
  }

  async function ensurePC() {
    if (pcRef.current) return pcRef.current;

    const pc = new RTCPeerConnection({ iceServers });
    pcRef.current = pc;

    pc.onicecandidate = (e) => {
      if (e.candidate && wsRef.current?.readyState === WebSocket.OPEN) {
        pushLog("Local ICE → sending");
        wsRef.current.send(JSON.stringify({ type: "signal", data: { candidate: e.candidate } }));
      }
    };

    pc.ontrack = (e) => {
      const [stream] = e.streams;
      if (remoteAudioRef.current) remoteAudioRef.current.srcObject = stream;
    };

    // mic
    if (!localStreamRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;
      if (localAudioRef.current) localAudioRef.current.srcObject = stream;
    }
    // add tracks
    localStreamRef.current.getTracks().forEach((t) => pc.addTrack(t, localStreamRef.current));
    return pc;
  }

  async function startCall(offerer = true) {
    try {
      await ensurePC();
      setInCall(true);
      pushLog(offerer ? "Starting (offerer)..." : "Answerer waiting...");

      if (offerer) {
        const offer = await pcRef.current.createOffer({ offerToReceiveAudio: true });
        await pcRef.current.setLocalDescription(offer);
        wsRef.current?.send(JSON.stringify({ type: "signal", data: { sdp: pcRef.current.localDescription } }));
        pushLog("Sent SDP offer");
      }
    } catch (e) {
      pushLog("Start call error: " + e.message);
    }
  }

  function endCall() {
    setInCall(false);
    if (pcRef.current) {
      pcRef.current.getSenders().forEach((s) => s.track && s.track.stop());
      pcRef.current.onicecandidate = null;
      pcRef.current.ontrack = null;
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    pendingCandidatesRef.current = [];
  }

  const disabled = !roomId || !connected;

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-ssCardBg dark:bg-ssCardBgD border border-ssCardBrd p-6 shadow-ss">
          <h1 className="text-2xl font-bold text-ssNavy dark:text-ssNavyD">Professional Help · Audio Call</h1>
          <p className="text-sm text-ssText/80 mt-1">WebRTC audio-only with custom WebSocket signaling. No DB.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <input
              className="px-4 py-2 rounded-lg border border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary focus:outline-none"
              placeholder="Enter room ID (e.g., therapy-123)"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.trim())}
            />
            <div className="flex gap-2">
              <button
                onClick={connectWS}
                className="px-4 py-2 rounded-lg bg-ssPrimary text-white hover:bg-ssPrimaryH shadow-ss disabled:opacity-60"
                disabled={!roomId || connected}
              >
                {connected ? "Connected" : "Connect"}
              </button>
              <button
                onClick={() => startCall(true)}
                className="px-4 py-2 rounded-lg border border-ssCardBrd hover:bg-white/60 dark:hover:bg-ssCardBgD/60 disabled:opacity-60"
                disabled={disabled || inCall}
              >
                Start (Offer)
              </button>
              <button
                onClick={() => startCall(false)}
                className="px-4 py-2 rounded-lg border border-ssCardBrd hover:bg-white/60 dark:hover:bg-ssCardBgD/60 disabled:opacity-60"
                disabled={disabled || inCall}
              >
                Wait (Answer)
              </button>
              <button
                onClick={endCall}
                className="px-4 py-2 rounded-lg border border-ssCardBrd text-red-600 hover:bg-red-50 disabled:opacity-60"
                disabled={!inCall}
              >
                End
              </button>
            </div>
          </div>

          {/* Hidden audio elements */}
          <div className="sr-only">
            <audio ref={localAudioRef} autoPlay muted playsInline />
            <audio ref={remoteAudioRef} autoPlay playsInline />
          </div>

          {/* Logs */}
          <div className="mt-6 h-44 overflow-auto rounded-lg border border-ssCardBrd bg-white dark:bg-ssCardBgD p-3 text-xs">
            {log.map((l, i) => <div key={i}>{l}</div>)}
          </div>

          <p className="mt-3 text-xs text-ssText/70">
            Test: open in two tabs, same <b>room ID</b>. Click <i>Connect</i> on both. Then on one tab click <i>Start (Offer)</i>,
            and on the other click <i>Wait (Answer)</i>.
          </p>
        </div>
      </div>
    </main>
  );
}
