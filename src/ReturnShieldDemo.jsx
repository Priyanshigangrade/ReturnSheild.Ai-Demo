import React, { useState } from 'react';

export default function ReturnShieldDemo() {
  const [sellerImages, setSellerImages] = useState([null, null, null]);
  const [buyerImages, setBuyerImages] = useState([null, null, null]);
  const [result, setResult] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'hi' for Hindi

  // Translation object
  const translations = {
    en: {
      title: "ReturnShield AI Demo",
      subtitle: "Fraud Detection using AI-based Image Matching",
      sellerUpload: "Seller Side Upload",
      buyerUpload: "Buyer Side Upload",
      uploadImage: "Upload Image",
      changeImage: "Change Image",
      sellerImage: "Seller Image",
      buyerImage: "Buyer Image",
      checkFraud: "Check for Fraud",
      aiResult: "AI Result",
      matchGenuine: "Match, Genuine",
      mismatchFraud: "Mismatch, Possible Fraud",
      fraudScore: "Fraud Score",
      percent: "percent",
      speakResultAgain: "Speak Result Again",
      matchFound: "Match found. Genuine return. Fraud score is",
      mismatchDetected: "Mismatch detected. Possible fraud. Fraud score is"
    },
    hi: {
      title: "रिटर्न शील्ड एआई डेमो",
      subtitle: "एआई आधारित इमेज मैचिंग का उपयोग करके धोखाधड़ी का पता लगाना",
      sellerUpload: "विक्रेता साइड अपलोड",
      buyerUpload: "खरीदार साइड अपलोड",
      uploadImage: "इमेज अपलोड करें",
      changeImage: "इमेज बदलें",
      sellerImage: "विक्रेता इमेज",
      buyerImage: "खरीदार इमेज",
      checkFraud: "धोखाधड़ी की जांच करें",
      aiResult: "एआई परिणाम",
      matchGenuine: "मैच, वास्तविक",
      mismatchFraud: "मिसमैच, संभावित धोखाधड़ी",
      fraudScore: "धोखाधड़ी स्कोर",
      percent: "प्रतिशत",
      speakResultAgain: "परिणाम फिर से बोलें",
      matchFound: "मैच मिला। वास्तविक रिटर्न। धोखाधड़ी स्कोर है",
      mismatchDetected: "मिसमैच का पता चला। संभावित धोखाधड़ी। धोखाधड़ी स्कोर है"
    }
  };

  const t = translations[language]; // Current language translations

  // Simple text-to-speech function - exactly like your VisionSpeak project
  const speakText = (text) => {
    if (isMuted) return; // Don't speak if muted
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = language === 'hi' ? 'hi-IN' : 'en-US'; // Set language
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

    setResult(null); // Reset result on any change
  };

  const speakResult = (match, score) => {
    if (isMuted) return; // Don't speak if muted
    // 🔊 Speak result aloud
    let message = match
      ? `${t.matchFound} ${score} ${t.percent}.`
      : `${t.mismatchDetected} ${score} ${t.percent}.`;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const checkFraud = () => {
    if (result) return; // prevent rechecking

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
    const resultData = { match: matched, score };

    setResult(resultData);

    // 🔊 Speak result after setting
    speakResult(matched, score);
  };

  return (
    <div className="container">
      {/* Mute/Unmute Toggle */}
      <div className="voice-toggle">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`voice-btn ${isMuted ? 'voice-off' : 'voice-on'}`}
        >
          {isMuted ? '🔇 Voice Muted' : '🔊 Voice On'}
        </button>
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="voice-btn voice-on"
          style={{marginLeft: '10px'}}
        >
          {language === 'en' ? '🇮🇳 हिंदी' : '🇺🇸 English'}
        </button>
      </div>

      <h1 
        onClick={() => speakText(t.title)}
        style={{cursor: 'pointer'}}
      >
        {t.title}
      </h1>
      <p 
        className="subtitle"
        onClick={() => speakText(t.subtitle)}
        style={{cursor: 'pointer'}}
      >
        {t.subtitle}
      </p>

      {/* Upload Grid */}
      <div className="upload-grid">
        {/* Seller Side */}
        <div className="upload-section seller-section">
          <h2 
            className="section-title"
            onClick={() => speakText(t.sellerUpload)}
            style={{cursor: 'pointer'}}
          >
            📦 {t.sellerUpload}
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
                    onClick={() => speakText(sellerImages[index]?.url ? t.changeImage : `${t.uploadImage} ${index + 1}`)}
                  >
                    {sellerImages[index]?.url ? t.changeImage : `${t.uploadImage} ${index + 1}`}
                  </div>
                </label>
                {sellerImages[index]?.url && (
                  <div className="image-preview">
                    <img 
                      src={sellerImages[index].url} 
                      alt={`Seller ${index + 1}`} 
                      className="preview-image"
                      onClick={() => speakText(`${t.sellerImage} ${index + 1}`)}
                      style={{cursor: 'pointer'}}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Side */}
        <div className="upload-section buyer-section">
          <h2 
            className="section-title"
            onClick={() => speakText(t.buyerUpload)}
            style={{cursor: 'pointer'}}
          >
            🔁 {t.buyerUpload}
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
                    onClick={() => speakText(buyerImages[index]?.url ? t.changeImage : `${t.uploadImage} ${index + 1}`)}
                  >
                    {buyerImages[index]?.url ? t.changeImage : `${t.uploadImage} ${index + 1}`}
                  </div>
                </label>
                {buyerImages[index]?.url && (
                  <div className="image-preview">
                    <img 
                      src={buyerImages[index].url} 
                      alt={`Buyer ${index + 1}`} 
                      className="preview-image"
                      onClick={() => speakText(`${t.buyerImage} ${index + 1}`)}
                      style={{cursor: 'pointer'}}
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
            speakText(t.checkFraud);
            checkFraud();
          }} 
          className="check-button"
        >
          🔍 {t.checkFraud}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="result-section">
          <h2 
            onClick={() => speakText(t.aiResult)}
            style={{cursor: 'pointer'}}
          >
            🧠 {t.aiResult}
          </h2>
          <div className="result-content">
            <p 
              className={`match-status ${result.match ? 'genuine' : 'fraud'}`}
              onClick={() => speakText(`Match Status: ${result.match ? t.matchGenuine : t.mismatchFraud}`)}
              style={{cursor: 'pointer'}}
            >
              Match Status: {result.match ? `✅ ${t.matchGenuine}` : `❌ ${t.mismatchFraud}`}
            </p>
            <p 
              className="fraud-score"
              onClick={() => speakText(`${t.fraudScore}: ${result.score} ${t.percent}`)}
              style={{cursor: 'pointer'}}
            >
              {t.fraudScore}: <span className="score">{result.score}%</span>
            </p>

            {/* 🔊 Optional Speak Again Button */}
            <button 
              onClick={() => speakResult(result.match, result.score)} 
              className="speak-button"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                marginTop: '10px'
              }}
            >
              🔊 {t.speakResultAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}