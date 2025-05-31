
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  isLoading?: boolean;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  isLoading = false,
  icon,
  size = 'md',
  ...props
}) => {
  const baseStyle = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-200 ease-in-out flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg";
  
  let variantStyle = "";
  switch (variant) {
    case 'primary':
      variantStyle = "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500";
      break;
    case 'secondary':
      variantStyle = "bg-gray-600 hover:bg-gray-700 text-gray-100 focus:ring-gray-500";
      break;
    case 'danger':
      variantStyle = "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
      break;
    case 'outline':
      variantStyle = "bg-transparent border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white focus:ring-indigo-400";
      break;
  }

  let sizeStyle = "";
  switch(size) {
    case 'sm':
      sizeStyle = "py-1.5 px-3 text-sm";
      break;
    case 'md':
      sizeStyle = "py-2 px-4 text-base";
      break;
    case 'lg':
      sizeStyle = "py-3 px-6 text-lg";
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className || ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className={`mr-2 ${isLoading ? 'hidden' : 'inline-block'}`}>{icon}</span>
      ): null}
      <span className={isLoading ? 'ml-2' : ''}>{isLoading ? 'Processing...' : children}</span>
    </button>
  );
};

export default Button;
