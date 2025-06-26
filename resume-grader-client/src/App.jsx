import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';

import 'react-circular-progressbar/dist/styles.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div
      className="w-full bg-black min-h-screen"
      style={{
        backgroundImage: "url('/noise.svg')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="font-inter">
        <Navbar />

        
        <main className="flex-1 flex flex-col items-center justify-center">
          <UploadSection setResult={setResult} />
          {result && <ResultSection result={result} />}
        </main>

       
      </div>
    </div>
  );
}

export default App;
