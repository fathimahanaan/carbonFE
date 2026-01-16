import React, { useState } from "react";
import useLogin from "../../hooks/auth/useLogin";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login, loading } = useLogin();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login({ userId, password });
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300">
      <div className="flex bg-gradient-to-br from-green-200 to-green-100 rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-[#006400] text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-[#006400] mb-8">Log into your account to continue</p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="w-full p-3 border border-gray-500 rounded-lg placeholder-gray-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
              required
            />
            <input
              type="password"
              className="w-full p-3 border border-gray-500 rounded-lg placeholder-gray-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:from-green-500 hover:to-green-400 shadow-lg transition"
            >
              {loading ? "Please wait..." : "Log In"}
            </button>
          </form>

          <div className="text-center mt-6 text-gray-500 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-green-600 font-semibold hover:underline">
              Sign Up
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="earthh.png"
            alt="Side Illustration"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
