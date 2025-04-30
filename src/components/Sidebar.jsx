import { useState, useEffect } from "react";

export default function Sidebar({ activeTab, setActiveTab, user, username }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Track window width for responsive design
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabs = [
    {
      id: "editor",
      label: "Editor",
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    },
    {
      id: "templates",
      label: "Templates",
      icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    },
    {
      id: "saved",
      label: "Saved Resumes",
      icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    },
  ];

  // Format display name - if it's an email, show only the part before @
  let displayName = user?.displayName || username || "Guest";

  // Handle email format (remove @gmail.com or other domains)
  if (user?.email && !displayName) {
    displayName = user.email.split("@")[0];
  } else if (displayName && displayName.includes("@")) {
    displayName = displayName.split("@")[0];
  }

  // Get first letter of display name for avatar
  const avatarInitial = displayName.charAt(0).toUpperCase();

  // Determine if sidebar should be shown as overlay or not
  const isMobileView = windowWidth < 768;

  return (
    <>
      {/* Mobile toggle button - fixed position */}
      {isMobileView && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-[#22333B] text-white shadow-lg hover:bg-[#5E503F] transition-colors duration-300"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
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
      )}

      {/* Main sidebar - conditional rendering based on screen size and menu state */}
      <aside
        className={`${
          isMobileView
            ? isMobileMenuOpen
              ? "fixed inset-y-0 left-0 z-40 w-64 transform translate-x-0"
              : "fixed inset-y-0 left-0 z-40 w-64 transform -translate-x-full"
            : "w-64 h-screen sticky top-0"
        } bg-gradient-to-b from-[#22333B] to-[#1D2B32] text-gray-100 flex flex-col transition-transform duration-300 ease-in-out shadow-xl`}
      >
        {/* User info and logout at the top */}
        <div className="p-4 flex items-center border-b border-[#5E503F]/30">
          <div className="flex items-center w-full">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A9927D] to-[#5E503F] flex items-center justify-center text-white font-medium shadow-md shrink-0">
              {avatarInitial}
            </div>
            <div className="ml-3 overflow-hidden">
              <span className="font-medium truncate w-40 inline-block">
                {displayName}
              </span>
              <span className="text-xs text-gray-300 opacity-70 truncate w-40 inline-block">
                {user?.email ? user.email : "Resume Builder"}
              </span>
            </div>
          </div>
        </div>

        <div className="px-4 flex-grow overflow-y-auto">
          <nav className="mt-6">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (isMobileView) setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-[#5E503F] text-white shadow-md"
                        : "text-gray-300 hover:bg-[#5E503F]/30 hover:translate-x-1"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 mr-3 ${
                        activeTab === tab.id
                          ? "text-[#F2E9E4]"
                          : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={tab.icon}
                      ></path>
                    </svg>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* AI Assistant Card */}
        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-[#0A0908] to-[#1A1918] p-4 rounded-lg shadow-inner border border-[#5E503F]/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-medium text-white ml-2">AI Assistant</h3>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Need help with your resume? Ask our AI assistant for suggestions!
            </p>
            <button className="w-full bg-gradient-to-r from-[#A9927D] to-[#5E503F] text-white py-2 rounded-md hover:from-[#5E503F] hover:to-[#A9927D] transition duration-300 shadow-md">
              Ask AI for Help
            </button>
          </div>
        </div>

        {/* Mobile close button - only visible on mobile */}
        {isMobileView && isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#5E503F]/30 text-white md:hidden"
            aria-label="Close Sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
      </aside>

      {/* Overlay when mobile menu is open */}
      {isMobileView && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
