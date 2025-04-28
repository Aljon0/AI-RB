import { useEffect, useState } from "react";
import Header from "./Header";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import SavedResumes from "./SavedResumes";
import Sidebar from "./Sidebar";
import TemplateSelector from "./TemplateSelector";

export default function ResumeBuilder({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("editor");
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: user?.fullName || "",
      jobTitle: "",
      email: user?.email || "",
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
    const userKey = `savedResumes_${user?.email}`;
    const saved = localStorage.getItem(userKey);
    if (saved) {
      const parsedResumes = JSON.parse(saved);
      setSavedResumes(parsedResumes);

      // If there are saved resumes, load the most recent one's template
      if (parsedResumes.length > 0) {
        setSelectedTemplate(parsedResumes[0].template);
      }
    }
  }, [user?.email]);

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

    // Check if this resume already exists (by name)
    const existingIndex = savedResumes.findIndex(
      (resume) => resume.name === newResume.name
    );

    let updatedResumes;
    if (existingIndex >= 0) {
      // Update existing resume
      updatedResumes = [...savedResumes];
      updatedResumes[existingIndex] = newResume;
    } else {
      // Add new resume
      updatedResumes = [...savedResumes, newResume];
    }

    setSavedResumes(updatedResumes);

    // Save using user-specific key
    const userKey = `savedResumes_${user?.email}`;
    localStorage.setItem(userKey, JSON.stringify(updatedResumes));

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

    // Update using user-specific key
    const userKey = `savedResumes_${user?.email}`;
    localStorage.setItem(userKey, JSON.stringify(updatedResumes));
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Switch to editor tab when selecting a template
    setActiveTab("editor");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        saveResume={saveResume}
        user={user}
        selectedTemplate={selectedTemplate}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          username={user?.fullName || user?.email}
          onLogout={onLogout}
        />

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
              setSelectedTemplate={handleTemplateSelect}
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
