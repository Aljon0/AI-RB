/**
 * Uploads a PDF file to Cloudinary using the Upload API
 * @param {Blob} pdfBlob - The PDF file as a Blob
 * @param {string} userId - User ID for organizing files
 * @returns {Promise<string>} Public URL of the uploaded file
 */
export const uploadResumeToCloudinary = async (pdfBlob, userId) => {
  try {
    // Convert Blob to base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    // Create form data for upload
    const formData = new FormData();
    formData.append("file", base64Data);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", `resumes/${userId}`);
    formData.append("public_id", `resume_${Date.now()}`);

    // Use the Upload API endpoint
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
