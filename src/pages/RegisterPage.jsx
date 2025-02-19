import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
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
            src="https://cdn-icons-png.flaticon.com/512/681/681443.png"
            alt="App Logo"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">Join Us Today</h1>
        <p className="text-sm text-gray-500 mb-6">Create your account</p>

        <form onSubmit={handleRegister} className="w-full space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <UserIcon className="absolute top-3 left-3 w-5 h-5 text-gray-500" />
          </div>

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
            Register
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-gray-700 hover:text-gray-800 underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
