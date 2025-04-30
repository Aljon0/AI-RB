export function ProjectsSection({
  projects,
  updateProject,
  addProject,
  removeProject,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-[#5E503F]">Projects</h3>
        <button
          onClick={addProject}
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
          Add Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div
          key={project.id}
          className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-[#5E503F]">Project #{index + 1}</h4>
            {projects.length > 1 && (
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Remove project"
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

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProject(index, "title", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Link (Optional)
            </label>
            <input
              type="text"
              value={project.link}
              onChange={(e) => updateProject(index, "link", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                updateProject(index, "description", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D] min-h-[100px]"
              placeholder="Describe the project, technologies used, and your role..."
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsSection;