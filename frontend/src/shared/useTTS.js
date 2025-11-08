import { useEffect, useRef, useState } from "react";

export default function useTTS() {
  const [voices, setVoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const utterRef = useRef(null);

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis?.getVoices() || [];
      setVoices(v);
      // restore saved voice
      const saved = localStorage.getItem("tts_voice_name");
      const pick = v.find(x => x.name === saved) || v[0] || null;
      setSelected(pick || null);
    };
    load();
    window.speechSynthesis?.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", load);
  }, []);

  function speak(text) {
    stop();
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    if (selected) u.voice = selected;
    u.rate = rate;
    u.pitch = pitch;
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  }

  function stop() {
    window.speechSynthesis?.cancel();
    utterRef.current = null;
  }

  function saveVoice(name) {
    localStorage.setItem("tts_voice_name", name);
  }

  return {
    voices, selected, setSelected, rate, setRate, pitch, setPitch,
    speak, stop, saveVoice
  };
}
