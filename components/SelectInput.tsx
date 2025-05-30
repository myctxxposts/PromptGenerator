
import React from 'react';

interface SelectInputProps<T extends string | number> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: T; label: string }[];
  error?: string;
  leftIcon?: React.ReactNode;
  placeholder?: string; // Explicitly define placeholder prop
}

const SelectInput = <T extends string | number,>({ 
  label, 
  id, 
  options, 
  error, 
  className, 
  leftIcon, 
  placeholder, // Destructure placeholder
  ...restProps // Use restProps for remaining HTMLSelectAttributes
}: SelectInputProps<T>) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label} {restProps.required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {leftIcon && React.isValidElement(leftIcon) && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             {React.cloneElement(leftIcon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5 text-gray-400"})}
            </div>
        )}
        <select
          id={id}
          className={`w-full py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition-colors duration-150 appearance-none ${leftIcon ? 'pl-10' : 'px-3'} ${error ? 'border-red-500 ring-red-500' : ''} ${className || ''}`}
          {...restProps} // Spread only valid select attributes
        >
          {/* Use the destructured placeholder prop */}
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(option => (
            <option key={option.value.toString()} value={option.value} className="bg-gray-700 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default SelectInput;