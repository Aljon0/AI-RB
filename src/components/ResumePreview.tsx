import { useRef } from "react";
import ResumeTemplate from "./ResumeTemplate";
import { ResumeData } from "../utils/types";

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: string;
  saveResume: () => void;
  isSaving: boolean;
}

export function ResumePreview({ resumeData, template, saveResume, isSaving }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  // Check if the current template should show the profile image
  const showProfileImage = ["professional", "tech"].includes(template);

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;
    
    const printWindow = window.open("", "_blank");
    const resumeHtml = resumeRef.current.innerHTML;

    printWindow?.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.personalInfo?.name || "Resume"}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              @page {
                size: A4;
                margin: 10mm;
              }
            }
          </style>
        </head>
        <body class="bg-white">
          <div class="w-full max-w-4xl mx-auto p-4">
            ${resumeHtml}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              }, 200);
            };
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
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
                : undefined,
            },
          }}
        />
      </div>

      {/* Tip text added above the buttons */}
      <div className="mb-3 text-center text-sm text-gray-600 italic">
        Tip: For best results, uncheck "Headers and Footers" in the print
        settings before saving to PDF.
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