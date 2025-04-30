import Resumeguide from "../components/ResumeGuide";
import ResumePDFPreview from "../components/ResumePDFPreview";
import ResumeAssistant from "../components/ResumeAssistant";

export default function GenerateResumePage() {
    return (
      <div className="bg-[#F2F4F3] min-h-screen w-full p-4">
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left sidebar - Guide */}
          <div className="md:col-span-1">
            <Resumeguide />
          </div>
          
          {/* Right side - Preview and Chat */}
          <div className="md:col-span-2 space-y-4">
            {/* PDF Preview */}
            <div className="h-[60vh]">
              <ResumePDFPreview />
            </div>
            
            {/* Chat Interface */}
            <ResumeAssistant />
          </div>
        </div>
      </div>
    );
  }