import { useState, useRef } from "react";
import { PersonalInfo } from "../utils/types"; // Adjust path as needed

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (field: keyof PersonalInfo, value: string | null) => void;
  selectedTemplate: string;
}

export function PersonalInfoSection({
  personalInfo,
  updatePersonalInfo,
  selectedTemplate,
}: PersonalInfoSectionProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showProfileImage = ["professional", "tech"].includes(selectedTemplate);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (file: File) => {
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => 
      updatePersonalInfo("profileImage", e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onButtonClick = () => inputRef.current?.click();
  const removeImage = () => updatePersonalInfo("profileImage", null);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#5E503F]">Personal Information</h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {showProfileImage && (
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              {personalInfo.profileImage ? (
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#A9927D] shadow-lg">
                  <img
                    src={personalInfo.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                    aria-label="Remove photo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  className={`w-full h-full rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition ${
                    dragActive ? "border-[#5E503F] bg-[#f8f4f0]" : "border-gray-300"
                  }`}
                  onClick={onButtonClick}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
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
                  <span className="text-sm text-gray-500 mt-2">Add Photo</span>
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={onButtonClick}
              className="mt-4 px-4 py-2 bg-[#A9927D] text-white rounded-md hover:bg-[#8a7967] transition shadow-md w-full sm:w-auto"
            >
              {personalInfo.profileImage ? "Change Photo" : "Upload Photo"}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Recommended: Square image, 400x400px or larger
            </p>
          </div>
        )}

        <div className={`w-full ${showProfileImage ? "lg:w-2/3" : ""} space-y-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={personalInfo.name || ""}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={personalInfo.jobTitle || ""}
                onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={personalInfo.email || ""}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={personalInfo.phone || ""}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={personalInfo.location || ""}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D]"
              placeholder="City, State/Province, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Summary
            </label>
            <textarea
              value={personalInfo.summary || ""}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9927D] min-h-[120px]"
              placeholder="Write a short summary about yourself and your professional goals..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoSection;