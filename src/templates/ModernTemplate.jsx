import Header from "../components/TemplateHeader";
import {
  ExperienceSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  Section,
} from "../components/TemplateSection";

export default function ModernTemplate({ resumeData }) {
  return (
    <div className="h-full">
      <Header personalInfo={resumeData.personalInfo} isDark />

      <div className="p-8">
        {resumeData.personalInfo.summary && (
          <Section title="Professional Summary">
            <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
          </Section>
        )}

        <ExperienceSection experience={resumeData.experience} />
        <EducationSection education={resumeData.education} />
        <SkillsSection skills={resumeData.skills} />
        <ProjectsSection projects={resumeData.projects} />
      </div>
    </div>
  );
}
