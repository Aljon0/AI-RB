export function TemplateSelector({ selectedTemplate, setSelectedTemplate }) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean design with a colored header and subtle accents.",
    },
    {
      id: "classic",
      name: "Classic",
      description:
        "Traditional resume format, centered header with clear sections.",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean design with subtle background color.",
    },
    {
      id: "professional",
      name: "Professional",
      description:
        "Side column layout with indigo color scheme and clear organization.",
    },
    {
      id: "creative",
      name: "Creative",
      description:
        "Modern teal gradient design with graphical elements and cards.",
    },
    {
      id: "executive",
      name: "Executive",
      description:
        "Sophisticated layout with amber accents for senior professionals.",
    },
    {
      id: "tech",
      name: "Tech",
      description:
        "Dark sidebar with code-inspired styling for tech professionals.",
    },
  ];

  return (
    <div className="p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-[#0A0908] mb-6">
        Choose a Template
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? "border-[#22333B] ring-2 ring-[#22333B] transform scale-105"
                : "border-gray-200 hover:border-[#A9927D]"
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="h-48 bg-white p-3 flex items-center justify-center">
              {template.id === "modern" && (
                <div className="w-full h-full">
                  <div className="bg-[#22333B] h-1/3 w-full p-2">
                    <div className="bg-white h-4 w-24 mb-1 rounded-sm"></div>
                    <div className="bg-white/50 h-2 w-16 rounded-sm"></div>
                  </div>
                  <div className="p-2">
                    <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                    <div className="bg-gray-200 h-2 w-3/4 mb-4 rounded-sm"></div>
                    <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                    <div className="bg-gray-200 h-2 w-5/6 rounded-sm"></div>
                  </div>
                </div>
              )}
              {template.id === "classic" && (
                <div className="w-full h-full p-2 text-center">
                  <div className="border-b border-gray-300 pb-2 mb-2">
                    <div className="bg-[#0A0908] h-4 w-32 mx-auto mb-1 rounded-sm"></div>
                    <div className="bg-[#5E503F] h-2 w-24 mx-auto rounded-sm"></div>
                  </div>
                  <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                  <div className="bg-gray-200 h-2 w-5/6 mx-auto mb-4 rounded-sm"></div>
                  <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                  <div className="bg-gray-200 h-2 w-3/4 rounded-sm"></div>
                </div>
              )}
              {template.id === "minimal" && (
                <div className="w-full h-full bg-[#F2F4F3] p-3">
                  <div className="bg-white p-2 rounded">
                    <div className="bg-[#0A0908] h-4 w-32 mb-1 rounded-sm"></div>
                    <div className="bg-[#5E503F] h-2 w-24 rounded-sm"></div>
                    <div className="flex space-x-2 my-3">
                      <div className="bg-[#A9927D]/20 h-2 w-16 rounded-sm"></div>
                      <div className="bg-[#A9927D]/20 h-2 w-12 rounded-sm"></div>
                    </div>
                    <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                    <div className="bg-gray-200 h-2 w-5/6 rounded-sm"></div>
                  </div>
                </div>
              )}
              {template.id === "professional" && (
                <div className="w-full h-full flex">
                  <div className="w-1/3 bg-indigo-800 h-full p-2">
                    <div className="bg-white/20 h-4 w-16 mx-auto mb-3 rounded-full"></div>
                    <div className="bg-white h-2 w-14 mx-auto mb-6 rounded-sm"></div>
                    <div className="bg-white/20 h-2 w-full mb-1 rounded-sm"></div>
                    <div className="bg-white/20 h-2 w-5/6 rounded-sm"></div>
                  </div>
                  <div className="w-2/3 p-2">
                    <div className="bg-indigo-200 h-2 w-24 mb-1 rounded-sm"></div>
                    <div className="bg-gray-200 h-2 w-5/6 mb-4 rounded-sm"></div>
                    <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                    <div className="bg-gray-200 h-2 w-5/6 rounded-sm"></div>
                  </div>
                </div>
              )}
              {template.id === "creative" && (
                <div className="w-full h-full bg-gray-50">
                  <div className="h-1/3 bg-gradient-to-r from-emerald-500 to-teal-600 p-2">
                    <div className="bg-white h-3 w-20 mb-1 rounded-sm"></div>
                    <div className="bg-white/50 h-2 w-16 rounded-sm"></div>
                  </div>
                  <div className="p-2">
                    <div className="flex">
                      <div className="w-2/3 pr-2">
                        <div className="h-2 w-20 bg-emerald-300 mb-2 rounded-sm"></div>
                        <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                        <div className="bg-gray-200 h-2 w-5/6 rounded-sm"></div>
                      </div>
                      <div className="w-1/3">
                        <div className="bg-white p-1 rounded shadow-sm h-16">
                          <div className="h-2 w-16 bg-emerald-300 mb-1 rounded-sm"></div>
                          <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                          <div className="bg-gray-200 h-2 w-5/6 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {template.id === "executive" && (
                <div className="w-full h-full bg-white">
                  <div className="h-1/3 bg-gray-100 border-t-4 border-amber-600 p-2 flex justify-between">
                    <div>
                      <div className="bg-gray-800 h-3 w-20 mb-1 rounded-sm"></div>
                      <div className="bg-amber-500 h-2 w-16 rounded-sm"></div>
                    </div>
                    <div className="text-right">
                      <div className="bg-gray-300 h-2 w-16 mb-1 rounded-sm"></div>
                      <div className="bg-gray-300 h-2 w-12 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex">
                      <div className="w-2/3 pr-2">
                        <div className="h-2 w-24 border-b border-amber-200 mb-2"></div>
                        <div className="bg-gray-200 h-2 w-full mb-1 rounded-sm"></div>
                        <div className="bg-gray-200 h-2 w-5/6 rounded-sm"></div>
                      </div>
                      <div className="w-1/3">
                        <div className="bg-gray-50 p-1 h-16">
                          <div className="h-2 w-12 bg-gray-400 mb-1 rounded-sm"></div>
                          <div className="flex items-center">
                            <div className="h-1 w-1 bg-amber-500 rounded-full mr-1"></div>
                            <div className="bg-gray-200 h-2 w-3/4 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {template.id === "tech" && (
                <div className="w-full h-full flex">
                  <div className="w-1/3 bg-slate-800 h-full p-2">
                    <div className="bg-slate-700 h-6 w-6 rounded-full mx-auto mb-1"></div>
                    <div className="bg-white h-2 w-12 mx-auto mb-1 rounded-sm"></div>
                    <div className="bg-green-400 h-1 w-10 mx-auto mb-3 rounded-sm"></div>

                    <div className="bg-slate-700 h-2 w-full mb-1 rounded-sm"></div>
                    <div className="flex flex-wrap mt-2 justify-center">
                      <div className="bg-slate-700 h-2 w-8 rounded mx-1 mb-1"></div>
                      <div className="bg-slate-700 h-2 w-6 rounded mx-1 mb-1"></div>
                    </div>
                  </div>
                  <div className="w-2/3 bg-slate-50 p-2">
                    <div className="border-b-2 border-green-500 pb-1 mb-2">
                      <div className="flex items-center">
                        <div className="bg-green-600 h-2 w-2 mr-1"></div>
                        <div className="bg-slate-800 h-2 w-16 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="bg-gray-300 h-2 w-full mb-1 rounded-sm"></div>
                    <div className="bg-gray-300 h-2 w-5/6 mb-3 rounded-sm"></div>
                    <div className="flex gap-2">
                      <div className="bg-white h-10 w-full rounded p-1 shadow-sm">
                        <div className="bg-gray-300 h-1 w-10 mb-1 rounded-sm"></div>
                        <div className="bg-gray-300 h-1 w-16 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-white border-t border-gray-200">
              <h3 className="font-bold text-[#0A0908]">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {template.description}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">Click to preview</span>
                {selectedTemplate === template.id && (
                  <span className="text-xs bg-[#22333B] text-white px-2 py-1 rounded-full">
                    Selected
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TemplateSelector;
