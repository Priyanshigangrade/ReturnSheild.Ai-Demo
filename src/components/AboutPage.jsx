import React from 'react';
import { Shield, Users, Target, Award, Globe, Zap, Brain, Eye, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Priyanshi Gangrade",
      role: "Founder",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      description: "Computer Science Engineer specializing in Cloud Computing & Automation from Vellore Institute of Technology, Bhopal. Passionate about leveraging AI to solve real-world problems for small businesses in Bharat."
    },
  
  ];

  const stats = [
    { number: "", label: "Fraud Detection Assistant ChatBot" },
    { number: "", label: "Secure Login & Authentication " },
    { number: "", label: "Text-to-Speech (TTS) with Mute Toggle " },
    { number: "", label: "11 Languages Supported" }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Security First",
      description: "We prioritize the security and privacy of your data with enterprise-grade protection"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "Innovation",
      description: "Continuously advancing AI technology to stay ahead of evolving fraud patterns"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Customer Success",
      description: "Your success is our mission. We provide 24/7 support and dedicated account management"
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "Global Impact",
      description: "Making e-commerce safer worldwide with multilingual support and global deployment"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "ReturnShield AI was founded by a team of fraud prevention experts and AI researchers"
    },
    {
      year: "2021",
      title: "First AI Model",
      description: "Launched our first computer vision model achieving 95% accuracy in fraud detection"
    },
    {
      year: "2022",
      title: "Enterprise Launch",
      description: "Deployed to first 50 enterprise clients, preventing over $10M in fraudulent returns"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to 11 languages and deployed across 25 countries"
    },
    {
      year: "2024",
      title: "AI Breakthrough",
      description: "Achieved 99.2% accuracy with our latest deep learning models"
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
            About ReturnShield AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            We're on a mission to make e-commerce safer by preventing return fraud through 
            cutting-edge artificial intelligence and computer vision technology.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At ReturnShield.AI, our mission is to empower small and medium-sized e-commerce sellers in Bharat by 
                leveraging cutting-edge GenAI and computer vision technologies to combat return fraud. We are committed to creating a fair, transparent,
                 and efficient ecosystem where sellers can protect their hard-earned revenue, reduce losses, and build trust in online platforms.
              </p>
              <p className="text-lg text-gray-600 mb-6">
               By providing AI-driven image fingerprinting, multilingual support, 
               and instant fraud detection, we aim to revolutionize return dispute resolution—making it faster,
                more accurate, and accessible to all. Together, we’re not just preventing fraud; we’re fostering growth, sustainability, and confidence for India’s underserved sellers.
              </p>
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-800">
                  From Fabric to Fingerprint — AI That Remembers What You Shipped.
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Eye className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-800">Computer Vision</h3>
                  <p className="text-sm text-gray-600">Advanced image analysis</p>
                </div>
                <div className="text-center">
                  <Brain className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-800">Machine Learning</h3>
                  <p className="text-sm text-gray-600">Intelligent pattern recognition</p>
                </div>
                <div className="text-center">
                  <Zap className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-800">Real-time Processing</h3>
                  <p className="text-sm text-gray-600">Instant fraud detection</p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-red-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-800">Fraud Prevention</h3>
                  <p className="text-sm text-gray-600">99.2% accuracy rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        

        {/* Team Section
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Technology Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Deep Learning</h3>
              <p className="text-gray-600">Convolutional Neural Networks (CNNs) for image analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Computer Vision</h3>
              <p className="text-gray-600">Advanced image processing and feature extraction</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Cloud Infrastructure</h3>
              <p className="text-gray-600">Scalable, secure, and globally distributed</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600">priyanshigangrade2022@vitbhopal.ac.in</p>
              <p className="text-gray-600">priyanshigangrade25@gmail.com</p>
            </div>
            <div>
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">7000XXX897</p>
              <p className="text-gray-600">24/7 Support Available</p>
            </div>
            <div>
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Colony </p>
              <p className="text-gray-600">xyz park, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}