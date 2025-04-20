export function SavedResumes({ savedResumes, loadResume, deleteResume }) {
  return (
    <div className="p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-[#0A0908] mb-6">Saved Resumes</h2>

      {savedResumes.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            No saved resumes
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Create and save your first resume to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedResumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-[#0A0908] truncate">
                    {resume.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(resume.lastModified).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Template: {resume.template}
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-between">
                <button
                  onClick={() => loadResume(resume.id)}
                  className="text-sm bg-[#22333B] text-white px-3 py-1 rounded-md hover:bg-[#5E503F] transition flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  View
                </button>
                <button
                  onClick={() => deleteResume(resume.id)}
                  className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default SavedResumes;
