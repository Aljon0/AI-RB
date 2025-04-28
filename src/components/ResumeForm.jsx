import { useState } from "react";
import { TabNavigation } from "./TabNavigation";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import SkillsSection from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";

export function ResumeForm({ resumeData, handleDataChange }) {
  const [activeSection, setActiveSection] = useState("personalInfo");

  const sections = [
    { id: "personalInfo", label: "Personal Info" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  // Personal Info Handlers
  const updatePersonalInfo = (field, value) => {
    handleDataChange("personalInfo", {
      ...resumeData.personalInfo,
      [field]: value,
    });
  };

  // Experience Handlers
  const updateExperience = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    handleDataChange("experience", updatedExperience);
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    handleDataChange("experience", [...resumeData.experience, newExperience]);
  };

  const removeExperience = (index) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    handleDataChange("experience", updatedExperience);
  };

  // Education Handlers
  const updateEducation = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    handleDataChange("education", updatedEducation);
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: "",
    };
    handleDataChange("education", [...resumeData.education, newEducation]);
  };

  const removeEducation = (index) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    handleDataChange("education", updatedEducation);
  };

  // Skills Handlers
  const updateSkills = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    handleDataChange("skills", updatedSkills);
  };

  const addSkill = () => {
    handleDataChange("skills", [...resumeData.skills, ""]);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    handleDataChange("skills", updatedSkills);
  };

  // Projects Handlers
  const updateProject = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    handleDataChange("projects", updatedProjects);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "",
      description: "",
      link: "",
    };
    handleDataChange("projects", [...resumeData.projects, newProject]);
  };

  const removeProject = (index) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    handleDataChange("projects", updatedProjects);
  };

  return (
    <div className="w-1/2 overflow-y-auto p-6 bg-white border-r border-gray-200">
      <TabNavigation
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="mt-6">
        {activeSection === "personalInfo" && (
          <PersonalInfoSection
            personalInfo={resumeData.personalInfo}
            updatePersonalInfo={updatePersonalInfo}
          />
        )}

        {activeSection === "experience" && (
          <ExperienceSection
            experience={resumeData.experience}
            updateExperience={updateExperience}
            addExperience={addExperience}
            removeExperience={removeExperience}
          />
        )}

        {activeSection === "education" && (
          <EducationSection
            education={resumeData.education}
            updateEducation={updateEducation}
            addEducation={addEducation}
            removeEducation={removeEducation}
          />
        )}

        {activeSection === "skills" && (
          <SkillsSection
            skills={resumeData.skills}
            updateSkills={updateSkills}
            addSkill={addSkill}
            removeSkill={removeSkill}
            jobTitle={resumeData.personalInfo.jobTitle}
            handleDataChange={handleDataChange}
          />
        )}

        {activeSection === "projects" && (
          <ProjectsSection
            projects={resumeData.projects}
            updateProject={updateProject}
            addProject={addProject}
            removeProject={removeProject}
          />
        )}
      </div>
    </div>
  );
}

export default ResumeForm;
