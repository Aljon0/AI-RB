export default function SkillsSection({
  skills,
  updateSkills,
  addSkill,
  removeSkill,
  jobTitle,
  handleDataChange,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-[#5E503F]">Skills</h3>
        <button
          onClick={addSkill}
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
          Add Skill
        </button>
      </div>

      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateSkills(index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              placeholder="e.g., JavaScript, Project Management"
            />
            {skills.length > 1 && (
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700 p-2"
                aria-label="Remove skill"
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
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#F2F4F3] rounded-lg border border-gray-200">
        <h4 className="font-medium mb-2 text-[#5E503F]">AI Suggestions</h4>
        <p className="text-sm text-gray-600 mb-3">
          Based on your job title ({jobTitle || "not specified"}), here are some suggested skills:
        </p>
        <div className="flex flex-wrap gap-2">
          {getSuggestedSkills(jobTitle).map((skill, i) => (
            <button
              key={i}
              className="px-3 py-1 bg-[#A9927D] text-white text-sm rounded-full hover:bg-[#5E503F] transition"
              onClick={() => {
                if (!skills.includes(skill)) {
                  handleDataChange("skills", [...skills, skill]);
                }
              }}
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getSuggestedSkills(jobTitle = "") {
  const commonSkills = [
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Time Management",
  ];

  if (jobTitle.toLowerCase().includes("developer")) {
    return [...commonSkills, "JavaScript", "React", "Git", "CSS", "HTML"];
  }
  if (jobTitle.toLowerCase().includes("designer")) {
    return [...commonSkills, "UI/UX", "Figma", "Adobe Creative Suite", "Prototyping"];
  }
  if (jobTitle.toLowerCase().includes("manager")) {
    return [...commonSkills, "Leadership", "Project Management", "Agile", "Budgeting"];
  }
  
  return [...commonSkills, "JavaScript", "React", "UI/UX Design", "Project Management"];
}