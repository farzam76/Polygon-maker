// a defualt button component with tailwind that takes children and an icon name
import { get } from "http";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  iconName?: 'back' | 'close';
}

//a small funcation that returns diffrent compoennet based on iconName
function getIcon(iconName: 'back' | 'close') {
    if (iconName === 'close') {
        return (<svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>)
    }
    if (iconName === 'back') {
        return '<'
    }
}


export const Button: React.FC<ButtonProps> = ({ children, iconName,className, ...rest }) => {
  return (
    <button {...rest} className={`${className} flex items-center justify-center gap-2  bg-blue-500  rounded-md`}>
      {iconName && getIcon(iconName)}
      {children}
    </button>
  );
};
