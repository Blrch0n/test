import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onLogin: (authenticated: boolean) => void;
  onRoleSelect: (role: "teacher" | "student") => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRoleSelect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRoleSelect(role);
    onLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Welcome to EduTracker
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to access your learning dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                I am a:
              </label>
              <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="student"
                    checked={role === "student"}
                    onChange={(e) => setRole(e.target.value as "student")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Student</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={(e) => setRole(e.target.value as "teacher")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Teacher</span>
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
