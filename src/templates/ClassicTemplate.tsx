import { ContactItem } from "../components/TemplateHeader";
import {
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  Section,
} from "../components/TemplateSection";
import { ResumeData } from "../utils/types";

export default function ClassicTemplate({ resumeData }: { resumeData: ResumeData }) {
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
            <ContactItem icon="email" value={resumeData.personalInfo.email} />
          )}
          {resumeData.personalInfo.phone && (
            <ContactItem icon="phone" value={resumeData.personalInfo.phone} />
          )}
          {resumeData.personalInfo.location && (
            <ContactItem
              icon="location"
              value={resumeData.personalInfo.location}
            />
          )}
        </div>
      </div>

      <hr className="border-gray-300 my-6" />

      {resumeData.personalInfo.summary && (
        <Section title="Professional Summary" borderColor="border-transparent">
          <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
        </Section>
      )}

      <ExperienceSection experience={resumeData.experience} />
      <EducationSection education={resumeData.education} />

      {resumeData.skills.length > 0 && resumeData.skills[0] && (
        <Section title="Skills" borderColor="border-transparent">
          <p className="text-gray-700">
            {resumeData.skills.filter((skill) => skill).join(" • ")}
          </p>
        </Section>
      )}

      <ProjectsSection projects={resumeData.projects} />
    </div>
  );
}