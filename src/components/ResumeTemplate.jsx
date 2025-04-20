export function ModernTemplate({ resumeData }) {
  return (
    <div className="h-full">
      <div className="bg-[#22333B] text-white p-8">
        <h1 className="text-3xl font-bold">
          {resumeData.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-xl mt-1">
          {resumeData.personalInfo.jobTitle || "Professional Title"}
        </p>

        <div className="flex flex-wrap mt-4 text-sm">
          {resumeData.personalInfo.email && (
            <div className="flex items-center mr-4 mb-2">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              {resumeData.personalInfo.email}
            </div>
          )}

          {resumeData.personalInfo.phone && (
            <div className="flex items-center mr-4 mb-2">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              {resumeData.personalInfo.phone}
            </div>
          )}

          {resumeData.personalInfo.location && (
            <div className="flex items-center mb-2">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {resumeData.personalInfo.location}
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {resumeData.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#5E503F] border-b-2 border-[#A9927D] pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {resumeData.experience.length > 0 &&
          resumeData.experience[0].company && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#5E503F] border-b-2 border-[#A9927D] pb-1 mb-3">
                Work Experience
              </h2>

              {resumeData.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={
                    index !== resumeData.experience.length - 1 ? "mb-4" : ""
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[#5E503F] font-medium">{exp.company}</p>
                  <p className="text-sm mt-1 text-gray-700">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}

        {resumeData.education.length > 0 &&
          resumeData.education[0].institution && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#5E503F] border-b-2 border-[#A9927D] pb-1 mb-3">
                Education
              </h2>

              {resumeData.education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={
                    index !== resumeData.education.length - 1 ? "mb-4" : ""
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <p className="text-[#5E503F] font-medium">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          )}

        {resumeData.skills.length > 0 && resumeData.skills[0] && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#5E503F] border-b-2 border-[#A9927D] pb-1 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap">
              {resumeData.skills.map(
                (skill, index) =>
                  skill && (
                    <span
                      key={index}
                      className="bg-[#F2F4F3] text-[#22333B] px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  )
              )}
            </div>
          </div>
        )}

        {resumeData.projects.length > 0 && resumeData.projects[0].title && (
          <div>
            <h2 className="text-lg font-bold text-[#5E503F] border-b-2 border-[#A9927D] pb-1 mb-3">
              Projects
            </h2>

            {resumeData.projects.map((project, index) => (
              <div
                key={project.id}
                className={
                  index !== resumeData.projects.length - 1 ? "mb-4" : ""
                }
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-[#22333B] hover:underline text-sm"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-sm mt-1 text-gray-700">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ClassicTemplate({ resumeData }) {
  return (
    <div className="h-full p-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#0A0908]">
          {resumeData.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-xl text-[#5E503F] mt-1">
          {resumeData.personalInfo.jobTitle || "Professional Title"}
        </p>

        <div className="flex justify-center flex-wrap mt-3 text-sm">
          {resumeData.personalInfo.email && (
            <div className="flex items-center mx-2 mb-1">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              {resumeData.personalInfo.email}
            </div>
          )}

          {resumeData.personalInfo.phone && (
            <div className="flex items-center mx-2 mb-1">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              {resumeData.personalInfo.phone}
            </div>
          )}

          {resumeData.personalInfo.location && (
            <div className="flex items-center mx-2 mb-1">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {resumeData.personalInfo.location}
            </div>
          )}
        </div>
      </div>

      <hr className="border-gray-300 my-6" />

      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-[#22333B] mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-[#22333B] mb-3">
            Work Experience
          </h2>

          {resumeData.experience.map((exp, index) => (
            <div
              key={exp.id}
              className={
                index !== resumeData.experience.length - 1 ? "mb-4" : ""
              }
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-[#5E503F] font-medium">{exp.company}</p>
              <p className="text-sm mt-1 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {resumeData.education.length > 0 &&
        resumeData.education[0].institution && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase text-[#22333B] mb-3">
              Education
            </h2>

            {resumeData.education.map((edu, index) => (
              <div
                key={edu.id}
                className={
                  index !== resumeData.education.length - 1 ? "mb-4" : ""
                }
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {edu.graduationDate}
                  </span>
                </div>
                <p className="text-[#5E503F] font-medium">{edu.institution}</p>
                {edu.gpa && (
                  <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}

      {resumeData.skills.length > 0 && resumeData.skills[0] && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-[#22333B] mb-3">
            Skills
          </h2>
          <p className="text-gray-700">
            {resumeData.skills.filter((skill) => skill).join(" • ")}
          </p>
        </div>
      )}

      {resumeData.projects.length > 0 && resumeData.projects[0].title && (
        <div>
          <h2 className="text-lg font-bold uppercase text-[#22333B] mb-3">
            Projects
          </h2>

          {resumeData.projects.map((project, index) => (
            <div
              key={project.id}
              className={index !== resumeData.projects.length - 1 ? "mb-4" : ""}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    className="text-[#22333B] hover:underline text-sm"
                  >
                    View Project
                  </a>
                )}
              </div>
              <p className="text-sm mt-1 text-gray-700">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MinimalTemplate({ resumeData }) {
  return (
    <div className="h-full p-8 bg-[#F2F4F3]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0A0908]">
          {resumeData.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-lg text-[#5E503F] mt-1">
          {resumeData.personalInfo.jobTitle || "Professional Title"}
        </p>

        <div className="flex flex-wrap mt-3 text-sm">
          {resumeData.personalInfo.email && (
            <div className="mr-4 mb-1">{resumeData.personalInfo.email}</div>
          )}

          {resumeData.personalInfo.phone && (
            <div className="mr-4 mb-1">{resumeData.personalInfo.phone}</div>
          )}

          {resumeData.personalInfo.location && (
            <div className="mb-1">{resumeData.personalInfo.location}</div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {resumeData.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#22333B] mb-2">About Me</h2>
            <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {resumeData.experience.length > 0 &&
          resumeData.experience[0].company && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#22333B] mb-2">
                Experience
              </h2>

              {resumeData.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={
                    index !== resumeData.experience.length - 1 ? "mb-4" : ""
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      {exp.position} @ {exp.company}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-gray-700">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}

        {resumeData.education.length > 0 &&
          resumeData.education[0].institution && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#22333B] mb-2">
                Education
              </h2>

              {resumeData.education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={
                    index !== resumeData.education.length - 1 ? "mb-4" : ""
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <p className="text-[#5E503F]">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          )}

        <div className="grid grid-cols-2 gap-6">
          {resumeData.skills.length > 0 && resumeData.skills[0] && (
            <div>
              <h2 className="text-lg font-bold text-[#22333B] mb-2">Skills</h2>
              <div className="flex flex-wrap">
                {resumeData.skills.map(
                  (skill, index) =>
                    skill && (
                      <span
                        key={index}
                        className="bg-[#A9927D]/20 text-[#5E503F] px-2 py-1 rounded text-sm mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    )
                )}
              </div>
            </div>
          )}

          {resumeData.projects.length > 0 && resumeData.projects[0].title && (
            <div>
              <h2 className="text-lg font-bold text-[#22333B] mb-2">
                Projects
              </h2>

              {resumeData.projects.map((project, index) => (
                <div
                  key={project.id}
                  className={
                    index !== resumeData.projects.length - 1 ? "mb-3" : ""
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-[#A9927D] hover:underline text-sm"
                      >
                        Link
                      </a>
                    )}
                  </div>
                  <p className="text-sm mt-1 text-gray-700">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
