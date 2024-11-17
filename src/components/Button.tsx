// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
