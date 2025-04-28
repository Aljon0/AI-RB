export default function TemplateHeader({ personalInfo, isDark = false }) {
  return (
    <div className={isDark ? "bg-[#22333B] text-white p-8" : ""}>
      <h1 className="text-3xl font-bold">{personalInfo.name || "Your Name"}</h1>
      <p className="text-xl mt-1">
        {personalInfo.jobTitle || "Professional Title"}
      </p>

      <div className="flex flex-wrap mt-4 text-sm">
        {personalInfo.email && (
          <ContactItem icon="email" value={personalInfo.email} />
        )}
        {personalInfo.phone && (
          <ContactItem icon="phone" value={personalInfo.phone} />
        )}
        {personalInfo.location && (
          <ContactItem icon="location" value={personalInfo.location} />
        )}
      </div>
    </div>
  );
}

export function ContactItem({ icon, value }) {
  const icons = {
    email: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    phone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
    location: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ),
  };

  return (
    <div className="flex items-center mr-4 mb-2">
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icons[icon]}
      </svg>
      {value}
    </div>
  );
}
