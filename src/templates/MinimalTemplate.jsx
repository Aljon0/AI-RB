import {
  ExperienceSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  Section,
} from "../components/TemplateSection";

export default function MinimalTemplate({ resumeData }) {
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
          <Section title="About Me" borderColor="border-transparent">
            <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
          </Section>
        )}

        <ExperienceSection experience={resumeData.experience} />
        <EducationSection education={resumeData.education} />

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

          <ProjectsSection projects={resumeData.projects} />
        </div>
      </div>
    </div>
  );
}
