import React, { useState } from 'react';
import { Volume2, VolumeX, Globe } from 'lucide-react';
import { initializeModel, compareImageSets } from './utils/imageComparisons.js';
import Chatbot from './components/Chatbot';
export default function ReturnShieldDemo() {
  const [sellerImages, setSellerImages] = useState([null, null, null]);
  const [buyerImages, setBuyerImages] = useState([null, null, null]);
  const [sellerOrderId, setSellerOrderId] = useState('');
  const [buyerOrderId, setBuyerOrderId] = useState('');
  const [result, setResult] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modelStatus, setModelStatus] = useState('loading');

  // Comprehensive translations for all languages
  const translations = {
    en: {
      title: "ReturnShield AI Demo",
      subtitle: "Fraud Detection using AI-based Image Matching",
      sellerUpload: "Seller Side Upload",
      buyerUpload: "Buyer Side Upload",
      orderId: "Order ID",
      enterOrderId: "Enter Order ID",
      uploadImage: "Upload Image",
      changeImage: "Change Image",
      frontSide: "Front Side",
      backSide: "Back Side",
      label: "Label",
      sellerImage: "Seller Image",
      buyerImage: "Buyer Image",
      checkFraud: "Check for Fraud",
      aiResult: "AI Result",
      matchGenuine: "Match, Genuine",
      mismatchFraud: "Mismatch, Possible Fraud",
      fraudScore: "Fraud Score",
      matchScore: "Match Score",
      percent: "percent",
      speakResultAgain: "Speak Result Again",
      matchFound: "Match found. Genuine return. Match score is",
      mismatchDetected: "Mismatch detected. Possible fraud. Match score is",
      languageName: "English",
      analyzing: "Analyzing...",
      modelLoading: "Loading AI Model...",
      modelReady: "AI Model Ready"
     
    },
    hi: {
      title: "रिटर्न शील्ड एआई डेमो",
      subtitle: "एआई आधारित इमेज मैचिंग का उपयोग करके धोखाधड़ी का पता लगाना",
      sellerUpload: "विक्रेता साइड अपलोड",
      buyerUpload: "खरीदार साइड अपलोड",
      orderId: "ऑर्डर आईडी",
      enterOrderId: "ऑर्डर आईडी दर्ज करें",
      uploadImage: "इमेज अपलोड करें",
      changeImage: "इमेज बदलें",
      frontSide: "सामने की तरफ",
      backSide: "पीछे की तरफ",
      label: "लेबल",
      sellerImage: "विक्रेता इमेज",
      buyerImage: "खरीदार इमेज",
      checkFraud: "धोखाधड़ी की जांच करें",
      aiResult: "एआई परिणाम",
      matchGenuine: "मैच, वास्तविक",
      mismatchFraud: "मिसमैच, संभावित धोखाधड़ी",
      fraudScore: "धोखाधड़ी स्कोर",
      matchScore: "मैच स्कोर",
      percent: "प्रतिशत",
      speakResultAgain: "परिणाम फिर से बोलें",
      matchFound: "मैच मिला। वास्तविक रिटर्न। धोखाधड़ी स्कोर है",
      mismatchDetected: "मिसमैच का पता चला। संभावित धोखाधड़ी। धोखाधड़ी स्कोर है",
      languageName: "हिंदी",
      analyzing: "विश्लेषण कर रहे हैं...",
      modelLoading: "एआई मॉडल लोड हो रहा है...",
      modelReady: "एआई मॉडल तैयार"
      
    },
    bn: {
      title: "রিটার্ন শিল্ড এআই ডেমো",
      subtitle: "এআই ভিত্তিক ইমেজ ম্যাচিং ব্যবহার করে জালিয়াতি সনাক্তকরণ",
      sellerUpload: "বিক্রেতা সাইড আপলোড",
      buyerUpload: "ক্রেতা সাইড আপলোড",
      orderId: "অর্ডার আইডি",
      enterOrderId: "অর্ডার আইডি প্রবেশ করান",
      uploadImage: "ইমেজ আপলোড করুন",
      changeImage: "ইমেজ পরিবর্তন করুন",
      frontSide: "সামনের দিক",
      backSide: "পিছনের দিক",
      label: "লেবেল",
      sellerImage: "বিক্রেতা ইমেজ",
      buyerImage: "ক্রেতা ইমেজ",
      checkFraud: "জালিয়াতি পরীক্ষা করুন",
      aiResult: "এআই ফলাফল",
      matchGenuine: "মিল, প্রকৃত",
      mismatchFraud: "অমিল, সম্ভাব্য জালিয়াতি",
      fraudScore: "জালিয়াতি স্কোর",
      matchScore: "ম্যাচ স্কোর",
      percent: "শতাংশ",
      speakResultAgain: "ফলাফল আবার বলুন",
      matchFound: "মিল পাওয়া গেছে। প্রকৃত রিটার্ন। জালিয়াতি স্কোর হল",
      mismatchDetected: "অমিল সনাক্ত করা হয়েছে। সম্ভাব্য জালিয়াতি। জালিয়াতি স্কোর হল",
      languageName: "বাংলা",
      analyzing: "বিশ্লেষণ করা হচ্ছে...",
      modelLoading: "এআই মডেল লোড হচ্ছে...",
      modelReady: "এআই মডেল প্রস্তুত"
      
    },
    mr: {
      title: "रिटर्न शील्ड एआय डेमो",
      subtitle: "एआय आधारित इमेज मॅचिंग वापरून फसवणूक शोध",
      sellerUpload: "विक्रेता साइड अपलोड",
      buyerUpload: "खरेदीदार साइड अपलोड",
      orderId: "ऑर्डर आयडी",
      enterOrderId: "ऑर्डर आयडी प्रविष्ट करा",
      uploadImage: "इमेज अपलोड करा",
      changeImage: "इमेज बदला",
      frontSide: "समोरची बाजू",
      backSide: "मागची बाजू",
      label: "लेबल",
      sellerImage: "विक्रेता इमेज",
      buyerImage: "खरेदीदार इमेज",
      checkFraud: "फसवणूक तपासा",
      aiResult: "एआय परिणाम",
      matchGenuine: "जुळणी, खरी",
      mismatchFraud: "अजुळणी, संभाव्य फसवणूक",
      fraudScore: "फसवणूक स्कोअर",
      matchScore: "जुळणी स्कोअर",
      percent: "टक्के",
      speakResultAgain: "परिणाम पुन्हा बोला",
      matchFound: "जुळणी सापडली. खरी रिटर्न. फसवणूक स्कोअर आहे",
      mismatchDetected: "अजुळणी आढळली. संभाव्य फसवणूक. फसवणूक स्कोअर आहे",
      languageName: "मराठी",
      analyzing: "विश्लेषण करत आहे...",
      modelLoading: "एआय मॉडेल लोड होत आहे...",
      modelReady: "एआय मॉडेल तयार"
  
    },
    te: {
      title: "రిటర్న్ షీల్డ్ AI డెమో",
      subtitle: "AI ఆధారిత చిత్రం సరిపోల్చడం ఉపయోగించి మోసం గుర్తింపు",
      sellerUpload: "అమ్మకందారు వైపు అప్‌లోడ్",
      buyerUpload: "కొనుగోలుదారు వైపు అప్‌లోడ్",
      orderId: "ఆర్డర్ ID",
      enterOrderId: "ఆర్డర్ ID నమోదు చేయండి",
      uploadImage: "చిత్రం అప్‌లోడ్ చేయండి",
      changeImage: "చిత్రం మార్చండి",
      frontSide: "ముందు వైపు",
      backSide: "వెనుక వైపు",
      label: "లేబుల్",
      sellerImage: "అమ్మకందారు చిత్రం",
      buyerImage: "కొనుగోలుదారు చిత్రం",
      checkFraud: "మోసం తనిఖీ చేయండి",
      aiResult: "AI ఫలితం",
      matchGenuine: "సరిపోలిక, నిజమైన",
      mismatchFraud: "సరిపోలిక లేకపోవడం, సంభావ్య మోసం",
      fraudScore: "మోసం స్కోర్",
      matchScore: "మ్యాచ్ స్కోర్",
      percent: "శాతం",
      speakResultAgain: "ఫలితం మళ్లీ చెప్పండి",
      matchFound: "సరిపోలిక కనుగొనబడింది. నిజమైన రిటర్న్. మోసం స్కోర్ ఉంది",
      mismatchDetected: "సరిపోలిక లేకపోవడం గుర్తించబడింది. సంభావ్య మోసం. మోసం స్కోర్ ఉంది",
      languageName: "తెలుగు",
      analyzing: "విశ్లేషిస్తోంది...",
      modelLoading: "AI మోడల్ లోడ్ అవుతోంది...",
      modelReady: "AI మోడల్ సిద్ధం"
      
    },
    ta: {
      title: "ரிட்டர்ன் ஷீல்ட் AI டெமோ",
      subtitle: "AI அடிப்படையிலான படம் பொருத்துதலைப் பயன்படுத்தி மோசடி கண்டறிதல்",
      sellerUpload: "விற்பனையாளர் பக்க பதிவேற்றம்",
      buyerUpload: "வாங்குபவர் பக்க பதிவேற்றம்",
      orderId: "ஆர்டர் ஐடி",
      enterOrderId: "ஆர்டர் ஐடியை உள்ளிடவும்",
      uploadImage: "படத்தை பதிவேற்றவும்",
      changeImage: "படத்தை மாற்றவும்",
      frontSide: "முன் பக்கம்",
      backSide: "பின் பக்கம்",
      label: "லேபல்",
      sellerImage: "விற்பனையாளர் படம்",
      buyerImage: "வாங்குபவர் படம்",
      checkFraud: "மோசடியை சரிபார்க்கவும்",
      aiResult: "AI முடிவு",
      matchGenuine: "பொருத்தம், உண்மையான",
      mismatchFraud: "பொருத்தமின்மை, சாத்தியமான மோசடி",
      fraudScore: "மோசடி மதிப்பெண்",
      matchScore: "பொருத்த மதிப்பெண்",
      percent: "சதவீதம்",
      speakResultAgain: "முடிவை மீண்டும் பேசவும்",
      matchFound: "பொருத்தம் கண்டறியப்பட்டது. உண்மையான திரும்பல். மோசடி மதிப்பெண்",
      mismatchDetected: "பொருத்தமின்மை கண்டறியப்பட்டது. சாத்தியமான மோசடி. மோசடி மதிப்பெண்",
      languageName: "தமிழ்",
      analyzing: "பகுப்பாய்வு செய்கிறது...",
      modelLoading: "AI மாதிரி ஏற்றப்படுகிறது...",
      modelReady: "AI மாதிரி தயார்"
     
    },
    gu: {
      title: "રિટર્ન શીલ્ડ AI ડેમો",
      subtitle: "AI આધારિત ઇમેજ મેચિંગનો ઉપયોગ કરીને છેતરપિંડીની શોધ",
      sellerUpload: "વેચનાર બાજુ અપલોડ",
      buyerUpload: "ખરીદનાર બાજુ અપલોડ",
      orderId: "ઓર્ડર ID",
      enterOrderId: "ઓર્ડર ID દાખલ કરો",
      uploadImage: "ઇમેજ અપલોડ કરો",
      changeImage: "ઇમેજ બદલો",
      frontSide: "આગળની બાજુ",
      backSide: "પાછળની બાજુ",
      label: "લેબલ",
      sellerImage: "વેચનાર ઇમેજ",
      buyerImage: "ખરીદનાર ઇમેજ",
      checkFraud: "છેતરપિંડી તપાસો",
      aiResult: "AI પરિણામ",
      matchGenuine: "મેચ, વાસ્તવિક",
      mismatchFraud: "મેચ નહીં, સંભવિત છેતરપિંડી",
      fraudScore: "છેતરપિંડી સ્કોર",
      matchScore: "મેચ સ્કોર",
      percent: "ટકા",
      speakResultAgain: "પરિણામ ફરીથી બોલો",
      matchFound: "મેચ મળ્યું. વાસ્તવિક રિટર્ન. છેતરપિંડી સ્કોર છે",
      mismatchDetected: "મેચ ન થવું મળ્યું. સંભવિત છેતરપિંડી. છેતરપિંડી સ્કોર છે",
      languageName: "ગુજરાતી",
      analyzing: "વિશ્લેષણ કરી રહ્યું છે...",
      modelLoading: "AI મોડેલ લોડ થઈ રહ્યું છે...",
      modelReady: "AI મોડેલ તૈયાર"
     
    },
    ur: {
      title: "ریٹرن شیلڈ AI ڈیمو",
      subtitle: "AI پر مبنی تصویری میچنگ کا استعمال کرتے ہوئے فراڈ کی تشخیص",
      sellerUpload: "بیچنے والے کی جانب اپ لوڈ",
      buyerUpload: "خریدنے والے کی جانب اپ لوڈ",
      orderId: "آرڈر ID",
      enterOrderId: "آرڈر ID داخل کریں",
      uploadImage: "تصویر اپ لوڈ کریں",
      changeImage: "تصویر تبدیل کریں",
      frontSide: "سامنے کی طرف",
      backSide: "پیچھے کی طرف",
      label: "لیبل",
      sellerImage: "بیچنے والے کی تصویر",
      buyerImage: "خریدنے والے کی تصویر",
      checkFraud: "فراڈ کی جانچ کریں",
      aiResult: "AI نتیجہ",
      matchGenuine: "میچ، اصل",
      mismatchFraud: "میچ نہیں، ممکنہ فراڈ",
      fraudScore: "فراڈ سکور",
      matchScore: "میچ سکور",
      percent: "فیصد",
      speakResultAgain: "نتیجہ دوبارہ بولیں",
      matchFound: "میچ ملا۔ اصل واپسی۔ فراڈ سکور ہے",
      mismatchDetected: "میچ نہیں ملا۔ ممکنہ فراڈ۔ فراڈ سکور ہے",
      languageName: "اردو",
      analyzing: "تجزیہ کر رہا ہے...",
      modelLoading: "AI ماڈل لوڈ ہو رہا ہے...",
      modelReady: "AI ماڈل تیار"
     
    },
    kn: {
      title: "ರಿಟರ್ನ್ ಶೀಲ್ಡ್ AI ಡೆಮೊ",
      subtitle: "AI ಆಧಾರಿತ ಚಿತ್ರ ಹೊಂದಾಣಿಕೆಯನ್ನು ಬಳಸಿಕೊಂಡು ವಂಚನೆ ಪತ್ತೆ",
      sellerUpload: "ಮಾರಾಟಗಾರ ಭಾಗ ಅಪ್‌ಲೋಡ್",
      buyerUpload: "ಖರೀದಿದಾರ ಭಾಗ ಅಪ್‌ಲೋಡ್",
      orderId: "ಆರ್ಡರ್ ಐಡಿ",
      enterOrderId: "ಆರ್ಡರ್ ಐಡಿ ನಮೂದಿಸಿ",
      uploadImage: "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      changeImage: "ಚಿತ್ರವನ್ನು ಬದಲಾಯಿಸಿ",
      frontSide: "ಮುಂಭಾಗ",
      backSide: "ಹಿಂಭಾಗ",
      label: "ಲೇಬಲ್",
      sellerImage: "ಮಾರಾಟಗಾರ ಚಿತ್ರ",
      buyerImage: "ಖರೀದಿದಾರ ಚಿತ್ರ",
      checkFraud: "ವಂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
      aiResult: "AI ಫಲಿತಾಂಶ",
      matchGenuine: "ಹೊಂದಾಣಿಕೆ, ನಿಜವಾದ",
      mismatchFraud: "ಹೊಂದಾಣಿಕೆಯಿಲ್ಲ, ಸಂಭವನೀಯ ವಂಚನೆ",
      fraudScore: "ವಂಚನೆ ಸ್ಕೋರ್",
      matchScore: "ಮ್ಯಾಚ್ ಸ್ಕೋರ್",
      percent: "ಶೇಕಡಾ",
      speakResultAgain: "ಫಲಿತಾಂಶವನ್ನು ಮತ್ತೆ ಹೇಳಿ",
      matchFound: "ಹೊಂದಾಣಿಕೆ ಕಂಡುಬಂದಿದೆ. ನಿಜವಾದ ರಿಟರ್ನ್. ವಂಚನೆ ಸ್ಕೋರ್",
      mismatchDetected: "ಹೊಂದಾಣಿಕೆಯಿಲ್ಲದಿರುವುದು ಪತ್ತೆಯಾಗಿದೆ. ಸಂಭವನೀಯ ವಂಚನೆ. ವಂಚನೆ ಸ್ಕೋರ್",
      languageName: "ಕನ್ನಡ",
      analyzing: "ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
      modelLoading: "AI ಮಾದರಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      modelReady: "AI ಮಾದರಿ ಸಿದ್ಧ"
     
    },
    or: {
      title: "ରିଟର୍ନ ଶିଲ୍ଡ AI ଡେମୋ",
      subtitle: "AI ଆଧାରିତ ଇମେଜ୍ ମେଚିଂ ବ୍ୟବହାର କରି ଠକେଇ ଚିହ୍ନଟ",
      sellerUpload: "ବିକ୍ରେତା ପାର୍ଶ୍ୱ ଅପଲୋଡ୍",
      buyerUpload: "କ୍ରେତା ପାର୍ଶ୍ୱ ଅପଲୋଡ୍",
      orderId: "ଅର୍ଡର ID",
      enterOrderId: "ଅର୍ଡର ID ପ୍ରବେଶ କରନ୍ତୁ",
      uploadImage: "ଇମେଜ୍ ଅପଲୋଡ୍ କରନ୍ତୁ",
      changeImage: "ଇମେଜ୍ ପରିବର୍ତ୍ତନ କରନ୍ତୁ",
      frontSide: "ଆଗ ପାର୍ଶ୍ୱ",
      backSide: "ପଛ ପାର୍ଶ୍ୱ",
      label: "ଲେବଲ୍",
      sellerImage: "ବିକ୍ରେତା ଇମେଜ୍",
      buyerImage: "କ୍ରେତା ଇମେଜ୍",
      checkFraud: "ଠକେଇ ଯାଞ୍ଚ କରନ୍ତୁ",
      aiResult: "AI ଫଳାଫଳ",
      matchGenuine: "ମେଚ୍, ସତ୍ୟ",
      mismatchFraud: "ମେଚ୍ ନାହିଁ, ସମ୍ଭାବ୍ୟ ଠକେଇ",
      fraudScore: "ଠକେଇ ସ୍କୋର",
      matchScore: "ମେଚ୍ ସ୍କୋର",
      percent: "ପ୍ରତିଶତ",
      speakResultAgain: "ଫଳାଫଳ ପୁନର୍ବାର କୁହନ୍ତୁ",
      matchFound: "ମେଚ୍ ମିଳିଛି। ସତ୍ୟ ରିଟର୍ନ। ଠକେଇ ସ୍କୋର ହେଉଛି",
      mismatchDetected: "ମେଚ୍ ନାହିଁ ବୋଲି ଚିହ୍ନଟ ହୋଇଛି। ସମ୍ଭାବ୍ୟ ଠକେଇ। ଠକେଇ ସ୍କୋର ହେଉଛି",
      languageName: "ଓଡ଼ିଆ",
      analyzing: "ବିଶ୍ଳେଷଣ କରୁଛି...",
      modelLoading: "AI ମଡେଲ ଲୋଡ ହେଉଛି...",
      modelReady: "AI ମଡେଲ ପ୍ରସ୍ତୁତ"
     
    },
    ml: {
      title: "റിട്ടേൺ ഷീൽഡ് AI ഡെമോ",
      subtitle: "AI അധിഷ്ഠിത ഇമേജ് മാച്ചിംഗ് ഉപയോഗിച്ച് തട്ടിപ്പ് കണ്ടെത്തൽ",
      sellerUpload: "വിൽപ്പനക്കാരന്റെ ഭാഗത്ത് അപ്‌ലോഡ്",
      buyerUpload: "വാങ്ങുന്നയാളുടെ ഭാഗത്ത് അപ്‌ലോഡ്",
      orderId: "ഓർഡർ ID",
      enterOrderId: "ഓർഡർ ID നൽകുക",
      uploadImage: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
      changeImage: "ചിത്രം മാറ്റുക",
      frontSide: "മുൻവശം",
      backSide: "പിൻവശം",
      label: "ലേബൽ",
      sellerImage: "വിൽപ്പനക്കാരന്റെ ചിത്രം",
      buyerImage: "വാങ്ങുന്നയാളുടെ ചിത്രം",
      checkFraud: "തട്ടിപ്പ് പരിശോധിക്കുക",
      aiResult: "AI ഫലം",
      matchGenuine: "പൊരുത്തം, യഥാർത്ഥ",
      mismatchFraud: "പൊരുത്തമില്ല, സാധ്യമായ തട്ടിപ്പ്",
      fraudScore: "തട്ടിപ്പ് സ്കോർ",
      matchScore: "മാച്ച് സ്കോർ",
      percent: "ശതമാനം",
      speakResultAgain: "ഫലം വീണ്ടും സംസാരിക്കുക",
      matchFound: "പൊരുത്തം കണ്ടെത്തി. യഥാർത്ഥ റിട്ടേൺ. തട്ടിപ്പ് സ്കോർ ആണ്",
      mismatchDetected: "പൊരുത്തമില്ല എന്ന് കണ്ടെത്തി. സാധ്യമായ തട്ടിപ്പ്. തട്ടിപ്പ് സ്കോർ ആണ്",
      languageName: "മലയാളം",
      analyzing: "വിശകലനം ചെയ്യുന്നു...",
      modelLoading: "AI മോഡൽ ലോഡ് ചെയ്യുന്നു...",
      modelReady: "AI മോഡൽ തയ്യാർ"
      
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mr', name: 'मराठी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ta', name: 'தமிழ்'},
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ur', name: 'اردو' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'or', name: 'ଓଡ଼ିଆ'},
    { code: 'ml', name: 'മലയാളം' }
  ];

  const t = translations[language];

  // Initialize TensorFlow.js model on component mount
  React.useEffect(() => {
    const loadModel = async () => {
      setModelStatus('loading');
      try {
        await initializeModel();
        setModelStatus('ready');
      } catch (error) {
        console.error('Failed to load AI model:', error);
        setModelStatus('error');
      }
    };
    
    loadModel();
  }, []);

  // Image labels array for easy reference
  const imageLabels = [t.frontSide, t.backSide, t.label];
  
  // Text-to-speech function
  const speakText = (text) => {
    if (isMuted) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(text);
    
    // Language codes
    const langCodes = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'bn': 'bn-IN'
    };
    
    speech.lang = langCodes[language] || 'en-US';
    speech.rate = 0.9;
    speech.pitch = 1.0;
    speech.volume = 1.0;
    
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

  const speakResult = (match, score) => {
    if (isMuted) return;
    let message = match
      ? `${t.matchFound} ${score} ${t.percent}.`
      : `${t.mismatchDetected} ${score} ${t.percent}.`;

    speakText(message);
  };

  const checkFraud = async () => {
    if (result) return;

    setIsAnalyzing(true);

    const allSeller = sellerImages.every(img => img && img.file);
    const allBuyer = buyerImages.every(img => img && img.file);

    if (!allSeller || !allBuyer) {
      alert("Please upload all 3 images for both seller and buyer.");
      setIsAnalyzing(false);
      return;
    }

    if (!sellerOrderId.trim() || !buyerOrderId.trim()) {
      alert("Please enter Order ID for both seller and buyer.");
      setIsAnalyzing(false);
      return;
    }

    try {
      // Check Order ID match
      const orderIdMatch = sellerOrderId.trim() === buyerOrderId.trim();
      
      // Use CNN-based image comparison
      const imageComparisons = await compareImageSets(sellerImages, buyerImages);
      
      // Calculate average similarity
      const avgSimilarity = imageComparisons.reduce((sum, comp) => sum + comp.similarity, 0) / imageComparisons.length;
      
      // Determine if genuine (both order IDs match AND high image similarity)
      const similarityThreshold = 0.85; // 85% similarity threshold
      const isGenuine = orderIdMatch && avgSimilarity >= similarityThreshold;
      
      // Calculate final score
      let finalScore;
      if (isGenuine) {
        // Genuine: 90-99% based on similarity
        finalScore = Math.floor(90 + (avgSimilarity * 9));
      } else {
        // Fraud: 10-50% based on how different they are
        finalScore = Math.floor(10 + ((1 - avgSimilarity) * 40));
      }
      
      const resultData = {
        match: isGenuine,
        score: finalScore,
        avgSimilarity: Math.round(avgSimilarity * 100),
        orderIdMatch: orderIdMatch,
        imageComparisons: imageComparisons
      };

      setResult(resultData);
      speakResult(resultData.match, resultData.score);
    } catch (error) {
      console.error('Error during fraud analysis:', error);
      alert('Error analyzing images. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 
                  className="text-4xl font-bold mb-2 cursor-pointer hover:text-blue-200 transition-colors"
                  onClick={() => speakText(t.title)}
                >
                  {t.title}
                </h1>
                <p 
                  className="text-xl opacity-90 cursor-pointer hover:opacity-100 transition-opacity"
                  onClick={() => speakText(t.subtitle)}
                >
                  {t.subtitle}
                </p>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Voice Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-300"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  <span className="text-sm font-medium">
                    {isMuted ? 'Unmute' : 'Mute'}
                  </span>
                </button>

                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-300"
                  >
                    <Globe size={20} />
                    <span className="text-sm font-medium">
                      {currentLanguage?.name}
                    </span>
                  </button>
                  
                  {isLanguageMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLanguageMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                            language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Upload Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Seller Side */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h2 
                  className="text-2xl font-bold text-green-800 mb-4 cursor-pointer hover:text-green-600 transition-colors flex items-center"
                  onClick={() => speakText(t.sellerUpload)}
                >
                  📦 {t.sellerUpload}
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.orderId}
                  </label>
                  <input
                    type="text"
                    value={sellerOrderId}
                    onChange={(e) => setSellerOrderId(e.target.value)}
                    placeholder={t.enterOrderId}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    onClick={() => speakText(t.orderId)}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="upload-item">
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, index, 'seller')}
                          className="hidden"
                        />
                        <div 
                          className="w-full h-32 border-2 border-dashed border-green-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300"
                          onClick={() => speakText(sellerImages[index]?.url ? t.changeImage : imageLabels[index])}
                        >
                          {sellerImages[index]?.url ? (
                            <img 
                              src={sellerImages[index].url} 
                              alt={`Seller ${imageLabels[index]}`} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center">
                              <div className="text-2xl mb-2">📸</div>
                              <div className="text-sm text-gray-600">
                                {imageLabels[index]}
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buyer Side */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h2 
                  className="text-2xl font-bold text-blue-800 mb-4 cursor-pointer hover:text-blue-600 transition-colors flex items-center"
                  onClick={() => speakText(t.buyerUpload)}
                >
                  🔁 {t.buyerUpload}
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.orderId}
                  </label>
                  <input
                    type="text"
                    value={buyerOrderId}
                    onChange={(e) => setBuyerOrderId(e.target.value)}
                    placeholder={t.enterOrderId}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    onClick={() => speakText(t.orderId)}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="upload-item">
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, index, 'buyer')}
                          className="hidden"
                        />
                        <div 
                          className="w-full h-32 border-2 border-dashed border-blue-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                          onClick={() => speakText(buyerImages[index]?.url ? t.changeImage : imageLabels[index])}
                        >
                          {buyerImages[index]?.url ? (
                            <img 
                              src={buyerImages[index].url} 
                              alt={`Buyer ${imageLabels[index]}`} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center">
                              <div className="text-2xl mb-2">📸</div>
                              <div className="text-sm text-gray-600">
                                {imageLabels[index]}
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Check Button */}
            <div className="text-center mb-8">
              <button 
                onClick={() => {
                  speakText(t.checkFraud);
                  checkFraud();
                }} 
                disabled={isAnalyzing || modelStatus !== 'ready'}
                className={`font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-300 flex items-center space-x-3 mx-auto ${
                  isAnalyzing || modelStatus !== 'ready'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                } text-white`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span className="text-xl">{t.analyzing}</span>
                  </>
                ) : modelStatus === 'loading' ? (
                  <>
                    <div className="animate-pulse text-2xl">🧠</div>
                    <span className="text-xl">{t.modelLoading}</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🔍</span>
                    <span className="text-xl">{t.checkFraud}</span>
                  </>
                )}
              </button>
              
              {/* Model Status Indicator */}
              <div className="mt-4 text-center">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  modelStatus === 'ready' ? 'bg-green-100 text-green-800' :
                  modelStatus === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {modelStatus === 'ready' ? `🤖 ${t.modelReady}` :
                   modelStatus === 'loading' ? `⏳ ${t.modelLoading}` :
                   '❌ AI Model Error'}
                </span>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 space-y-6">
                <h2 
                  className="text-3xl font-bold text-gray-800 mb-6 cursor-pointer hover:text-gray-600 transition-colors flex items-center"
                  onClick={() => speakText(t.aiResult)}
                >
                  🧠 {t.aiResult}
                </h2>
                
                {/* Main Result */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div 
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      result.match 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                    onClick={() => speakText(`Match Status: ${result.match ? t.matchGenuine : t.mismatchFraud}`)}
                  >
                    <p className="text-xl font-semibold mb-2">
                      Match Status: {result.match ? `✅ ${t.matchGenuine}` : `❌ ${t.mismatchFraud}`}
                    </p>
                    <p className="text-sm opacity-75">
                      Order ID Match: {result.orderIdMatch ? '✅' : '❌'} | 
                      Image Similarity: {result.avgSimilarity}%
                    </p>
                  </div>
                  
                  <div 
                    className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200 cursor-pointer hover:bg-blue-100 transition-all duration-300"
                    onClick={() => speakText(`${t.matchScore}: ${result.score} ${t.percent}`)}
                  >
                    <p className="text-xl font-semibold text-blue-800 mb-2">
                      {t.matchScore}: <span className="text-2xl font-bold">{result.score}%</span>
                    </p>
                    <div className="w-full bg-blue-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${result.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                {result.imageComparisons && (
                  <div className="mt-6 bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 Detailed Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {result.imageComparisons.map((comp, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border">
                          <p className="font-medium text-gray-700">Image {index + 1}</p>
                          <p className="text-sm text-gray-600">
                            Similarity: <span className="font-bold">{Math.round(comp.similarity * 100)}%</span>
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                comp.similarity > 0.8 ? 'bg-green-500' :
                                comp.similarity > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${comp.similarity * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => speakResult(result.match, result.score)} 
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Volume2 size={20} />
                    <span>{t.speakResultAgain}</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setResult(null);
                      setSellerImages([null, null, null]);
                      setBuyerImages([null, null, null]);
                      setSellerOrderId('');
                      setBuyerOrderId('');
                    }} 
                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>🔄</span>
                    <span>Reset Analysis</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
     {/* Chatbot */}
        {typeof Chatbot !== 'undefined' && <Chatbot language={language} />}
      </div>
    </div>
  );
}