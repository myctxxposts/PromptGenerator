
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-indigo-500 mr-3 transform transition-transform duration-300 hover:rotate-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17.437 14.846a4.5 4.5 0 01-3.09 3.09L11.5 18.75l.813-2.846a4.5 4.5 0 013.09-3.09L18.25 12zM18.25 12L17.437 9.154a4.5 4.5 0 00-3.09-3.09L11.5 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L18.25 12z" />
            </svg>
              <span className="text-white">Auto</span> <span className="text-indigo-400">Prompt</span> <span className="text-white">Generator</span> <span className="text-indigo-400">By Chay</span>
           </div>
          <p className="text-indigo-300 text-xs sm:text-sm hidden md:block">Craft your perfect prompt effortlessly</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
