import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();
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
      console.error(err);
      setError(err.message || "Login failed");
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
      console.error(err);
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-ssCardBg dark:bg-ssCardBgD border border-ssCardBrd dark:border-ssCardBrd rounded-2xl p-8 shadow-ss">
        <h1 className="text-2xl font-bold text-center text-ssNavy dark:text-ssNavyD mb-2">Welcome back</h1>
        <p className="text-center text-sm text-ssText/80 mb-6">Log in to continue your calm journey</p>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-ssNavy dark:text-ssNavyD">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-lg border border-ssCardBrd dark:border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-ssNavy dark:text-ssNavyD">Password</label>
            <div className="flex items-stretch gap-2">
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 rounded-lg border border-ssCardBrd dark:border-ssCardBrd bg-white dark:bg-ssCardBgD focus:ring-2 focus:ring-ssPrimary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="px-3 rounded-lg border border-ssCardBrd dark:border-ssCardBrd text-sm hover:bg-white/60 dark:hover:bg-ssCardBgD/60"
                aria-label="Toggle password visibility"
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="remember" checked={form.remember} onChange={onChange} className="rounded border-ssCardBrd" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-ssPrimary hover:underline">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-ssPrimary hover:bg-ssPrimaryH text-white py-2.5 rounded-lg font-medium shadow-ss disabled:opacity-70">
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="mt-2">
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full py-2 mt-2 bg-white border border-ssCardBrd text-ssNavy rounded-lg hover:bg-[#f6fbff]"
            >
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-ssText/85 mt-2">
            New here? <Link to="/signup" className="text-ssPrimary hover:underline">Create an account</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
