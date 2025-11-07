import { useState } from "react";

const labels = {
  en: { login: "Log in", signup: "Sign up", explore: "Start Exploring" },
  hi: { login: "लॉग इन", signup: "साइन अप", explore: "शुरू करें" },
};

export default function LanguageToggle({ onChange }) {
  const [lang, setLang] = useState("en");
  const switchLang = () => {
    const next = lang === "en" ? "hi" : "en";
    setLang(next);
    onChange?.(next);
  };
  return (
    <button
      onClick={switchLang}
      aria-label="Toggle language"
      className="rounded-xl border px-3 py-1 text-sm font-medium
                 border-gray-200 dark:border-gray-700
                 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {lang.toUpperCase()}
    </button>
  );
}

export { labels };
