import React from 'react';
import { ArrowRight, Shield, Zap, Eye, Brain, CheckCircle, AlertTriangle } from 'lucide-react';

export default function DemoPage({ onStartDemo }) {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze product images with 99% accuracy"
    },
    {
      icon: <Eye className="w-8 h-8 text-green-600" />,
      title: "Visual Comparison",
      description: "Compare seller and buyer images side-by-side for instant fraud detection"
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Real-time Processing",
      description: "Get instant results within seconds of uploading images"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Fraud Prevention",
      description: "Protect your business from return fraud with advanced detection algorithms"
    }
  ];

  const demoSteps = [
    {
      step: "1",
      title: "Upload Seller Images",
      description: "Upload 3 images: front side, back side, and product label from the original seller listing"
    },
    {
      step: "2", 
      title: "Upload Buyer Images",
      description: "Upload corresponding images from the buyer's return request"
    },
    {
      step: "3",
      title: "Enter Order IDs",
      description: "Input the order IDs from both seller and buyer sides for verification"
    },
    {
      step: "4",
      title: "AI Analysis",
      description: "Our AI system analyzes the images and provides a fraud detection score"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Reduce return fraud by up to 85%"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Save thousands in fraudulent returns"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Instant automated decision making"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Multi-language support (11 languages)"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Voice-enabled accessibility features"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: "Fraud Detection Assistant ChatBot"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            ReturnShield AI Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the power of AI-driven fraud detection for e-commerce returns. 
            Our advanced system analyzes product images to identify fraudulent return attempts with unprecedented accuracy.
          </p>
          <button
            onClick={onStartDemo}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
          >
            <span className="text-xl">Start Live Demo</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Why Choose ReturnShield AI?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                {benefit.icon}
                <span className="text-lg text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
        

        {/* Warning Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border-l-4 border-amber-500">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">
                Demo Environment Notice
              </h3>
              <p className="text-amber-700 mb-4">
                This is a demonstration environment. The fraud detection algorithm in this demo uses simplified logic for educational purposes:
              </p>
              <ul className="list-disc list-inside text-amber-700 space-y-2">
        
                 <li>Order IDs must match exactly</li>
                <li>All 3 images must be identical for approval</li>
                <li>Production systems use advanced computer vision and machine learning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Try It?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience ReturnShield AI in action with our interactive demo
          </p>
          <button
            onClick={onStartDemo}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
          >
            <span className="text-xl">Launch Demo Now</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}