export function Sidebar({ activeTab, setActiveTab }) {
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

  return (
    <aside className="w-64 bg-[#22333B] text-gray-100">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-[#A9927D] flex items-center justify-center">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <span className="font-medium">AI Resume Builder</span>
        </div>

        <nav>
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#5E503F] text-white"
                      : "text-gray-300 hover:bg-[#5E503F]/50"
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-3"
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

      <div className="p-4 mt-auto border-t border-gray-700">
        <div className="bg-[#0A0908] p-4 rounded-lg">
          <h3 className="font-medium text-white mb-2">AI Assistant</h3>
          <p className="text-sm text-gray-300 mb-3">
            Need help with your resume? Ask our AI assistant for suggestions!
          </p>
          <button className="w-full bg-[#A9927D] text-white py-2 rounded-md hover:bg-[#5E503F] transition duration-300">
            Ask AI for Help
          </button>
        </div>
      </div>
    </aside>
  );
}
