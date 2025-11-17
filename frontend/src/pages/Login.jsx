import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DarkModeToggle from "../components/DarkModeToggle";
import LanguageToggle from "../components/LanguageToggle";

export default function Login() {
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();

  const [lang, setLang] = useState("en");
  const t = (en, hi) => (lang === "en" ? en : hi);

  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/MainDashboard");
    } catch (err) {
      setError(err.message || t("Login failed", "लॉगिन विफल"));
    } finally {
      setLoading(false);
    }
  };

  async function handleGoogle() {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      navigate("/MainDashboard");
    } catch (err) {
      setError(err.message || t("Google sign-in failed", "गूगल साइन-इन विफल"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ssBg dark:bg-ssBgD text-ssText dark:text-ssNavyD flex items-center justify-center px-4">

      {/* TOP RIGHT TOGGLES */}
      <div className="absolute top-4 right-4 flex gap-3">
        <LanguageToggle onChange={setLang} />
        <DarkModeToggle />
      </div>

      <div className="w-full max-w-md bg-ssCardBg dark:bg-ssCardBgD border border-ssCardBrd dark:border-ssCardBrd rounded-2xl p-8 shadow-ss">

        <h1 className="text-2xl font-bold text-center text-ssNavy dark:text-ssNavyD mb-2">
          {t("Welcome back", "वापसी पर स्वागत है")}
        </h1>

        <p className="text-center text-sm text-ssText/80 mb-6">
          {t("Log in to continue your calm journey", "अपनी शांत यात्रा जारी रखने के लिए लॉगिन करें")}
        </p>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">{t("Email", "ईमेल")}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder={t("you@example.com", "example@mail.com")}
              required
              className="w-full px-4 py-2 rounded-lg border border-ssCardBrd dark:border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">{t("Password", "पासवर्ड")}</label>
            <div className="flex gap-2">
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 rounded-lg border border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="px-3 rounded-lg border border-ssCardBrd text-sm"
              >
                {t(showPwd ? "Hide" : "Show", showPwd ? "छुपाएँ" : "देखें")}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="remember" checked={form.remember} onChange={onChange} />
              {t("Remember me", "मुझे याद रखें")}
            </label>

            <Link to="/forgot-password" className="text-sm text-ssPrimary">
              {t("Forgot password?", "पासवर्ड भूल गए?")}
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ssPrimary hover:bg-ssPrimaryH text-white py-2.5 rounded-lg"
          >
            {loading ? t("Logging in...", "लॉगिन हो रहा है...") : t("Log In", "लॉगिन करें")}
          </button>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full py-2 mt-2 bg-white border border-ssCardBrd text-ssNavy rounded-lg"
          >
            {t("Continue with Google", "Google के साथ जारी रखें")}
          </button>

          {/* Bottom link */}
          <p className="text-center text-sm mt-2">
            {t("New here?", "नए हैं?")}{" "}
            <Link to="/signup" className="text-ssPrimary">
              {t("Create an account", "खाता बनाएँ")}
            </Link>
          </p>
        </form>

      </div>
    </main>
  );
}
