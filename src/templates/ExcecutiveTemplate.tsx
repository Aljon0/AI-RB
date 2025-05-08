import { TemplateProps } from "../utils/types";

export default function ExecutiveTemplate({ resumeData }: TemplateProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with accent bar */}
      <div className="relative bg-gray-100 border-t-8 border-amber-600 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {resumeData.personalInfo.name || "Your Name"}
              </h1>
              <p className="text-xl text-amber-600 font-medium mt-1">
                {resumeData.personalInfo.jobTitle || "Professional Title"}
              </p>

              {resumeData.personalInfo.summary && (
                <p className="mt-4 text-gray-700 max-w-2xl">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>

            <div className="text-right">
              {resumeData.personalInfo.email && (
                <div className="mb-1 text-gray-700">
                  <span className="font-medium">Email:</span>{" "}
                  {resumeData.personalInfo.email}
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div className="mb-1 text-gray-700">
                  <span className="font-medium">Phone:</span>{" "}
                  {resumeData.personalInfo.phone}
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="text-gray-700">
                  <span className="font-medium">Location:</span>{" "}
                  {resumeData.personalInfo.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-12 gap-8">
          {/* Main column */}
          <div className="col-span-8">
            {resumeData.experience.length > 0 &&
              resumeData.experience[0]?.company && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 border-b border-amber-200 pb-2 mb-6">
                    Professional Experience
                  </h2>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-gray-900">
                          {exp.position}
                        </h3>
                        <span className="text-gray-600">
                          {exp.startDate} - {exp.endDate || "Present"}
                        </span>
                      </div>
                      <p className="text-amber-700 font-medium">
                        {exp.company}
                      </p>
                      {exp.description && (
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {resumeData.projects.length > 0 &&
              resumeData.projects[0]?.title && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 border-b border-amber-200 pb-2 mb-6">
                    Key Projects
                  </h2>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">
                          {project.title}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            className="text-amber-600 hover:underline text-sm"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-gray-600 mt-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Side column */}
          <div className="col-span-4">
            {resumeData.education.length > 0 &&
              resumeData.education[0]?.institution && (
                <div className="mb-6 bg-gray-50 p-5 rounded">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Education
                  </h2>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-bold text-gray-800">
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </h3>
                      <p className="text-amber-700">{edu.institution}</p>
                      <p className="text-gray-600 text-sm">
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
              <div className="bg-gray-50 p-5 rounded">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap">
                  {resumeData.skills.map(
                    (skill, index) =>
                      skill && (
                        <div
                          key={index}
                          className="flex items-center mb-2 mr-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-gray-700">{skill}</span>
                        </div>
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