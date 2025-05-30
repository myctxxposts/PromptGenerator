
import React from 'react';

interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, id, value, error, className, ...props }) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label} {props.required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        id={id}
        rows={4}
        value={value}
        className={`w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition-colors duration-150 ${error ? 'border-red-500 ring-red-500' : ''} ${className || ''}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default TextAreaInput;