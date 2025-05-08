import { useState, useEffect } from "react";

interface SkillsSectionProps {
  skills: string[];
  updateSkills: (index: number, value: string) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
  jobTitle?: string;
  handleDataChange: (field: string, value: any) => void;
}

export default function SkillsSection({
  skills,
  updateSkills,
  addSkill,
  removeSkill,
  jobTitle = "",
  handleDataChange,
}: SkillsSectionProps) {
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAISuggestions = async (title: string) => {
    if (!title || title.trim() === "") {
      setSuggestedSkills([
        "Communication",
        "Problem Solving",
        "Teamwork",
        "Time Management",
      ]);
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      // Connect to your Express backend
      const response = await fetch("https://ai-rb-api.onrender.com/api/get-skills-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle: title }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch skill suggestions");
      }
  
      const data = await response.json();
      setSuggestedSkills(data.skills || []);
    } catch (err) {
      console.error("Error fetching skill suggestions:", err);
      setError("Failed to get AI suggestions. Using default suggestions instead.");
      // Fall back to local suggestions
      setSuggestedSkills(getMockSuggestionsForTitle(title));
    } finally {
      setIsLoading(false);
    }
  };

  // Function for local fallback suggestions
  const getLocalSuggestions = (title = ""): string[] => {
    const commonSkills = [
      "Communication",
      "Problem Solving",
      "Teamwork",
      "Time Management",
    ];

    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("developer") || lowerTitle.includes("engineer")) {
      return [...commonSkills, "JavaScript", "React", "Git", "CSS", "HTML"];
    }
    if (lowerTitle.includes("designer")) {
      return [...commonSkills, "UI/UX", "Figma", "Adobe Creative Suite", "Prototyping"];
    }
    if (lowerTitle.includes("manager")) {
      return [...commonSkills, "Leadership", "Project Management", "Agile", "Budgeting"];
    }
    
    return [...commonSkills, "JavaScript", "React", "UI/UX Design", "Project Management"];
  };
  
  // Advanced mock suggestions while we fix the API route
  const getMockSuggestionsForTitle = (title = ""): string[] => {
    const commonSkills = [
      "Communication",
      "Problem Solving",
      "Teamwork",
      "Time Management",
      "Attention to Detail",
      "Critical Thinking"
    ];
    
    const lowerTitle = title.toLowerCase();
    
    // Healthcare jobs
    if (lowerTitle.includes("nurse") || lowerTitle.includes("nursing")) {
      return [
        "Patient Care",
        "Medical Record Documentation",
        "Vital Signs Monitoring",
        "Medication Administration",
        "Wound Care",
        "Patient Advocacy",
        "CPR/BLS Certified",
        "Care Planning",
        "Clinical Assessment",
        "EMR/EHR Systems",
        ...commonSkills.slice(0, 4)
      ];
    }
    
    if (lowerTitle.includes("doctor") || lowerTitle.includes("physician")) {
      return [
        "Diagnosis",
        "Treatment Planning",
        "Patient Consultation",
        "Medical Documentation",
        "Preventative Care",
        "Clinical Research",
        "Medical Software",
        "Patient Education",
        "Case Management",
        "Clinical Leadership",
        ...commonSkills.slice(0, 2)
      ];
    }
    
    // Tech jobs
    if (lowerTitle.includes("developer") || lowerTitle.includes("engineer")) {
      return [
        "JavaScript",
        "React",
        "Git",
        "CSS",
        "HTML",
        "API Integration",
        "Unit Testing",
        "Agile Methodology",
        "Code Review",
        "System Architecture",
        "Problem Solving",
        "Collaboration"
      ];
    }
    
    if (lowerTitle.includes("data") && (lowerTitle.includes("scientist") || lowerTitle.includes("analyst"))) {
      return [
        "Python",
        "SQL",
        "Data Visualization",
        "Statistical Analysis",
        "Machine Learning",
        "Data Cleaning",
        "Jupyter Notebooks",
        "R",
        "Tableau",
        "Predictive Modeling",
        "Critical Thinking",
        "Communication"
      ];
    }
    
    // Business jobs
    if (lowerTitle.includes("manager")) {
      return [
        "Leadership",
        "Project Management",
        "Agile/Scrum",
        "Budgeting",
        "Team Building",
        "Strategic Planning",
        "Performance Reviews",
        "Stakeholder Management",
        "Risk Assessment",
        "Microsoft Office Suite",
        "Communication",
        "Problem Solving"
      ];
    }
    
    if (lowerTitle.includes("marketing")) {
      return [
        "Social Media Marketing",
        "Content Creation",
        "SEO/SEM",
        "Google Analytics",
        "Email Marketing",
        "Brand Development",
        "Market Research",
        "Campaign Management",
        "Adobe Creative Suite",
        "CRM Systems",
        "Communication",
        "Creativity"
      ];
    }
    
    if (lowerTitle.includes("sales")) {
      return [
        "Negotiation",
        "Client Relationship Management",
        "Cold Calling",
        "Sales Presentations",
        "CRM Software",
        "Lead Generation",
        "Product Knowledge",
        "Territory Management",
        "Closing Techniques",
        "Pipeline Management",
        "Communication",
        "Persuasion"
      ];
    }
    
    if (lowerTitle.includes("designer")) {
      return [
        "UI/UX Design",
        "Figma",
        "Adobe Creative Suite",
        "Prototyping",
        "User Research",
        "Wireframing",
        "Visual Design",
        "Typography",
        "Design Systems",
        "Usability Testing",
        "Creativity",
        "Attention to Detail"
      ];
    }
    
    // Default - general professional skills
    return [
      "Microsoft Office Suite",
      "Google Workspace",
      "Data Analysis",
      "Project Management",
      "Research",
      "Reporting",
      "Presentation Skills",
      "Leadership",
      "Organization",
      ...commonSkills
    ];
  };

  // Fetch suggestions when job title changes
  useEffect(() => {
    fetchAISuggestions(jobTitle || "");
  }, [jobTitle]);

  // Add a skill from suggestions
  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      handleDataChange("skills", [...skills, skill]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-[#5E503F]">Skills</h3>
        <button
          onClick={addSkill}
          className="flex items-center justify-center text-sm bg-[#22333B] text-white px-3 py-2 rounded-md hover:bg-[#5E503F] transition w-full sm:w-auto"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Skill
        </button>
      </div>

      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateSkills(index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              placeholder="e.g., JavaScript, Project Management"
            />
            {skills.length > 1 && (
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700 p-2"
                aria-label="Remove skill"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#F2F4F3] rounded-lg border border-gray-200">
        <h4 className="font-medium mb-2 text-[#5E503F]">
          AI Suggestions
          {isLoading && (
            <span className="ml-2 inline-block">
              <svg className="animate-spin h-4 w-4 text-[#5E503F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          )}
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          Based on your job title ({jobTitle || "not specified"}), here are some suggested skills:
        </p>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill, i) => (
            <button
              key={i}
              className="px-3 py-1 bg-[#A9927D] text-white text-sm rounded-full hover:bg-[#5E503F] transition"
              onClick={() => addSuggestedSkill(skill)}
              disabled={isLoading}
            >
              + {skill}
            </button>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          <p>Smart suggestions powered by AI</p>
        </div>
      </div>
    </div>
  );
}