// frontend/src/pages/Home.jsx
import DarkModeToggle from "../components/DarkModeToggle";
import LanguageToggle from "../components/LanguageToggle";
import FeatureCard from "../components/FeatureCard";
import CloudLottie from "../components/CloudLottie";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = (en, hi) => (lang === "en" ? en : hi);

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 md:px-8 py-5">
        <div className="text-2xl font-bold tracking-tight text-ssNavy dark:text-ssNavyD">
          {t("SereneSpace", "सीरीनस्पेस")}
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle onChange={setLang} />
          <a
            href="/login"
            className="px-4 py-2 rounded-xl bg-ssPrimary text-white hover:bg-ssPrimaryH
              shadow-ss text-sm font-medium"
          >
            {t("Login", "लॉगिन")}
          </a>
          <a
            href="/signup"
            className="px-4 py-2 rounded-xl bg-ssPrimary text-white hover:bg-ssPrimaryH
              shadow-ss text-sm font-medium"
          >
            {t("Sign Up", "साइन अप")}
          </a>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-8 py-12 md:py-16">
        <div
          className="rounded-3xl bg-white/50 border border-ssCardBrd
                dark:bg-ssCardBgD/50 dark:border-ssCardBrd p-6 md:p-10 shadow-ss"
        >
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                {t(
                  "Your calm space to heal, reflect, and grow.",
                  "चंगा होने, सोचने और आगे बढ़ने के लिए आपका शांत स्थान।"
                )}
              </h1>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
                {t("Explore our supportive tools.", "हमारे सहायक साधनों को देखें।")}
              </p>
              <a
                href="#features"
                className="mt-6 inline-block rounded-xl bg-ssPrimary px-6 py-3 text-white hover:bg-ssPrimaryH shadow-ss"
              >
                {t("Start Exploring", "खोज शुरू करें")}
              </a>
            </div>

            {/* LottieAnimation Placeholder */}
            <div className="flex justify-center">
              <div
                className="w-[340px] md:w-[440px] h-[240px] rounded-2xl
                    bg-ssCardBg border border-ssCardBrd grid place-items-center shadow-ss overflow-hidden"
                aria-label="Calm cloud animation"
              >
                <CloudLottie />
              </div>
            </div>
          </div>
        </div>
      </section>
            {/*Features*/}
      <section id="features" className="mx-auto w-full max-w-6xl px-6 md:px-8 pb-20">
  <h2 className="text-2xl md:text-3xl font-semibold text-ssNavy">
    {t("Try these features", "इन सुविधाओं को आज़माएँ")}
  </h2>

  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <FeatureCard
      lang={lang}
      title="24/7 AI Support Buddy (Guest)"
      title_hi="24/7 एआई सपोर्ट साथी (मेहमान)"
      desc="Anonymous chat. Conversations stored by date on this device."
      desc_hi="गुमनाम चैट। बातचीत इस डिवाइस पर तारीख के अनुसार सुरक्षित रहती है।"
      to="/anon/chat"
    />

    <FeatureCard
      lang={lang}
      title="Usual Daily Life (Audios)"
      title_hi="दैनिक जीवन सहायता (ऑडियो)"
      desc="Quick relief tracks for overwhelm, breakup, anger & more."
      desc_hi="तनाव, ब्रेकअप, गुस्से और अन्य भावनाओं के लिए त्वरित राहत ऑडियो।"
      to="/anon/daily-life"
    />

    <FeatureCard
      lang={lang}
      title="Professional Help (Audio/Video)"
      title_hi="पेशेवर सहायता (ऑडियो/वीडियो)"
      desc="Trusted resources and guidance to seek professional support."
      desc_hi="पेशेवर सहायता के लिए विश्वसनीय संसाधन और मार्गदर्शन।"
      to="/anon/pro-help"
    />

    <FeatureCard
      lang={lang}
      title="Stories of Others"
      title_hi="दूसरों की कहानियाँ"
      desc="Short, uplifting journeys for courage, peace, and self-respect."
      desc_hi="साहस, शांति और आत्म-सम्मान बढ़ाने वाली छोटी प्रेरक कहानियाँ।"
      to="/anon/stories"
    />
  </div>
</section>


      {/* Footer */}
<footer className="bg-[#F5F7FD] dark:bg-[#0F1117] mt-10 pt-12 pb-6 border-t border-gray-300 dark:border-gray-700">
  <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

    {/* Brand */}
    <div>
      <h3 className="text-xl font-bold text-ssNavy dark:text-white">SereneSpace</h3>

      <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
        {lang === "en"
          ? "Enhancing well-being with supportive tools and mindful experiences."
          : "सहायक उपकरणों और माइंडफुल अनुभवों के साथ कल्याण बढ़ाना।"}
      </p>
    </div>

    {/* Quick Overview (Static Text Only, No Links) */}
    <div>
      <h4 className="font-semibold text-ssNavy dark:text-white mb-3">
        {lang === "en" ? "Quick Overview" : "तसिंहावलोकन"}
      </h4>

      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
        <li>{lang === "en" ? "AI Buddy" : "एआई साथी"}</li>
        <li>{lang === "en" ? "Meditation" : "ध्यान"}</li>
        <li>{lang === "en" ? "Daily Life Audios" : "दैनिक जीवन ऑडियो"}</li>
        <li>{lang === "en" ? "Anxiety Support" : "चिंता सहायता"}</li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h4 className="font-semibold text-ssNavy dark:text-white mb-3">
        {lang === "en" ? "Company" : "कंपनी"}
      </h4>

      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
        <li>{lang === "en" ? "About" : "हमारे बारे में"}</li>
        <li>{lang === "en" ? "Careers" : "करियर"}</li>
        <li>{lang === "en" ? "Team" : "टीम"}</li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h4 className="font-semibold text-ssNavy dark:text-white mb-3">
        {lang === "en" ? "Contact" : "संपर्क"}
      </h4>

      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
        <li>📧 support@serenespace.com</li>
        <li>📞 +91 98765 43210</li>
        <li>{lang === "en" ? "📍 India" : "📍 भारत"}</li>
      </ul>
    </div>

  </div>

  {/* Bottom Strip */}
  <div className="mt-10 pt-4 border-t border-gray-300 dark:border-gray-700 text-center text-xs text-gray-600 dark:text-gray-400">
    © {new Date().getFullYear()} SereneSpace —
    {lang === "en" ? "All rights reserved." : "सर्वाधिकार सुरक्षित।"}
  </div>
</footer>

    </main>
  );
}
