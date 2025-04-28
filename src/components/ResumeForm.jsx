import { useState } from "react";

export function ResumeForm({ resumeData, handleDataChange }) {
  const [activeSection, setActiveSection] = useState("personalInfo");

  const sections = [
    { id: "personalInfo", label: "Personal Info" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  const updatePersonalInfo = (field, value) => {
    handleDataChange("personalInfo", {
      ...resumeData.personalInfo,
      [field]: value,
    });
  };

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    handleDataChange("experience", updatedExperience);
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    handleDataChange("experience", [...resumeData.experience, newExperience]);
  };

  const removeExperience = (index) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    handleDataChange("experience", updatedExperience);
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    handleDataChange("education", updatedEducation);
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: "",
    };
    handleDataChange("education", [...resumeData.education, newEducation]);
  };

  const removeEducation = (index) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    handleDataChange("education", updatedEducation);
  };

  const updateSkills = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    handleDataChange("skills", updatedSkills);
  };

  const addSkill = () => {
    handleDataChange("skills", [...resumeData.skills, ""]);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    handleDataChange("skills", updatedSkills);
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    handleDataChange("projects", updatedProjects);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "",
      description: "",
      link: "",
    };
    handleDataChange("projects", [...resumeData.projects, newProject]);
  };

  const removeProject = (index) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    handleDataChange("projects", updatedProjects);
  };

  // Enhanced tab navigation component
  const TabNavigation = () => (
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

  return (
    <div className="w-1/2 overflow-y-auto p-6 bg-white border-r border-gray-200">
      <TabNavigation />

      <div className="mt-6">
        {activeSection === "personalInfo" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#5E503F] mb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.jobTitle}
                  onChange={(e) =>
                    updatePersonalInfo("jobTitle", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                placeholder="City, State/Province, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Summary
              </label>
              <textarea
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D] h-32"
                placeholder="Write a short summary about yourself and your professional goals..."
              ></textarea>
            </div>
          </div>
        )}

        {activeSection === "experience" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#5E503F]">
                Work Experience
              </h3>
              <button
                onClick={addExperience}
                className="flex items-center text-sm bg-[#22333B] text-white px-3 py-1 rounded-md hover:bg-[#5E503F] transition"
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
                  ></path>
                </svg>
                Add Experience
              </button>
            </div>

            {resumeData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  {resumeData.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700"
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
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
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

                <div className="grid grid-cols-2 gap-4 mb-3">
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D] h-24"
                    placeholder="Describe your role, responsibilities, and achievements..."
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "education" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#5E503F]">
                Education
              </h3>
              <button
                onClick={addEducation}
                className="flex items-center text-sm bg-[#22333B] text-white px-3 py-1 rounded-md hover:bg-[#5E503F] transition"
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
                  ></path>
                </svg>
                Add Education
              </button>
            </div>

            {resumeData.education.map((edu, index) => (
              <div
                key={edu.id}
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  {resumeData.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700"
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
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(index, "field", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Graduation Date
                    </label>
                    <input
                      type="text"
                      value={edu.graduationDate}
                      onChange={(e) =>
                        updateEducation(index, "graduationDate", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                      placeholder="MM/YYYY or Expected MM/YYYY"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) =>
                      updateEducation(index, "gpa", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "skills" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#5E503F]">Skills</h3>
              <button
                onClick={addSkill}
                className="flex items-center text-sm bg-[#22333B] text-white px-3 py-1 rounded-md hover:bg-[#5E503F] transition"
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
                  ></path>
                </svg>
                Add Skill
              </button>
            </div>

            <div className="space-y-3">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkills(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
                    placeholder="e.g., JavaScript, Project Management, Communication"
                  />
                  {resumeData.skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
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
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#F2F4F3] rounded-lg border border-gray-200">
              <h4 className="font-medium mb-2 text-[#5E503F]">
                AI Suggestions
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Based on your job title, here are some suggested skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "React",
                  "UI/UX Design",
                  "Problem Solving",
                  "Communication",
                ].map((skill, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 bg-[#A9927D] text-white text-sm rounded-full hover:bg-[#5E503F] transition"
                    onClick={() => {
                      if (!resumeData.skills.includes(skill)) {
                        handleDataChange("skills", [
                          ...resumeData.skills,
                          skill,
                        ]);
                      }
                    }}
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#5E503F]">Projects</h3>
              <button
                onClick={addProject}
                className="flex items-center text-sm bg-[#22333B] text-white px-3 py-1 rounded-md hover:bg-[#5E503F] transition"
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
                  ></path>
                </svg>
                Add Project
              </button>
            </div>

            {resumeData.projects.map((project, index) => (
              <div
                key={project.id}
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Project {index + 1}</h4>
                  {resumeData.projects.length > 1 && (
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-500 hover:text-red-700"
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
                        ></path>
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
                    onChange={(e) =>
                      updateProject(index, "title", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateProject(index, "link", e.target.value)
                    }
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D] h-24"
                    placeholder="Describe the project, technologies used, and your role..."
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeForm;
