import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;
const rooms = new Map(); // roomId -> Set<WebSocket>
const wss = new WebSocketServer({ port: PORT });

function joinRoom(roomId, ws) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws.roomId = roomId;
  ws.send(JSON.stringify({ type: "system", message: `Joined ${roomId}` }));

  // notify others
  for (const peer of rooms.get(roomId)) {
    if (peer !== ws && peer.readyState === 1) {
      peer.send(JSON.stringify({ type: "peer-joined" }));
    }
  }
}

function broadcastSignal(ws, payload) {
  const peers = rooms.get(ws.roomId) || new Set();
  for (const peer of peers) {
    if (peer !== ws && peer.readyState === 1) {
      peer.send(JSON.stringify(payload));
    }
  }
}

wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    const { type, roomId, data } = msg;

    if (type === "join" && roomId) {
      joinRoom(roomId, ws);
    }

    if (type === "signal" && ws.roomId) {
      broadcastSignal(ws, { type: "signal", data });
    }
  });

  ws.on("close", () => {
    const roomId = ws.roomId;
    if (!roomId) return;
    const peers = rooms.get(roomId);
    if (!peers) return;

    peers.delete(ws);
    for (const peer of peers) {
      if (peer.readyState === 1) peer.send(JSON.stringify({ type: "peer-left" }));
    }
    if (peers.size === 0) rooms.delete(roomId);
  });
});

console.log(`Signaling server running on ws://localhost:${PORT}`);
