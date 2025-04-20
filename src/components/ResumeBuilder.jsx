import { useEffect, useState } from "react";

// Component imports
import Header from "./Header";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import SavedResumes from "./SavedResumes";
import Sidebar from "./Sidebar";
import TemplateSelector from "./TemplateSelector";

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("editor");
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [
      {
        id: 1,
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        id: 1,
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: "",
      },
    ],
    skills: [""],
    projects: [{ id: 1, title: "", description: "", link: "" }],
  });
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [savedResumes, setSavedResumes] = useState([]);

  // Load saved resumes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedResumes");
    if (saved) {
      setSavedResumes(JSON.parse(saved));
    }
  }, []);

  const handleDataChange = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const saveResume = () => {
    const newResume = {
      id: Date.now(),
      name: resumeData.personalInfo.name || "Untitled Resume",
      data: resumeData,
      template: selectedTemplate,
      lastModified: new Date().toISOString(),
    };

    const updatedResumes = [...savedResumes, newResume];
    setSavedResumes(updatedResumes);
    localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));

    alert("Resume saved successfully!");
  };

  const loadResume = (id) => {
    const resumeToLoad = savedResumes.find((resume) => resume.id === id);
    if (resumeToLoad) {
      setResumeData(resumeToLoad.data);
      setSelectedTemplate(resumeToLoad.template);
      setActiveTab("editor");
    }
  };

  const deleteResume = (id) => {
    const updatedResumes = savedResumes.filter((resume) => resume.id !== id);
    setSavedResumes(updatedResumes);
    localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header saveResume={saveResume} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col overflow-hidden bg-[#F2F4F3]">
          {activeTab === "editor" && (
            <div className="flex flex-1 overflow-hidden">
              <ResumeForm
                resumeData={resumeData}
                handleDataChange={handleDataChange}
              />
              <ResumePreview
                resumeData={resumeData}
                template={selectedTemplate}
              />
            </div>
          )}

          {activeTab === "templates" && (
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          )}

          {activeTab === "saved" && (
            <SavedResumes
              savedResumes={savedResumes}
              loadResume={loadResume}
              deleteResume={deleteResume}
            />
          )}
        </div>
      </div>
    </div>
  );
}
