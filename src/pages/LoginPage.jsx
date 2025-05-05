import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser, signInWithGoogle, resetPassword } from "../firebase";
import {
  CustomToastContainer,
  CustomToastCSS,
  showErrorToast,
  showSuccessToast,
} from "../components/CustomToast";

export function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await loginUser(formData.email, formData.password);
      const userData = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName || formData.email.split("@")[0],
      };

      showSuccessToast(`Welcome back, ${userData.displayName}!`);
      onLogin(userData);
    } catch (error) {
      showErrorToast(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);

    try {
      const user = await signInWithGoogle();
      const userData = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL,
      };

      showSuccessToast(`Welcome back, ${userData.displayName}!`);
      onLogin(userData);
    } catch (error) {
      console.error("Google login error:", error);
      showErrorToast(getErrorMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      showErrorToast("Please enter your email address");
      return;
    }

    setForgotPasswordLoading(true);
    try {
      await resetPassword(forgotPasswordEmail);
      showSuccessToast(
        `Password reset email sent to ${forgotPasswordEmail}. Please check your inbox.`
      );
      setShowForgotPassword(false);
      setForgotPasswordEmail("");
    } catch (error) {
      showErrorToast(getErrorMessage(error));
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    // Handle both error objects with code property and string errors
    const errorCode = error?.code || error?.message || String(error);

    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "This account has been disabled";
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/invalid-credential":
        return "Invalid email or password";
      case "auth/invalid-login-credentials":
        return "Invalid email or password";
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed before completing the sign in";
      case "auth/cancelled-popup-request":
        return "The sign-in process was cancelled";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with the same email address but different sign-in credentials";
      case "auth/too-many-requests":
        return "Too many unsuccessful login attempts. Please try again later";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection";
      case "auth/missing-email":
        return "Please enter your email address";
      default:
        return `Login failed: ${errorCode}`;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F3]">
      <CustomToastCSS />
      <CustomToastContainer />

      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-[#22333B] p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            {showForgotPassword ? "Reset Password" : "Welcome Back"}
          </h2>
        </div>

        <div className="p-8">
          {showForgotPassword ? (
            <div className="forgot-password-form">
              <div className="mb-6">
                <p className="text-[#5E503F] mb-4">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <div className="mb-4">
                  <label
                    className="block text-[#5E503F] text-sm font-medium mb-2"
                    htmlFor="forgot-email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                    type="email"
                    id="forgot-email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={forgotPasswordLoading}
                    className="w-full bg-[#22333B] text-white font-medium py-3 rounded-lg hover:bg-[#5E503F] transition-colors disabled:bg-gray-400"
                  >
                    {forgotPasswordLoading
                      ? "Sending..."
                      : "Send Reset Link"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#A9927D] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-[#5E503F] text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    className="block text-[#5E503F] text-sm font-medium mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9927D] pr-10"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="text-sm text-[#22333B] hover:text-[#5E503F]"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#22333B] text-white font-medium py-3 rounded-lg hover:bg-[#5E503F] transition-colors disabled:bg-gray-400"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="relative flex items-center justify-center mt-6">
                <div className="absolute border-t border-gray-300 w-full"></div>
                <div className="relative bg-white px-4 text-sm text-gray-500">
                  OR
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full mt-6 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:bg-gray-100"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {googleLoading
                  ? "Signing in with Google..."
                  : "Sign in with Google"}
              </button>

              <div className="mt-6 text-center">
                <p className="text-[#0A0908]">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-[#A9927D] hover:text-[#5E503F]"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}