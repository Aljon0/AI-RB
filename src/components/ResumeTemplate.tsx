import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ExecutiveTemplate from "../templates/ExcecutiveTemplate";
import { ResumeTemplateProps } from "@/utils/types";

export default function ResumeTemplate({ template, resumeData }: ResumeTemplateProps) {
  switch (template) {
    case "modern":
      return <ModernTemplate resumeData={resumeData} />;
    case "classic":
      return <ClassicTemplate resumeData={resumeData} />;
    case "minimal":
      return <MinimalTemplate resumeData={resumeData} />;
    case "professional":
      return <ProfessionalTemplate resumeData={resumeData} />;
    case "creative":
      return <CreativeTemplate resumeData={resumeData} />;
    case "executive":
      return <ExecutiveTemplate resumeData={resumeData} />;
    default:
      return <ModernTemplate resumeData={resumeData} />;
  }
}
