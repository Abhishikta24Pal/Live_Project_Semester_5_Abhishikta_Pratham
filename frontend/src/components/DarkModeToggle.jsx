import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return false; 
    });


  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(v => !v)}
      aria-label="Toggle dark mode"
      className="rounded-xl border px-3 py-1 text-sm font-medium
                 border-gray-200 dark:border-gray-700
                 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {enabled ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
