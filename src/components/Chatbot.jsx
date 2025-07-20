import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const translations = {
  en: {
    chatTitle: "Fraud Detection Assistant",
    placeholder: "Ask me about fraud detection...",
    send: "Send",
    typing: "Assistant is typing...",
    welcome: "Hello! I'm your fraud detection assistant. How can I help you today? " +
             "Ask me questions like: How does fraud detection work? " +
             "What is image matching? How accurate is the system? " +
             "What types of fraud can be detected? How to use the system?"
  },
  hi: {
    chatTitle: "धोखाधड़ी पहचान सहायक",
    placeholder: "धोखाधड़ी पहचान के बारे में पूछें...",
    send: "भेजें",
    typing: "सहायक टाइप कर रहा है...",
    welcome: "नमस्ते! मैं आपका धोखाधड़ी पहचान सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं? " +
             "पूछें: धोखाधड़ी की पहचान कैसे काम करती है? " +
             "इमेज मैचिंग क्या है? सिस्टम कितना सटीक है? " +
             "किस प्रकार की धोखाधड़ी का पता लगाया जा सकता है? सिस्टम का उपयोग कैसे करें?"
  },
    bn: {
      chatTitle: "জালিয়াতি সনাক্তকরণ সহায়ক",
      placeholder: "জালিয়াতি সনাক্তকরণ সম্পর্কে জিজ্ঞাসা করুন...",
      send: "পাঠান",
      typing: "সহায়ক টাইপ করছে...",
      welcome: "হ্যালো! আমি আপনার জালিয়াতি সনাক্তকরণ সহায়ক। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
    }
  };

  const t = translations[language] || translations.en;

  // Fraud detection knowledge base
  const knowledgeBase = {
    en: {
      "how does fraud detection work": "Our AI fraud detection system uses advanced computer vision and machine learning to compare images from sellers and buyers. It analyzes visual features, structural similarities, and pixel-level differences to determine if returned items match the original products.",
      "what is image matching": "Image matching is a computer vision technique that compares two or more images to find similarities or differences. Our system uses CNN (Convolutional Neural Networks) to extract features from images and calculate similarity scores.",
      "how accurate is the system": "Our system achieves high accuracy by combining multiple analysis methods: feature similarity (50%), structural similarity (30%), and pixel similarity (20%). The confidence score indicates the reliability of each detection.",
      "what types of fraud can be detected": "The system can detect various types of return fraud including: item substitution, damaged item returns, counterfeit returns, and empty box returns by comparing seller and buyer images.",
      "how to use the system": "Simply upload 3 images each from seller and buyer sides (front, back, and label), enter the order IDs, and click 'Check for Fraud'. The AI will analyze and provide a detailed fraud assessment.",
      "what languages are supported": "The system supports 11 languages: English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia, and Malayalam with full voice support.",
      "is my data secure": "Yes, all image processing happens locally in your browser. No images are sent to external servers, ensuring complete privacy and security of your data.",
      "what is cnn": "CNN (Convolutional Neural Network) is a deep learning algorithm particularly effective for image analysis. It can automatically detect features like edges, textures, and patterns in images.",
      "how to improve accuracy": "For best results: ensure good lighting, clear images, similar angles for comparison photos, and make sure all required images are uploaded before analysis."
    },
    hi: {
      "धोखाधड़ी की पहचान कैसे काम करती है": "हमारा AI धोखाधड़ी पहचान सिस्टम विक्रेताओं और खरीदारों की छवियों की तुलना करने के लिए उन्नत कंप्यूटर विज़न और मशीन लर्निंग का उपयोग करता है।",
      "इमेज मैचिंग क्या है": "इमेज मैचिंग एक कंप्यूटर विज़न तकनीक है जो समानताएं या अंतर खोजने के लिए दो या अधिक छवियों की तुलना करती है।",
      "सिस्टम कितना सटीक है": "हमारा सिस्टम कई विश्लेषण विधियों को मिलाकर उच्च सटीकता प्राप्त करता है।",
      "कौन से प्रकार की धोखाधड़ी का पता लगाया जा सकता है": "सिस्टम विभिन्न प्रकार की रिटर्न धोखाधड़ी का पता लगा सकता है।",
      "सिस्टम का उपयोग कैसे करें": "बस विक्रेता और खरीदार की तरफ से 3-3 छवियां अपलोड करें और धोखाधड़ी की जांच करें।"
    },
   
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    const kb = knowledgeBase[language] || knowledgeBase.en;
    
    // Find the best matching response
    for (const [key, value] of Object.entries(kb)) {
      if (lowerMessage.includes(key.toLowerCase()) || 
          key.toLowerCase().includes(lowerMessage)) {
        return value;
      }
    }
    
    // Default responses
    const defaultResponses = {
      en: "I'm here to help with fraud detection questions. You can ask me about how the system works, accuracy, supported features, or how to use it effectively.",
      hi: "मैं धोखाधड़ी पहचान के सवालों में मदद के लिए यहां हूं। आप मुझसे सिस्टम के काम, सटीकता, या इसका प्रभावी उपयोग के बारे में पूछ सकते हैं।",
      bn: "আমি জালিয়াতি সনাক্তকরণের প্রশ্নে সাহায্যের জন্য এখানে আছি। আপনি আমাকে সিস্টেমের কাজ, নির্ভুলতা, বা এর কার্যকর ব্যবহার সম্পর্কে জিজ্ঞাসা করতে পারেন।"
    };
    
    return defaultResponses[language] || defaultResponses.en;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        type: 'bot',
        content: t.welcome,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, t.welcome]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: getResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <h3 className="font-semibold">{t.chatTitle}</h3>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                    {message.type === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot size={16} />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.placeholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;