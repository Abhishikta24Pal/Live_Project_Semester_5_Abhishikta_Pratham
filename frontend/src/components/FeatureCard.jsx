
import { Link } from "react-router-dom";

export default function FeatureCard({ title, title_hi, desc, desc_hi, to, lang = "en" }) {
  // automatic Hindi/English selection
  const t = (en, hi) => (lang === "hi" ? hi || en : en);

  return (
    <Link
      to={to}
      className="rounded-2xl bg-white dark:bg-ssCardBgD border border-ssCardBrd p-6 shadow-ss hover:shadow-md transition flex flex-col justify-between"
    >
      <div>
        <h3 className="font-semibold text-ssNavy dark:text-ssNavyD text-lg">
          {t(title, title_hi)}
        </h3>
        <p className="mt-2 text-sm opacity-70">
          {t(desc, desc_hi)}
        </p>
      </div>

      <div className="mt-4 text-sm font-semibold text-ssPrimary hover:underline">
        {t("Try Now →", "अभी आज़माएँ →")}
      </div>
    </Link>
  );
}
