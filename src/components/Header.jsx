import { useState, useEffect } from "react";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

function Header({ saveResume, isSaving, user, username, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`relative transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0908]/95 backdrop-blur-sm py-2 shadow-lg"
            : "bg-[#0A0908] py-4"
        } text-white px-4 sm:px-6 lg:px-8 flex justify-between items-center`}
      >
        <div className="flex items-center">
          <div className="relative group">
            <svg
              className="w-8 h-8 mr-3 group-hover:text-[#A9927D] transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A9927D] transition-all duration-300 group-hover:w-full"></span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold hidden sm:block">
            AI Resume Builder
          </h1>
          <h1 className="text-lg font-bold sm:hidden">Resume AI</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop buttons - POSITIONS SWITCHED */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Save Resume button first */}
            <button
              onClick={saveResume}
              disabled={isSaving}
              className={`px-4 py-2 rounded-md flex items-center transition duration-300 ${
                isSaving
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#A9927D] to-[#5E503F] hover:from-[#5E503F] hover:to-[#A9927D] transform hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    ></path>
                  </svg>
                  Save Resume
                </>
              )}
            </button>

            {/* Logout button if user is logged in - MOVED TO SECOND POSITION */}
            {(user || username) && (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-[#5E503F]/70 transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                <span className="text-sm">Sign Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown - POSITIONS SWITCHED */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0A0908] shadow-lg p-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {/* Save Resume button first */}
              <button
                onClick={saveResume}
                disabled={isSaving}
                className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${
                  isSaving
                    ? "bg-gray-500"
                    : "bg-gradient-to-r from-[#A9927D] to-[#5E503F]"
                } transition duration-300`}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      ></path>
                    </svg>
                    Save Resume
                  </>
                )}
              </button>

              {/* Logout button for mobile - MOVED TO SECOND POSITION */}
              {(user || username) && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full px-4 py-2 rounded-md flex items-center justify-center bg-[#5E503F]/70 hover:bg-[#5E503F] transition duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          onLogout();
        }}
      />
    </>
  );
}

export default Header;
