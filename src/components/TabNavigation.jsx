export function TabNavigation({ sections, activeSection, setActiveSection }) {
  return (
    <div className="mb-4 md:mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-[#0A0908] mb-3 md:mb-4">
        Build Your Resume
      </h2>
      <div className="flex overflow-x-auto pb-2 md:pb-0">
        <div className="flex space-x-1 md:space-x-0">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`py-2 px-3 md:py-3 md:px-6 font-medium text-xs md:text-sm focus:outline-none transition-colors duration-200 whitespace-nowrap ${
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
    </div>
  );
}

export default TabNavigation;