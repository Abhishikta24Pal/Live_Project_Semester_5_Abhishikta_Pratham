import { Link } from "react-router-dom";

export default function FeatureCard({ title, desc, to }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl bg-white dark:bg-cardD
                 border border-gray-100 dark:border-cardBorderD
                 p-6 shadow-sm hover:shadow-lg hover:-translate-y-[2px]
                 focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <h3 className="text-lg font-semibold text-ink dark:text-inkD group-hover:text-primary dark:group-hover:text-accentD">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{desc}</p>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-primary dark:text-accentD">
        Try Now →
      </span>
    </Link>
  );
}
