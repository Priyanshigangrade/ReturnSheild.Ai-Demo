import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import Header from './components/Header';
import DemoPage from './components/DemoPage';
import AboutPage from './components/AboutPage';
import ReturnShieldDemo from './ReturnShieldDemo';



function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('demo');

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('returnshield_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('returnshield_user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('returnshield_user');
    setUser(null);
    setCurrentPage('demo');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleStartDemo = () => {
    setCurrentPage('live-demo');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="text-gray-700 font-medium">Loading ReturnShield AI...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show authentication page if user is not logged in
  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // Show main app if user is logged in
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      <div className={currentPage === 'live-demo' ? 'p-5' : ''}>
        {currentPage === 'demo' && <DemoPage onStartDemo={handleStartDemo} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'live-demo' && <ReturnShieldDemo />}
      </div>
    </div>
  );
}

export default App;