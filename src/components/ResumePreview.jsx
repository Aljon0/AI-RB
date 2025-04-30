import { useRef } from "react";
import html2pdf from "html2pdf.js";
import ResumeTemplate from "./ResumeTemplate";

export function ResumePreview({ resumeData, template, saveResume, isSaving }) {
  const resumeRef = useRef(null);

  // Check if the current template should show the profile image
  const showProfileImage = ["professional", "tech"].includes(template);

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 10,
      filename: `${resumeData.personalInfo?.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
        letterRendering: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // Generate the PDF
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch((err) => console.error("Error generating PDF:", err));
  };

  return (
    <div className="w-full lg:w-1/2 bg-[#F2F4F3] p-4 lg:p-6 overflow-y-auto flex flex-col order-2 lg:order-none">
      <div
        ref={resumeRef}
        className="bg-white shadow-lg rounded-lg overflow-hidden flex-1 mb-4"
      >
        <ResumeTemplate
          template={template}
          resumeData={{
            ...resumeData,
            personalInfo: {
              ...resumeData.personalInfo,
              // Only include profileImage if the template should show it
              profileImage: showProfileImage
                ? resumeData.personalInfo.profileImage
                : null,
            },
          }}
        />
      </div>

      <div className="mt-auto flex flex-col sm:flex-row justify-center gap-4">
        {/* Save Resume button */}
        <button
          onClick={saveResume}
          disabled={isSaving}
          className={`px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ${
            isSaving
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#A9927D] to-[#5E503F] hover:from-[#5E503F] hover:to-[#A9927D] text-white transform hover:-translate-y-0.5 hover:shadow-md"
          }`}
        >
          {isSaving ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
              Saving...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"  
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                ></path>
              </svg>
              Save Resume
            </>
          )}
        </button>
        
        {/* Download PDF button */}
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-[#22333B] text-white rounded-md hover:bg-[#5E503F] transition duration-300 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ResumePreview;