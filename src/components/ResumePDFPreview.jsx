const ResumePDFPreview = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
        <div className="bg-[#22333B] text-[#F2F4F3] py-2 px-4 rounded-t-lg flex justify-between items-center">
          <h2 className="font-bold">Resume Preview</h2>
          <div className="flex space-x-2 text-sm">
            <button className="bg-gradient-to-r from-[#A9927D] to-[#5E503F] hover:from-[#5E503F] hover:to-[#A9927D] text-white px-3 py-1 rounded transition duration-300 shadow-md">
              Save Resume
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto bg-[#F2F4F3]">
          <div className="bg-white shadow-md mx-auto max-w-3xl h-full rounded flex flex-col">
            {/* This is just a placeholder for the actual PDF preview */}
            <div className="p-6 flex-1">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#22333B] border-b border-[#A9927D] pb-1 mb-2">
                  Work Experience
                </h2>
                <div className="bg-gray-100 h-32 rounded animate-pulse"></div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#22333B] border-b border-[#A9927D] pb-1 mb-2">
                  Education
                </h2>
                <div className="bg-gray-100 h-16 rounded animate-pulse"></div>
              </div>
              
              <div>
                <h2 className="text-lg font-bold text-[#22333B] border-b border-[#A9927D] pb-1 mb-2">
                  Skills
                </h2>
                <div className="bg-gray-100 h-12 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResumePDFPreview;