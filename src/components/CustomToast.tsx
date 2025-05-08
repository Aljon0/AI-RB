import React, { useEffect } from "react";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastConfig = {
  position: "top-right" as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const CustomToastContainer: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      className="custom-toast-container"
    />
  );
};

export const showSuccessToast = (message: string) => {
  toast.success(message, toastConfig);
};

export const showErrorToast = (message: string) => {
  toast.error(message, toastConfig);
};

export const showWarningToast = (message: string) => {
  toast.warning(message, toastConfig);
};

export const showInfoToast = (message: string) => {
  toast.info(message, toastConfig);
};

export const CustomToastCSS: React.FC = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .Toastify__toast {
        border-radius: 8px;
        font-family: inherit;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .Toastify__toast-container {
        width: auto;
        min-width: 300px;
        max-width: 400px;
      }
      
      .Toastify__toast--success {
        background-color: #F2F4F3;
        color: #22333B;
        border-left: 6px solid #5E503F;
      }
      
      .Toastify__toast--error {
        background-color: #F2F4F3;
        color: #22333B;
        border-left: 6px solid #A9927D;
      }
      
      .Toastify__toast--warning {
        background-color: #F2F4F3;
        color: #0A0908;
        border-left: 6px solid #A9927D;
      }
      
      .Toastify__toast--info {
        background-color: #F2F4F3;
        color: #22333B;
        border-left: 6px solid #22333B;
      }
      
      .Toastify__progress-bar {
        background: #5E503F;
      }
      
      .Toastify__close-button {
        color: #22333B;
        opacity: 0.7;
      }
      
      .Toastify__close-button:hover {
        opacity: 1;
      }
      
      .Toastify__toast-icon {
        color: #5E503F;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};