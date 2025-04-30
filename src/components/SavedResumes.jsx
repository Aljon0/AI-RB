import { useState } from "react";

export function SavedResumes({ savedResumes, loadResume, deleteResume }) {
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  const handleDeleteClick = (resume) => {
    setResumeToDelete(resume);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (resumeToDelete) {
      setDeletingId(resumeToDelete.id);
      try {
        await deleteResume(resumeToDelete.id);
      } finally {
        setDeletingId(null);
        setShowConfirmation(false);
        setResumeToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setResumeToDelete(null);
  };

  return (
    <div className="p-4 md:p-6 overflow-y-auto max-h-screen">
      <h2 className="text-xl md:text-2xl font-bold text-[#0A0908] mb-4 md:mb-6">
        Saved Resumes
      </h2>

      {savedResumes.length === 0 ? (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm text-center">
          <svg
            className="w-10 h-10 md:w-12 md:h-12 mx-auto text-gray-400"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedResumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-[#0A0908] truncate max-w-[70%]">
                    {resume.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
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
                  onClick={() => handleDeleteClick(resume)}
                  disabled={deletingId === resume.id}
                  className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition flex items-center"
                >
                  {deletingId === resume.id ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="hidden xs:inline">Deleting...</span>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmation && resumeToDelete && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#F2F4F3] rounded-lg shadow-lg max-w-md w-full overflow-hidden border border-[#A9927D]">
            <div className="bg-[#22333B] px-4 sm:px-6 py-3 sm:py-4">
              <h3 className="text-base sm:text-lg font-medium text-white flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Confirm Delete
              </h3>
            </div>
            <div className="px-4 sm:px-6 py-3 sm:py-4">
              <p className="text-[#0A0908] text-sm sm:text-base">
                Are you sure you want to delete{" "}
                <span className="font-semibold">"{resumeToDelete.name}"</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 flex justify-end space-x-2 sm:space-x-3">
              <button
                onClick={cancelDelete}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-md border border-[#A9927D] text-[#5E503F] hover:bg-[#A9927D] hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition flex items-center"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
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
                Delete Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedResumes;
