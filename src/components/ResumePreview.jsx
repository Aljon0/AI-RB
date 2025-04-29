import { useRef } from "react";
import html2pdf from "html2pdf.js";
import ResumeTemplate from "./ResumeTemplate";

export function ResumePreview({ resumeData, template }) {
  const resumeRef = useRef(null);

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 10,
      filename: `${resumeData.personalInfo?.fullName || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, logging: true, useCORS: true },
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
    <div className="w-1/2 bg-[#F2F4F3] p-6 overflow-y-auto flex flex-col">
      <div
        ref={resumeRef}
        className="bg-white shadow-lg rounded-lg overflow-hidden flex-1 mb-4"
      >
        <ResumeTemplate template={template} resumeData={resumeData} />
      </div>

      <div className="mt-auto flex justify-center">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-[#22333B] text-white rounded-md hover:bg-[#5E503F] transition duration-300 flex items-center"
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
