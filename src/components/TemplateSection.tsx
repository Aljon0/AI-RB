import { 
  EducationSectionProps, 
  ExperienceSectionProps, 
  ProjectsProps, 
  SectionProps, 
  SkillsProps,
  Experience,
  Education,
  Project
} from "@/utils/types";

export function Section({ title, children, borderColor = "border-[#A9927D]" }: SectionProps) {
  return (
    <div className="mb-6">
      <h2
        className={`text-lg font-bold text-[#5E503F] border-b-2 ${borderColor} pb-1 mb-3`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  if (!experience || experience.length === 0) return null;

  return (
    <Section title="Work Experience">
      {experience.map((exp, index) => (
        <ExperienceItem
          key={exp.id}
          exp={exp}
          isLast={index === experience.length - 1}
        />
      ))}
    </Section>
  );
}

export function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) return null;

  return (
    <Section title="Education">
      {education.map((edu, index) => (
        <EducationItem
          key={edu.id}
          edu={edu}
          isLast={index === education.length - 1}
        />
      ))}
    </Section>
  );
}

export function SkillsSection({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <Section title="Skills">
      <div className="flex flex-wrap">
        {skills.map(
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
    </Section>
  );
}

export function ProjectsSection({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <Section title="Projects">
      {projects.map((project, index) => (
        <ProjectItem
          key={project.id}
          project={project}
          isLast={index === projects.length - 1}
        />
      ))}
    </Section>
  );
}

// Individual item components
interface ExperienceItemProps {
  exp: Experience;
  isLast: boolean;
}

function ExperienceItem({ exp, isLast }: ExperienceItemProps) {
  return (
    <div className={!isLast ? "mb-4" : ""}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{exp.position || "Position"}</h3>
        {(exp.startDate || exp.endDate) && (
          <span className="text-sm text-gray-600">
            {exp.startDate} - {exp.endDate}
          </span>
        )}
      </div>
      {exp.company && (
        <p className="text-[#5E503F] font-medium">{exp.company}</p>
      )}
      {exp.description && (
        <p className="text-sm mt-1 text-gray-700">{exp.description}</p>
      )}
    </div>
  );
}

interface EducationItemProps {
  edu: Education;
  isLast: boolean;
}

function EducationItem({ edu, isLast }: EducationItemProps) {
  return (
    <div className={!isLast ? "mb-4" : ""}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">
          {edu.degree || "Degree"}
          {edu.field ? ` in ${edu.field}` : ""}
        </h3>
        {edu.graduationDate && (
          <span className="text-sm text-gray-600">{edu.graduationDate}</span>
        )}
      </div>
      {edu.institution && (
        <p className="text-[#5E503F] font-medium">{edu.institution}</p>
      )}
      {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
    </div>
  );
}

interface ProjectItemProps {
  project: Project;
  isLast: boolean;
}

function ProjectItem({ project, isLast }: ProjectItemProps) {
  return (
    <div className={!isLast ? "mb-4" : ""}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{project.title || "Project Title"}</h3>
        {project.link && (
          <a
            href={project.link}
            className="text-[#22333B] hover:underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        )}
      </div>
      {project.description && (
        <p className="text-sm mt-1 text-gray-700">{project.description}</p>
      )}
    </div>
  );
}