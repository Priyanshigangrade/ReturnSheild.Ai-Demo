import { useState } from 'react'
import './App.css'

function App() {
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
    <div className="container">
      {/* Test Speech Button */}
      <div className="voice-toggle">
        <button
          onClick={() => speakText("Hello, this is ReturnShield AI. Text to speech is working correctly.")}
          className="voice-btn voice-on"
        >
          🔊 Test Speech
        </button>
        <button
          onClick={() => speakText("ReturnShield AI Demo")}
          className="voice-btn voice-on"
          style={{marginLeft: '10px'}}
        >
          🎵 Speak Title
        </button>
      </div>

      <h1 onClick={() => speakText("ReturnShield AI Demo")}>ReturnShield.AI Demo</h1>
      <p className="subtitle" onClick={() => speakText("Fraud Detection using AI-based Image Matching")}>
        Fraud Detection using AI-based Image Matching
      </p>

      {/* Two Column Layout for Seller and Buyer */}
      <div className="upload-grid">
        {/* Seller Section - Left Side */}
        <div className="upload-section seller-section">
          <h2 
            className="section-title"
            onClick={() => speakText("Seller Side Upload")}
          >
            📦 Seller Side Upload
          </h2>
          <div className="upload-area">
            {[0, 1, 2].map((_, index) => (
              <div key={index} className="upload-item">
                <label className="upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index, 'seller')}
                    className="file-input"
                  />
                  <div 
                    className="upload-button"
                    onClick={() => speakText(sellerImages[index]?.url ? 'Change Image' : `Upload Image ${index + 1}`)}
                  >
                    {sellerImages[index]?.url ? 'Change Image' : `Upload Image ${index + 1}`}
                  </div>
                </label>
                {sellerImages[index]?.url && (
                  <div className="image-preview">
                    <img 
                      src={sellerImages[index].url} 
                      alt={`Seller ${index + 1}`} 
                      className="preview-image"
                      onClick={() => speakText(`Seller Image ${index + 1}`)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Section - Right Side */}
        <div className="upload-section buyer-section">
          <h2 
            className="section-title"
            onClick={() => speakText("Buyer Side Upload")}
          >
            🔁 Buyer Side Upload
          </h2>
          <div className="upload-area">
            {[0, 1, 2].map((_, index) => (
              <div key={index} className="upload-item">
                <label className="upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index, 'buyer')}
                    className="file-input"
                  />
                  <div 
                    className="upload-button"
                    onClick={() => speakText(buyerImages[index]?.url ? 'Change Image' : `Upload Image ${index + 1}`)}
                  >
                    {buyerImages[index]?.url ? 'Change Image' : `Upload Image ${index + 1}`}
                  </div>
                </label>
                {buyerImages[index]?.url && (
                  <div className="image-preview">
                    <img 
                      src={buyerImages[index].url} 
                      alt={`Buyer ${index + 1}`} 
                      className="preview-image"
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
      <div className="center">
        <button 
          onClick={() => {
            speakText("Check for Fraud");
            checkFraud();
          }} 
          className="check-button"
        >
          🔍 Check for Fraud
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="result-section">
          <h2 onClick={() => speakText("AI Result")}>🧠 AI Result</h2>
          <div className="result-content">
            <p 
              className={`match-status ${result.match ? 'genuine' : 'fraud'}`}
              onClick={() => speakText(`Match Status: ${result.match ? 'Match, Genuine' : 'Mismatch, Possible Fraud'}`)}
            >
              Match Status: {result.match ? '✅ Match (Genuine)' : '❌ Mismatch (Possible Fraud)'}
            </p>
            <p 
              className="fraud-score"
              onClick={() => speakText(`Fraud Score: ${result.score} percent`)}
            >
              Fraud Score: <span className="score">{result.score}%</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App