import { useMemo, useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import LanguageToggle, { labels } from "../components/LanguageToggle";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => labels[lang], [lang]);

  return (
    <main className="min-h-screen bg-secondary dark:bg-secondaryD text-ink dark:text-inkD">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 md:px-8 py-5">
        <div className="text-2xl font-bold tracking-tight text-primary dark:text-accentD">
          SereneSpace
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle onChange={setLang} />
          <a
            href="/login"
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                       hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
          >
            {t.login}
          </a>
          <a
            href="/signup"
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                       hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
          >
            {t.signup}
          </a>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-8 py-12 md:py-16">
        <div className="rounded-3xl bg-gradient-to-b from-accent/40 to-transparent dark:from-accentD/15 p-6 md:p-10">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-ink dark:text-inkD">
                Your calm space to heal, reflect, and grow.
              </h1>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
                Explore our supportive tools — no login needed.
              </p>
              <a
                href="#features"
                className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-black hover:bg-primaryD shadow-md"
              >
                {t.explore}
              </a>
            </div>

            {/* Illustration placeholder */}
            <div className="flex justify-center">
              <div className="w-[340px] md:w-[440px] h-[240px] rounded-2xl
                bg-white dark:bg-cardD
                border border-accent/40 dark:border-cardBorderD
                grid place-items-center shadow-sm">
                <span className="text-primary dark:text-accentD font-semibold">
                  Calm Cloud / Lottie here
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anonymous features */}
      <section id="features" className="mx-auto w-full max-w-6xl px-6 md:px-8 pb-20">
        <h2 className="text-2xl md:text-3xl font-semibold">Try these features anonymously</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="24/7 AI Support Buddy (Guest)"
            desc="Anonymous chat. Conversations stored by date on this device."
            to="/anon/chat"
          />
          <FeatureCard
            title="Usual Daily Life (Audios)"
            desc="Quick relief tracks for overwhelm, breakup, anger & more."
            to="/anon/daily-life"
          />
          <FeatureCard
            title="Professional Help (Audio/Video)"
            desc="Trusted resources and guidance to seek professional support."
            to="/anon/pro-help"
          />
          <FeatureCard
            title="Stories of Others"
            desc="Short, uplifting journeys for courage, peace, and self-respect."
            to="/anon/stories"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SereneSpace · Built with care
      </footer>
    </main>
  );
}
