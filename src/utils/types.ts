// Updated types.ts
export type User = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: string;
  isAnonymous?: boolean;
};

export type FormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Resume = {
  id: string;
  name: string;
  data: ResumeData;
  template: string;
  lastModified: Date;
};

export type PersonalInfo = {
  name?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  profileImage?: string;
};

export type Experience = {
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  id: string;
};

export type Education = {
  institution?: string;
  degree?: string;
  field?: string;
  graduationDate?: string;
  gpa?: string;
  id: string;
};

export type Project = {
  title?: string;
  description?: string;
  link?: string;
  id: string;
};

export type ResumeData = {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
};

export type TemplateProps = {
  resumeData: ResumeData;
};

export type TemplateHeaderProps = {
  personalInfo: PersonalInfo;
  isDark?: boolean;
};

export type ContactItemProps = {
  icon: "email" | "phone" | "location";
  value: string;
  email?: string;
  phone?: string;
  location?: string;
};

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  borderColor?: string;
};

export type ExperienceSectionProps = {
  experience: Experience[];
  company?: string;
};

export type EducationSectionProps = {
  education: Education[];
  institution?: string;
};

export type SkillsProps = {
  skills: string[];
};

export type ProjectsProps = {
  projects: Project[];
};

export type TemplateSelectorProps = {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  templates: string[];
  isDark?: boolean;
};

export type TabNavigationProps = {
  sections: TabNavigationItemProps[];
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
};

export type TabNavigationItemProps = {
  id: string;
  label: string;
};

export type HeaderProps = {
  user: User;
  username: string | null;
  onLogout?: () => void;
};

export type LogoutConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export type ResumeTemplateProps = {
  template: string;
  resumeData: ResumeData;
};

export type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  username: string | null;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  windowWidth: number;
};

export interface ToastConfig {
  position: string;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress?: undefined;
}

export interface EducationSectionMainProps {
  education: Education[];
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
}

export interface ExperienceSectionMainProps {
  experience: Experience[];
  updateExperience: (index: number, field: keyof Experience, value: string) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
}

export interface SkillsSectionProps {
  skills: string[];
  updateSkills: (index: number, value: string) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
  jobTitle?: string;
  handleDataChange: (field: string, value: any) => void;
}