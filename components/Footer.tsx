
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 mt-16 border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} AutoPromptGenerator. All rights reserved.</p>
        <p className="text-sm mt-1">
          Powered by React & Tailwind CSS. 
          
        </p>
      </div>
    </footer>
  );
};

export default Footer;