import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, signInWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // signup with firebase; pass name as extra metadata saved in Firestore
      await signup(formData.email, formData.password, { name: formData.name });
      navigate("/MainDashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Signup failed");
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
      console.error(err);
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F8FA]">
      <h1 className="text-4xl font-bold text-[#6C9BCF] mb-2">Serene Space</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md border border-[#E3F2FD]">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-[#B3E5FC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BCF]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-[#B3E5FC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BCF]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-[#B3E5FC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BCF]"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-[#B3E5FC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BCF]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#6C9BCF] hover:bg-[#5B8FB9] text-white font-semibold rounded-md transition duration-200 shadow-sm"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogle}
            className="w-full py-2 mt-2 bg-white border border-[#B3E5FC] text-[#333] rounded-md hover:bg-[#f6fbff]"
            disabled={loading}
          >
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#6C9BCF] hover:text-[#5B8FB9] font-medium">Log in</a>
        </p>
      </div>
    </div>
  );
}
