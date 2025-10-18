import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ToastModal from "../components/ToastModal";
import api from "../utils/api";

const Signup = ({ setToken }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setToast({ message: "", type: "" });
    setLoading(true);
    try {
      const res = await api.post("/auth/register", data);
      setToast({ message: res.data.message, type: "success" });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      reset();
      setTimeout(() => navigate("/app"), 1500);
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setToast({
          message: err.response.data.errors.map((e) => e.msg).join(", "),
          type: "error",
        });
      } else if (err.response && err.response.data.message) {
        setToast({ message: err.response.data.message, type: "error" });
      } else {
        setToast({ message: "Something went wrong", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormErrors = () => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]?.message;
      setToast({ message: firstError, type: "error" });
    }
  };

  const password = watch("password", "");

  return (
    <div className="min-h-[92vh] w-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-28 h-28 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      
      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={handleSubmit(onSubmit, handleFormErrors)}
          className="bg-white/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-8 space-y-6 shadow-2xl border border-white/20"
        >
          {/* Logo and Title */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm">Join us and start organizing your tasks</p>
          </div>

          {/* Form Fields */}
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name must contain only letters",
                  },
                })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@&]).+$/,
                    message:
                      "Password must contain uppercase, lowercase, number & !,@,&",
                  },
                })}
                placeholder="Create a strong password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password Requirements */}
          <div className="w-full bg-blue-50 rounded-xl p-3 space-y-1">
            <p className="text-xs font-medium text-blue-800 mb-2">Password must contain:</p>
            <div className="space-y-1">
              <p className="text-xs text-blue-700">• At least 8 characters</p>
              <p className="text-xs text-blue-700">• Uppercase and lowercase letters</p>
              <p className="text-xs text-blue-700">• Numbers and special characters (!@&)</p>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700 hover:scale-105 hover:shadow-lg active:scale-95"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className="w-full flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </form>
      </div>
      
      <ToastModal
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </div>
  );
};

export default Signup;
