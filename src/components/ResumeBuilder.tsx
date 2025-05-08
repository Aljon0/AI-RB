import { useEffect, useState } from "react";
import {
  deleteResumeFromFirestore,
  getUserResumes,
  saveResumeToFirestore,
} from "../firebase";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "./CustomToast";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import SavedResumes from "./SavedResumes";
import Sidebar from "./Sidebar";
import TemplateSelector from "./TemplateSelector";
import { ResumeData, Resume, User } from "../utils/types";

interface ResumeBuilderProps {
  user: User | null;
  onLogout: () => void;
}

export default function ResumeBuilder({ user }: ResumeBuilderProps) {
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: user?.displayName || "",
      jobTitle: "",
      email: user?.email || "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [
      {
        id: "1",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        id: "1",
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: "",
      },
    ],
    skills: [""],
    projects: [{ id: "1", title: "", description: "", link: "" }],
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");
  const [savedResumes, setSavedResumes] = useState<Resume[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load saved resumes from Firebase
  useEffect(() => {
    const loadResumes = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const resumes = await getUserResumes();
        setSavedResumes(resumes);

        // If there are saved resumes, load the most recent one
        if (resumes.length > 0) {
          // Sort by last modified (most recent first)
          const sortedResumes = [...resumes].sort(
            (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
          );
          const mostRecent = sortedResumes[0];
          setResumeData(mostRecent.data);
          setSelectedTemplate(mostRecent.template);
        }
      } catch (error) {
        showErrorToast(`Error loading saved resumes: , ${error as Error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadResumes();
  }, [user]);

  const handleDataChange = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const saveResume = async () => {
    if (!user) {
      showWarningToast("Please log in to save your resume");
      return;
    }

    setIsSaving(true);

    try {
      // Save to Firebase
      const resumeId = await saveResumeToFirestore(
        resumeData,
        selectedTemplate
      );

      // Refresh the saved resumes list
      const updatedResumes = await getUserResumes();
      setSavedResumes(updatedResumes);

      showSuccessToast("Resume saved successfully!");
    } catch (error) {
      const err = error as Error;
      showErrorToast(`Error saving resume: , ${err as Error}`);
      showErrorToast(`Failed to save resume: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const loadResume = (id: string) => {
    const resumeToLoad = savedResumes.find((resume) => resume.id === id);
    if (resumeToLoad) {
      setResumeData(resumeToLoad.data);
      setSelectedTemplate(resumeToLoad.template);
      setActiveTab("editor");
    }
  };

  const deleteResume = async (id: string) => {
    try {
      await deleteResumeFromFirestore(id);
      setSavedResumes((prev) => prev.filter((resume) => resume.id !== id));
    } catch (error) {
      const err = error as Error;
      showErrorToast(`Error deleting resume: , ${err as Error}`);
      showErrorToast(`Failed to delete resume: ${err.message}`);
    }
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setActiveTab("editor");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          username={user?.displayName || user?.email || null}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          windowWidth={windowWidth}
        />

        <div className="flex-1 flex flex-col overflow-hidden bg-[#F2F4F3]">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin w-10 h-10 text-[#22333B]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="mt-3 text-[#22333B]">Loading your resumes...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "editor" && (
                <div className="flex-1 flex flex-col lg:flex-row overflow-auto">
                  <ResumeForm
                    resumeData={resumeData}
                    handleDataChange={handleDataChange}
                    selectedTemplate={selectedTemplate}
                  />
                  <ResumePreview
                    resumeData={resumeData}
                    template={selectedTemplate}
                    saveResume={saveResume}
                    isSaving={isSaving}
                  />
                </div>
              )}

              {activeTab === "templates" && (
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={handleTemplateSelect}
                  templates={["modern", "professional", "tech", "creative", "minimal"]}
                />
              )}

              {activeTab === "saved" && (
                <SavedResumes
                  savedResumes={savedResumes}
                  loadResume={loadResume}
                  deleteResume={deleteResume}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}