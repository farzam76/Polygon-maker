import React from "react";
type IconNames = "back" | "close" | "edit" | "delete";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  iconName?: IconNames;
}
//TODO take these icons to thir own directory

function getIcon(iconName: IconNames) {
  if (iconName === "close") {
    return (
      <svg
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
      </svg>
    );
  }
  if (iconName === "edit") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
        <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
      </svg>
    );
  }
  if (iconName === "delete") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    );
  }
  if (iconName === "back") {
    return "<";
  }
}

export const Button: React.FC<ButtonProps> = ({
  children,
  iconName,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${className} flex items-center justify-center gap-2  ${!iconName && 'bg-blue-500'}  rounded-md`}
    >
      {iconName && getIcon(iconName)}
      {children}
    </button>
  );
};
