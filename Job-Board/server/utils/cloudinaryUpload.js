const cloudinary = require("../config/cloudinary");

const uploadBufferToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error("Resume file buffer is missing."));
    }

    const safeName = originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "jobboard/resumes",
        resource_type: "raw",
        public_id: `${safeName}-${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }

        if (!result?.secure_url || !result?.public_id) {
          return reject(
            new Error("Cloudinary did not return the resume details.")
          );
        }

        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

module.exports = {
  uploadBufferToCloudinary,
};