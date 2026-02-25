import React, { useState } from "react";
import { Link } from "react-router-dom";
import useRegisterLogin from "../../hooks/auth/useRegisterLogin";
import FormInput from "../FormInput";

const Register = () => {
  const { register, loading } = useRegisterLogin();
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-xl p-10 rounded-lg shadow-md">

        {/* Logo Section */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src="/earthh.png"
            alt="logo"
            className="w-20 h-20 object-contain"
          />
          <div className="text-left">
            <p className="text-green-900 font-bold text-2xl leading-tight">
              Carbon Tracker
            </p>
            <span className="text-sm font-semibold text-green-700">
              Reduce • Track • Learn
            </span>
          </div>
        </div>

        <hr className="border-green-500 mb-6" />

        <h2 className="text-xl font-bold text-green-700 mb-2 text-center">
          Create Account
        </h2>

        <p className="text-gray-600 mb-6 text-center">
          Register to start tracking your emissions
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-medium">
            Log In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;