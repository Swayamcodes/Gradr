import React, { useState } from 'react';

const JobDescDropzone = ({ onJobDescInput }) => {
  const [jobDescText, setJobDescText] = useState('');
  const [fileName, setFileName] = useState(null);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setJobDescText(text);
    setFileName(null);
    onJobDescInput({ type: 'text', value: text });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setJobDescText('');
      setFileName(file.name);
      onJobDescInput({ type: 'file', value: file });
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="rounded-2xl bg-black/30 p-6 border border-gray-700 hover:border-white hover:shadow-xl transition-all">
      <label className="block text-sm text-center font-medium text-zinc-300 mb-2">
        Enter Job Role or Paste Job Description
      </label>

      <textarea
        className={`w-full p-3 rounded bg-zinc-800 text-white focus:outline-none resize-none ${
          !jobDescText && !fileName ? 'border ' : 'border border-zinc-600'
        }`}
        rows={3}
        value={jobDescText}
        onChange={handleTextChange}
        placeholder="Paste job description or type job role..."
      />

      <div className="flex flex-col mt-3">
        <label htmlFor="jobdesc-upload" className="text-gray-300 text-xs mb-1">
          Or upload a Job Description PDF
        </label>
        <input
          id="jobdesc-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="text-sm text-white"
        />
        {fileName && (
          <p className="mt-1 text-sm text-green-400">Uploaded: {fileName}</p>
        )}
      </div>
    </div>
  );
};

export default JobDescDropzone;
