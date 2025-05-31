
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, error, className, leftIcon, ...props }) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label} {props.required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {leftIcon && React.isValidElement(leftIcon) && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {React.cloneElement(leftIcon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5 text-gray-400"})}
          </div>
        )}
        <input
          id={id}
          type="text"
          className={`w-full py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition-colors duration-150 ${leftIcon ? 'pl-10' : 'px-3'} ${error ? 'border-red-500 ring-red-500' : ''} ${className || ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default TextInput;
