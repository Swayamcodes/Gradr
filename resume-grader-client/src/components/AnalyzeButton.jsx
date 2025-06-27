import React, { useState } from 'react';
import axios from 'axios';

const AnalyzeButton = ({ resumeFile, jobDescFile, setResult }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError("Please upload a resume file.");
      return;
    }

    const isTextEmpty =
      jobDescFile?.type === 'text' &&
      (!jobDescFile.value || jobDescFile.value.trim() === '');

    const isFileMissing =
      jobDescFile?.type === 'file' && !jobDescFile.value;

    if (!jobDescFile || isTextEmpty || isFileMissing) {
      setError("Please provide a job role or job description.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      if (jobDescFile.type === 'file') {
        formData.append("jobDesc", jobDescFile.value);
      }

      if (jobDescFile.type === 'text') {
        formData.append("jobDescText", jobDescFile.value);
      }

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className={`relative inline-block px-8 py-2 font-semibold tracking-wider rounded-full bg-black/20 text-cyan-200 backdrop-blur-md
          border-2 border-transparent transition-all duration-300
          ${isLoading ? 'cursor-not-allowed opacity-60' : 'hover:scale-105 hover:border-cyan-300'}
        `}
        style={{
          borderImage: 'linear-gradient(90deg, #38bdf8, #ec4899) 1',
          borderImageSlice: 1,
        }}
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default AnalyzeButton;
