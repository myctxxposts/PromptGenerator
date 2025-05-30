
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10 p-6 bg-gray-800 rounded-lg shadow-xl">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
      <p className="text-lg text-indigo-300 font-semibold">Generating Your Prompt...</p>
      <p className="text-sm text-gray-400">Please wait a moment.</p>
    </div>
  );
};

export default LoadingSpinner;