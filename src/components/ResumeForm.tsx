import { useState } from "react";
import { TabNavigation } from "./TabNavigation";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import SkillsSection from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { ResumeData, TabNavigationItemProps } from "../utils/types";

interface ResumeFormProps {
  resumeData: ResumeData;
  handleDataChange: (section: keyof ResumeData, value: any) => void;
  selectedTemplate: string;
}

export function ResumeForm({ resumeData, handleDataChange, selectedTemplate }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState("personalInfo");

  const sections: TabNavigationItemProps[] = [
    { id: "personalInfo", label: "Personal Info" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  // Personal Info Handlers
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string | null) => {
    handleDataChange("personalInfo", {
      ...resumeData.personalInfo,
      [field]: value,
    });
  };

  // Experience Handlers
  const updateExperience = (index: number, field: keyof ResumeData['experience'][0], value: string) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    handleDataChange("experience", updatedExperience);
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    handleDataChange("experience", [...resumeData.experience, newExperience]);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    handleDataChange("experience", updatedExperience);
  };

  // Education Handlers
  const updateEducation = (index: number, field: keyof ResumeData['education'][0], value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    handleDataChange("education", updatedEducation);
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: "",
    };
    handleDataChange("education", [...resumeData.education, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    handleDataChange("education", updatedEducation);
  };

  // Skills Handlers
  const updateSkills = (index: number, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    handleDataChange("skills", updatedSkills);
  };

  const addSkill = () => {
    handleDataChange("skills", [...resumeData.skills, ""]);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    handleDataChange("skills", updatedSkills);
  };

  // Projects Handlers
  const updateProject = (index: number, field: keyof ResumeData['projects'][0], value: string) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    handleDataChange("projects", updatedProjects);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      link: "",
    };
    handleDataChange("projects", [...resumeData.projects, newProject]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    handleDataChange("projects", updatedProjects);
  };

  return (
    <div className="w-full lg:w-2/5 overflow-y-auto p-4 lg:p-6 bg-white border-r border-gray-200">
      <TabNavigation
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="mt-3 lg:mt-6">
        {activeSection === "personalInfo" && (
          <PersonalInfoSection
            personalInfo={resumeData.personalInfo}
            updatePersonalInfo={updatePersonalInfo}
            selectedTemplate={selectedTemplate}
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
            handleDataChange={(field, value) => handleDataChange(field as keyof ResumeData, value)}
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