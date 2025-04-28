export function Section({ title, children, borderColor = "border-[#A9927D]" }) {
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

export function ExperienceSection({ experience }) {
  if (!experience.length || !experience[0].company) return null;

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

export function EducationSection({ education }) {
  if (!education.length || !education[0].institution) return null;

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

export function SkillsSection({ skills }) {
  if (!skills.length || !skills[0]) return null;

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

export function ProjectsSection({ projects }) {
  if (!projects.length || !projects[0].title) return null;

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
function ExperienceItem({ exp, isLast }) {
  return (
    <div className={!isLast ? "mb-4" : ""}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{exp.position}</h3>
        <span className="text-sm text-gray-600">
          {exp.startDate} - {exp.endDate}
        </span>
      </div>
      <p className="text-[#5E503F] font-medium">{exp.company}</p>
      <p className="text-sm mt-1 text-gray-700">{exp.description}</p>
    </div>
  );
}

function EducationItem({ edu, isLast }) {
  return (
    <div className={!isLast ? "mb-4" : ""}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">
          {edu.degree}
          {edu.field ? ` in ${edu.field}` : ""}
        </h3>
        <span className="text-sm text-gray-600">{edu.graduationDate}</span>
      </div>
      <p className="text-[#5E503F] font-medium">{edu.institution}</p>
      {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
    </div>
  );
}

function ProjectItem({ project, isLast }) {
  return (
    <div className={!isLast ? "mb-4" : ""}>
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
      <p className="text-sm mt-1 text-gray-700">{project.description}</p>
    </div>
  );
}
