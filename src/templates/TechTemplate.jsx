export default function TechTemplate({ resumeData }) {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Left sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/4 bg-slate-800 text-white p-6">
          {/* Profile section */}
          <div className="mb-8 text-center">
            <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold">
                {resumeData.personalInfo.name
                  ? resumeData.personalInfo.name.charAt(0)
                  : "A"}
              </span>
            </div>
            <h1 className="text-2xl font-bold">
              {resumeData.personalInfo.name || "Your Name"}
            </h1>
            <p className="text-green-400 font-medium mt-1">
              {resumeData.personalInfo.jobTitle || "Professional Title"}
            </p>
          </div>

          {/* Contact information */}
          <div className="mb-8">
            <h2 className="text-green-400 text-lg font-bold mb-3 border-b border-slate-700 pb-1">
              Contact
            </h2>
            {resumeData.personalInfo.email && (
              <div className="mb-2 text-slate-300 flex items-center">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <span className="text-sm break-all">
                  {resumeData.personalInfo.email}
                </span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="mb-2 text-slate-300 flex items-center">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm break-all">
                  {resumeData.personalInfo.phone}
                </span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="text-slate-300 flex items-center">
                <div className="w-5 h-5 mr-2 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm break-all">
                  {resumeData.personalInfo.location}
                </span>
              </div>
            )}
          </div>

          {/* Skills section */}
          {resumeData.skills.length > 0 && resumeData.skills[0] && (
            <div>
              <h2 className="text-green-400 text-lg font-bold mb-3 border-b border-slate-700 pb-1">
                Technical Skills
              </h2>
              <div className="flex flex-wrap">
                {resumeData.skills.map(
                  (skill, index) =>
                    skill && (
                      <div
                        key={index}
                        className="bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded mb-2 mr-2"
                      >
                        {skill}
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main content area */}
        <div className="w-full md:w-3/4 p-8">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-green-500 pb-2 mb-4">
                <span className="text-green-600">//</span> About Me
              </h2>
              <p className="text-slate-700">
                {resumeData.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 &&
            resumeData.experience[0]?.company && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 border-b-2 border-green-500 pb-2 mb-4">
                  <span className="text-green-600">//</span> Work Experience
                </h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-slate-800">
                        {exp.position}
                      </h3>
                      <span className="text-slate-500 text-sm bg-slate-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-green-600 font-medium mb-2">
                      {exp.company}
                    </p>
                    {exp.description && (
                      <p className="text-slate-600">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

          {/* Projects */}
          {resumeData.projects.length > 0 && resumeData.projects[0]?.title && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 border-b-2 border-green-500 pb-2 mb-4">
                <span className="text-green-600">//</span> Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-4">
                {resumeData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded shadow-sm border border-slate-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-slate-800">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          className="text-green-600 hover:text-green-800 text-sm flex items-center"
                        >
                          <span>View</span>
                          <svg
                            className="w-4 h-4 ml-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-slate-600 text-sm">
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 &&
            resumeData.education[0]?.institution && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 border-b-2 border-green-500 pb-2 mb-4">
                  <span className="text-green-600">//</span> Education
                </h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-slate-800">
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </h3>
                      <span className="text-slate-500 text-sm">
                        {edu.graduationDate}
                      </span>
                    </div>
                    <p className="text-green-600">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-slate-600 text-sm mt-1">
                        GPA: {edu.gpa}
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
