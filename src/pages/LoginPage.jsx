import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-lg p-6 flex flex-col items-center">
        <div className="mb-6">
          <img
            src="https://img.icons8.com/puffy/1e2939/500/user.png"
            alt="App Logo"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome Back</h1>
        <p className="text-sm text-gray-500 mb-6">Log in to continue</p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <EnvelopeIcon className="absolute top-3 left-3 w-5 h-5 text-gray-500" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LockClosedIcon className="absolute top-3 left-3 w-5 h-5 text-gray-500" />
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            type="submit"
          >
            Login
          </button>
        </form>

        <button
          onClick={() => navigate("/register")}
          className="mt-4 text-gray-700 hover:text-gray-800 underline"
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
