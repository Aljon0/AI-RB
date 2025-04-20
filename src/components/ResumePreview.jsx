export function ResumePreview({ resumeData, template }) {
  return (
    <div className="w-1/2 bg-[#F2F4F3] p-6 overflow-y-auto flex flex-col">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-1 mb-4">
        {template === "modern" ? (
          <ModernTemplate resumeData={resumeData} />
        ) : template === "classic" ? (
          <ClassicTemplate resumeData={resumeData} />
        ) : (
          <MinimalTemplate resumeData={resumeData} />
        )}
      </div>

      <div className="mt-auto flex justify-center">
        <button className="px-4 py-2 bg-[#22333B] text-white rounded-md hover:bg-[#5E503F] transition duration-300 flex items-center">
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
