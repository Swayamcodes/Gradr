
import React, { useState } from "react";
import ResumeDropzone from "./ResumeDropzone";
import JobDescDropzone from "./JobDescDropzone";
import AnalyzeButton from "./AnalyzeButton";
import ResultSection from "./ResultSection";
import ChatWidget from "./ChatWidget";

const UploadSection = ({setResult}) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescFile, setJobDescFile] = useState(null);


  return (
    <>
      
      <div className="w-full min-h-screen flex flex-col justify-center px-4 pt-20 font-inter bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 relative overflow-hidden" id="upload">
       
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:72px_72px] mask-radial"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        
        <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur-sm mx-auto lg:mx-0">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-purple-200">AI-Powered Career Optimization</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent">Land Your</span><br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Dream Job</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Upload your resume and get instant AI-powered insights to optimize your career potential.
            </p>
          </div>

          
          <div className="bg-black/30 backdrop-blur-xl border border-slate-600/30 rounded-xl hover:border-cyan-400/30 hover:shadow-cyan-500/10 transition-all duration-500 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <span className="text-purple-300 mr-2">📄</span> Upload Resume
                </h3>
                <ResumeDropzone setResumeFile={setResumeFile} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <span className="text-cyan-300 mr-2">💼</span> Job Description
                </h3>
                <JobDescDropzone onJobDescInput={setJobDescFile} />
              </div>
              <AnalyzeButton
                resumeFile={resumeFile}
                jobDescFile={jobDescFile}
                setResult={(res) => {
                  setResult(res);
                  setTimeout(() => {
                    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      
    

      <style jsx>{`
        .mask-radial {
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%);
        }
      `}</style>
    </>
  );
};

export default UploadSection;
