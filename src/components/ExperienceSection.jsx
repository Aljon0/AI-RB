export function ExperienceSection({
  experience,
  updateExperience,
  addExperience,
  removeExperience,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-[#5E503F]">Work Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center justify-center text-sm bg-[#22333B] text-white px-3 py-2 rounded-md hover:bg-[#5E503F] transition w-full sm:w-auto"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Experience
        </button>
      </div>

      {experience.map((exp, index) => (
        <div
          key={exp.id}
          className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-[#5E503F]">Experience #{index + 1}</h4>
            {experience.length > 1 && (
              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Remove experience"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) =>
                  updateExperience(index, "position", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) =>
                  updateExperience(index, "startDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                placeholder="MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) =>
                  updateExperience(index, "endDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                placeholder="MM/YYYY or Present"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) =>
                updateExperience(index, "description", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D] min-h-[100px]"
              placeholder="Describe your role, responsibilities, and achievements..."
            />
          </div>
        </div>
      ))}
    </div>
  );
}