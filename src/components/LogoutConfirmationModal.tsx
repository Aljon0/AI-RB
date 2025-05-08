import { LogoutConfirmationModalProps } from "@/utils/types";

export default function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F2F4F3] rounded-lg shadow-xl w-80 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-[#22333B] text-white p-4">
          <h3 className="font-medium text-lg">Confirm Logout</h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-[#0A0908] text-center mb-6">
            Are you sure you want to log out?
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-[#22333B] rounded-md hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#A9927D] text-white rounded-md hover:bg-[#5E503F] transition duration-300"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
