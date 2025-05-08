import { TemplateProps } from "../utils/types";

export default function ProfessionalTemplate({ resumeData }: TemplateProps) {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Left sidebar */}
      <div className="flex h-full">
        <div className="w-1/3 bg-indigo-800 text-white p-6">
          <div className="mb-8 text-center">
            {resumeData.personalInfo.profileImage ? (
              <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src={resumeData.personalInfo.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="inline-block rounded-full bg-white/10 p-2 mb-3">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
            <h1 className="text-2xl font-bold">
              {resumeData.personalInfo.name || "Your Name"}
            </h1>
            <p className="text-indigo-200 mt-1">
              {resumeData.personalInfo.jobTitle || "Professional Title"}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold border-b border-indigo-600 pb-1 mb-3">
                Contact
              </h2>
              <div className="space-y-2 text-sm">
                {resumeData.personalInfo.email && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>{resumeData.personalInfo.email}</span>
                  </div>
                )}
                {resumeData.personalInfo.phone && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span>{resumeData.personalInfo.phone}</span>
                  </div>
                )}
                {resumeData.personalInfo.location && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>{resumeData.personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>

            {resumeData.skills.length > 0 && resumeData.skills[0] && (
              <div>
                <h2 className="text-lg font-semibold border-b border-indigo-600 pb-1 mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap">
                  {resumeData.skills.map(
                    (skill, index) =>
                      skill && (
                        <span
                          key={index}
                          className="bg-indigo-700 px-2 py-1 rounded text-xs mr-1 mb-1"
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

        {/* Main content */}
        <div className="w-2/3 p-8">
          {resumeData.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-indigo-800 border-b border-indigo-200 pb-1 mb-3">
                Professional Summary
              </h2>
              <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
            </div>
          )}

          {resumeData.experience.length > 0 &&
            resumeData.experience[0]?.company && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-indigo-800 border-b border-indigo-200 pb-1 mb-3">
                  Experience
                </h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-indigo-700 font-medium">{exp.company}</p>
                    {exp.description && (
                      <p className="text-gray-600 mt-1 text-sm">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

          {resumeData.education.length > 0 &&
            resumeData.education[0]?.institution && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-indigo-800 border-b border-indigo-200 pb-1 mb-3">
                  Education
                </h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800">
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {edu.graduationDate}
                      </span>
                    </div>
                    <p className="text-indigo-700 font-medium">
                      {edu.institution}
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

          {resumeData.projects.length > 0 && resumeData.projects[0]?.title && (
            <div>
              <h2 className="text-xl font-bold text-indigo-800 border-b border-indigo-200 pb-1 mb-3">
                Projects
              </h2>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-600 mt-1 text-sm">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}