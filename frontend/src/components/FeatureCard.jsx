import { Link } from "react-router-dom";

export default function FeatureCard({ title, desc, to }) {
  return (
    <Link
      to={to}
      className="group rounded-xl2 bg-ssCardBg border border-ssCardBrd p-6
                 shadow-ss hover:shadow-lg transition
                 focus:outline-none focus:ring-2 focus:ring-ssPrimary/30"
    >
      <h3 className="text-lg font-semibold text-ssNavy group-hover:text-ssPrimary">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ssText/85">{desc}</p>
      <span className="mt-4 inline-flex items-center text-sm font-semibold
                       text-ssPrimary">
        Try Now →
      </span>
    </Link>
  );
}
