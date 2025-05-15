import { ResumeData } from "../utils/types";

export default function CreativeTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div className="h-full bg-[#f8f9fa]">
      {/* Header with accent diagonal */}
      <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform rotate-45 bg-white/20 w-96 h-96 -top-32 -right-32"></div>
          <div className="absolute transform rotate-45 bg-white/20 w-64 h-64 -bottom-32 -left-32"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white">
            {resumeData.personalInfo.name || "Your Name"}
          </h1>
          <p className="text-lg text-teal-100 mt-1">
            {resumeData.personalInfo.jobTitle || "Professional Title"}
          </p>

          <div className="flex flex-wrap mt-4 text-sm">
            {resumeData.personalInfo.email && (
              <div className="flex items-center mr-6 text-white">
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                {resumeData.personalInfo.email}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center mr-6 text-white">
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {resumeData.personalInfo.phone}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center text-white">
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {resumeData.personalInfo.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left column */}
          <div className="col-span-2">
            {resumeData.personalInfo.summary && (
              <div className="mb-6">
                <h2 className="relative text-xl font-bold text-emerald-700 mb-4">
                  <span className="inline-block pb-1 border-b-2 border-emerald-400">
                    About Me
                  </span>
                </h2>
                <p className="text-gray-700">
                  {resumeData.personalInfo.summary}
                </p>
              </div>
            )}

            {resumeData.experience.length > 0 &&
              resumeData.experience[0]?.company && (
                <div className="mb-6">
                  <h2 className="relative text-xl font-bold text-emerald-700 mb-4">
                    <span className="inline-block pb-1 border-b-2 border-emerald-400">
                      Experience
                    </span>
                  </h2>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {exp.position}
                          </h3>
                          <p className="text-emerald-600">{exp.company}</p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">
                          {exp.startDate} - {exp.endDate || "Present"}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-gray-600 mt-2 text-sm">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {resumeData.projects.length > 0 &&
              resumeData.projects[0]?.title && (
                <div>
                  <h2 className="relative text-xl font-bold text-emerald-700 mb-4">
                    <span className="inline-block pb-1 border-b-2 border-emerald-400">
                      Projects
                    </span>
                  </h2>
                  <div className="flex flex-col gap-4">
                    {resumeData.projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-gray-800">
                            {project.title}
                          </h3>
                          {project.link && (
                            <a
                              href={project.link}
                              className="text-emerald-600 hover:underline text-sm"
                            >
                              View
                            </a>
                          )}
                        </div>
                        {project.description && (
                          <p className="text-gray-600 mt-2 text-sm">
                            {project.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Right column */}
          <div>
            {resumeData.education.length > 0 &&
              resumeData.education[0]?.institution && (
                <div className="mb-6 bg-white p-5 rounded-lg shadow-sm">
                  <h2 className="relative text-xl font-bold text-emerald-700 mb-4">
                    <span className="inline-block pb-1 border-b-2 border-emerald-400">
                      Education
                    </span>
                  </h2>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-bold text-gray-800">
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </h3>
                      <p className="text-emerald-600">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">
                        {edu.graduationDate}
                      </p>
                      {edu.gpa && (
                        <p className="text-gray-600 mt-1 text-sm">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {resumeData.skills.length > 0 && resumeData.skills[0] && (
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h2 className="relative text-xl font-bold text-emerald-700 mb-4">
                  <span className="inline-block pb-1 border-b-2 border-emerald-400">
                    Skills
                  </span>
                </h2>
                <div className="flex flex-wrap">
                  {resumeData.skills.map(
                    (skill, index) =>
                      skill && (
                        <span
                          key={index}
                          className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                        >
                          {skill}
                        </span>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}