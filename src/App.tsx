import React, { useState } from 'react';

export default function App() {
  const [sellerImages, setSellerImages] = useState([null, null, null]);
  const [buyerImages, setBuyerImages] = useState([null, null, null]);
  const [result, setResult] = useState(null);

  // Text-to-speech with feature detection
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      window.speechSynthesis.speak(speech);
    } else {
      console.warn('Text-to-speech not supported in this browser');
    }
  };

  const handleImageChange = (e, index, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const updatedImages = type === 'seller' ? [...sellerImages] : [...buyerImages];
    updatedImages[index] = { file, url: imageUrl };

    type === 'seller' 
      ? setSellerImages(updatedImages) 
      : setBuyerImages(updatedImages);

    setResult(null);
  };

  const checkFraud = () => {
    // Check if all images are uploaded
    const sellerComplete = sellerImages.every(img => img !== null);
    const buyerComplete = buyerImages.every(img => img !== null);

    if (!sellerComplete || !buyerComplete) {
      alert("Please upload all 3 images for both seller and buyer.");
      return;
    }

    // Simple comparison logic
    const allMatch = sellerImages.every((sellerImg, i) => 
      sellerImg.file.name === buyerImages[i].file.name
    );

    setResult({
      match: allMatch,
      score: allMatch ? 97 : 49
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-center mb-3 text-gray-800 text-4xl font-bold">
          ReturnShield.AI Demo
        </h1>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Seller Column (Left) */}
          <div className="p-6 rounded-xl border-2 border-slate-200">
            <h2 className="text-gray-800 mb-5 text-xl font-semibold text-center">
              Seller Side Upload
            </h2>
            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index, 'seller')}
                      className="hidden"
                    />
                    <div className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center cursor-pointer">
                      {sellerImages[index] ? 'Change Image' : `Upload Image ${index + 1}`}
                    </div>
                  </label>
                  {sellerImages[index]?.url && (
                    <img 
                      src={sellerImages[index].url}
                      alt={`Seller ${index + 1}`}
                      className="mt-2 w-full h-32 object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buyer Column (Right) */}
          <div className="p-6 rounded-xl border-2 border-slate-200">
            <h2 className="text-gray-800 mb-5 text-xl font-semibold text-center">
              Buyer Side Upload
            </h2>
            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index, 'buyer')}
                      className="hidden"
                    />
                    <div className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center cursor-pointer">
                      {buyerImages[index] ? 'Change Image' : `Upload Image ${index + 1}`}
                    </div>
                  </label>
                  {buyerImages[index]?.url && (
                    <img 
                      src={buyerImages[index].url}
                      alt={`Buyer ${index + 1}`}
                      className="mt-2 w-full h-32 object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Check Button */}
        <div className="text-center">
          <button 
            onClick={checkFraud}
            className="bg-green-500 text-white py-3 px-6 rounded-lg"
          >
            Check for Fraud
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className={result.match ? 'text-green-600' : 'text-red-600'}>
              {result.match ? '✅ Match Found' : '❌ No Match'}
            </p>
            <p>Score: {result.score}%</p>
          </div>
        )}
      </div>
    </div>
  );
}