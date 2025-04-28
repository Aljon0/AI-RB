import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";

export default function ResumeTemplate({ template, resumeData }) {
  switch (template) {
    case "modern":
      return <ModernTemplate resumeData={resumeData} />;
    case "classic":
      return <ClassicTemplate resumeData={resumeData} />;
    case "minimal":
      return <MinimalTemplate resumeData={resumeData} />;
    default:
      return <ModernTemplate resumeData={resumeData} />;
  }
}
