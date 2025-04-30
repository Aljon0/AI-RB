import { useState } from "react";

// New component for the guide sidebar
const ResumeGuide = () => {
  return (
    <div className="bg-[#22333B] text-[#F2F4F3] p-4 rounded-lg shadow-lg h-full">
      <h2 className="font-bold text-xl mb-6 border-b border-[#A9927D] pb-2">Resume Building Guide</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-[#A9927D] mb-2">Personal Information</h3>
          <p className="text-sm opacity-90">Include your full name, contact details, and professional title.</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-[#A9927D] mb-2">Work Experience</h3>
          <p className="text-sm opacity-90">List your relevant work history with responsibilities and achievements.</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-[#A9927D] mb-2">Education</h3>
          <p className="text-sm opacity-90">Add your educational background, certifications, and relevant courses.</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-[#A9927D] mb-2">Skills</h3>
          <p className="text-sm opacity-90">Highlight your key technical and soft skills relevant to the position.</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-[#A9927D] mb-2">Projects</h3>
          <p className="text-sm opacity-90">Showcase notable projects that demonstrate your capabilities.</p>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-[#A9927D]">
        <h3 className="font-semibold text-[#A9927D] mb-2">Pro Tips</h3>
        <ul className="text-sm space-y-2 opacity-90">
          <li>• Use action verbs to describe your experience</li>
          <li>• Quantify achievements when possible</li>
          <li>• Tailor your resume to each job application</li>
          <li>• Keep your resume concise and relevant</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeGuide;