export function TabNavigation({ sections, activeSection, setActiveSection }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-[#0A0908] mb-4">
        Build Your Resume
      </h2>
      <div className="flex border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`py-3 px-6 font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeSection === section.id
                ? "text-[#22333B] border-b-2 border-[#22333B] -mb-px"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}
