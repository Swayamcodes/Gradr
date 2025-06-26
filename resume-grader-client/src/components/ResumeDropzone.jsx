import React, { useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";

const ResumeDropzone = ({ setResumeFile }) => {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      setResumeFile(file);
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  return (
    <div className="transition-all duration-300 ease-in-out border border-gray-700 hover:border-white hover:shadow-2xl rounded-2xl bg-black/30 p-4">
      <label
        htmlFor="resume-upload"
        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-600 rounded-xl p-6 cursor-pointer hover:border-white transition-all"
      >
        <HiOutlineDocumentText className="text-3xl text-gray-400" />
        <span className="text-gray-400 text-sm text-center">
          <span className="text-blue-400 hover:underline">Click to upload</span> or drag and drop
        </span>
        <span className="text-gray-500 text-xs">PDF only, max 5MB</span>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        {fileName && (
          <p className="mt-1 text-sm text-green-400">Uploaded: {fileName}</p>
        )}
      </label>
    </div>
  );
};

export default ResumeDropzone;
