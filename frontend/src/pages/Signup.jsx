import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DarkModeToggle from "../components/DarkModeToggle";
import LanguageToggle from "../components/LanguageToggle";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, signInWithGoogle } = useAuth();

  const [lang, setLang] = useState("en");
  const t = (en, hi) => (lang === "en" ? en : hi);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(t("Passwords do not match", "पासवर्ड मेल नहीं खाते"));
      return;
    }

    try {
      setLoading(true);
      await signup(formData.email, formData.password, { name: formData.name });
      navigate("/MainDashboard");
    } catch (err) {
      setError(err.message || t("Signup failed", "साइन अप विफल"));
    } finally {
      setLoading(false);
    }
  };

  async function handleGoogle() {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate("/MainDashboard");
    } catch (err) {
      setError(err.message || t("Google sign-in failed", "गूगल साइन-इन विफल"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD flex items-center justify-center px-4">

      {/* TOP RIGHT TOGGLES */}
      <div className="absolute top-4 right-4 flex gap-3">
        <LanguageToggle onChange={setLang} />
        <DarkModeToggle />
      </div>

      <div className="w-full max-w-md bg-ssCardBg dark:bg-ssCardBgD border border-ssCardBrd dark:border-ssCardBrd rounded-2xl p-8 shadow-ss">

        <h1 className="text-2xl font-bold text-center text-ssNavy dark:text-ssNavyD mb-2">
          {t("Create an account", "खाता बनाएँ")}
        </h1>

        <p className="text-center text-sm text-ssText/80 mb-6">
          {t("Join SereneSpace — your calm journey begins here", "सीरीनस्पेस से जुड़ें — आपकी शांत यात्रा यहीं से शुरू होती है")}
        </p>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("Name", "नाम")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("Enter your name", "अपना नाम दर्ज करें")}
              required
              className="w-full px-4 py-2 rounded-lg border border-ssCardBrd dark:border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("Email", "ईमेल")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("you@example.com", "example@mail.com")}
              required
              className="w-full px-4 py-2 rounded-lg border border-ssCardBrd dark:border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("Password", "पासवर्ड")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-lg border border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("Confirm Password", "पासवर्ड फिर से दर्ज करें")}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-lg border border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary"
            />
          </div>

          {/* SIGN UP BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ssPrimary hover:bg-ssPrimaryH text-white py-2.5 rounded-lg font-medium shadow-ss"
          >
            {loading
              ? t("Signing up...", "साइन अप हो रहा है...")
              : t("Sign Up", "साइन अप करें")}
          </button>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full py-2 mt-2 bg-white border border-ssCardBrd text-ssNavy rounded-lg hover:bg-[#f6fbff]"
          >
            {t("Continue with Google", "Google के साथ जारी रखें")}
          </button>

          {/* ALREADY ACCOUNT */}
          <p className="text-center text-sm text-ssText/85 mt-2">
            {t("Already have an account?", "पहले से खाता है?")}{" "}
            <Link to="/login" className="text-ssPrimary hover:underline">
              {t("Log in", "लॉगिन करें")}
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}
