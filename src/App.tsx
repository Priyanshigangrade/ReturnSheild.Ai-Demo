import React, { useState } from 'react';

export default function App() {
  const [sellerImages, setSellerImages] = useState([null, null, null]);
  const [buyerImages, setBuyerImages] = useState([null, null, null]);
  const [result, setResult] = useState(null);

  // Simple text-to-speech function - exactly like your VisionSpeak project
  const speakText = (text) => {
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  const handleImageChange = (e, index, type) => {
    const file = e.target.files[0];
    const imageUrl = file ? URL.createObjectURL(file) : null;

    const updatedImages = type === 'seller' ? [...sellerImages] : [...buyerImages];
    updatedImages[index] = { file, url: imageUrl };

    if (type === 'seller') {
      setSellerImages(updatedImages);
    } else {
      setBuyerImages(updatedImages);
    }

    setResult(null);
  };

  const checkFraud = () => {
    if (result) return;

    const allSeller = sellerImages.every(img => img && img.file);
    const allBuyer = buyerImages.every(img => img && img.file);

    if (!allSeller || !allBuyer) {
      alert("Please upload all 3 images for both seller and buyer.");
      return;
    }

    let matched = true;
    for (let i = 0; i < 3; i++) {
      if (sellerImages[i].file.name !== buyerImages[i].file.name) {
        matched = false;
        break;
      }
    }

    const score = matched ? 97 : 49;

    setResult({
      match: matched,
      score: score
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        
        {/* Test Speech Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => speakText("Hello, this is ReturnShield AI. Text to speech is working correctly.")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 mr-4"
          >
            🔊 Test Speech
          </button>
          <button
            onClick={() => speakText("ReturnShield AI Demo")}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300"
          >
            🎵 Speak Title
          </button>
        </div>

        <h1 
          className="text-center mb-3 text-gray-800 text-4xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
          onClick={() => speakText("ReturnShield AI Demo")}
        >
          ReturnShield.AI Demo
        </h1>
        
        <p 
          className="text-center text-gray-600 mb-10 text-lg cursor-pointer hover:text-indigo-600 transition-colors"
          onClick={() => speakText("Fraud Detection using AI-based Image Matching")}
        >
          Fraud Detection using AI-based Image Matching
        </p>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Seller Section */}
          <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200 hover:border-indigo-500 transition-all duration-300 shadow-lg border-l-4 border-l-emerald-500">
            <h2 
              className="text-gray-800 mb-5 text-xl font-semibold text-center cursor-pointer hover:text-indigo-600 transition-colors"
              onClick={() => speakText("Seller Side Upload")}
            >
              📦 Seller Side Upload
            </h2>
            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((_, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index, 'seller')}
                      className="hidden"
                    />
                    <div 
                      className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 px-5 rounded-lg text-center font-medium cursor-pointer hover:shadow-lg transition-all duration-300"
                      onClick={() => speakText(sellerImages[index]?.url ? 'Change Image' : `Upload Image ${index + 1}`)}
                    >
                      {sellerImages[index]?.url ? 'Change Image' : `Upload Image ${index + 1}`}
                    </div>
                  </label>
                  {sellerImages[index]?.url && (
                    <div className="flex justify-center mt-3">
                      <img 
                        src={sellerImages[index].url} 
                        alt={`Seller ${index + 1}`} 
                        className="w-32 h-32 object-cover rounded-lg shadow-md border-2 border-slate-200 cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={() => speakText(`Seller Image ${index + 1}`)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buyer Section */}
          <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200 hover:border-indigo-500 transition-all duration-300 shadow-lg border-l-4 border-l-amber-500">
            <h2 
              className="text-gray-800 mb-5 text-xl font-semibold text-center cursor-pointer hover:text-indigo-600 transition-colors"
              onClick={() => speakText("Buyer Side Upload")}
            >
              🔁 Buyer Side Upload
            </h2>
            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((_, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index, 'buyer')}
                      className="hidden"
                    />
                    <div 
                      className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 px-5 rounded-lg text-center font-medium cursor-pointer hover:shadow-lg transition-all duration-300"
                      onClick={() => speakText(buyerImages[index]?.url ? 'Change Image' : `Upload Image ${index + 1}`)}
                    >
                      {buyerImages[index]?.url ? 'Change Image' : `Upload Image ${index + 1}`}
                    </div>
                  </label>
                  {buyerImages[index]?.url && (
                    <div className="flex justify-center mt-3">
                      <img 
                        src={buyerImages[index].url} 
                        alt={`Buyer ${index + 1}`} 
                        className="w-32 h-32 object-cover rounded-lg shadow-md border-2 border-slate-200 cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={() => speakText(`Buyer Image ${index + 1}`)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Check Button */}
        <div className="text-center mb-8">
          <button 
            onClick={() => {
              speakText("Check for Fraud");
              checkFraud();
            }} 
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-8 text-lg font-semibold rounded-xl cursor-pointer hover:shadow-xl transition-all duration-300"
          >
            🔍 Check for Fraud
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-300">
            <h2 
              className="text-gray-800 mb-5 text-center cursor-pointer hover:text-indigo-600 transition-colors text-xl font-semibold"
              onClick={() => speakText("AI Result")}
            >
              🧠 AI Result
            </h2>
            <div className="flex flex-col gap-4">
              <p 
                className={`text-lg font-semibold py-3 px-4 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform duration-200 ${
                  result.match 
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500' 
                    : 'bg-red-100 text-red-800 border-2 border-red-500'
                }`}
                onClick={() => speakText(`Match Status: ${result.match ? 'Match, Genuine' : 'Mismatch, Possible Fraud'}`)}
              >
                Match Status: {result.match ? '✅ Match (Genuine)' : '❌ Mismatch (Possible Fraud)'}
              </p>
              <p 
                className="text-lg text-center text-gray-700 cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => speakText(`Fraud Score: ${result.score} percent`)}
              >
                Fraud Score: <span className="font-bold text-xl text-gray-900">{result.score}%</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}