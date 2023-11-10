import React from "react";
import { useTranslation } from "react-i18next";
import { supportedlangs } from "i18n";
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  //TODO move select to its own component
  return (
    <div className="relative inline-block text-left">
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="appearance-none block w-full bg-white border border-gray-300 py-2 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring focus:border-indigo-500"
        aria-label="Select Language"
      >
        {supportedlangs.map((lang) => (
          <option key={lang.code} aria-label={lang.name} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 8.293a1 1 0 011.414 0L10 9.586l1.293-1.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414zM7 4a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0zM2 6a1 1 0 100 2h16a1 1 0 100-2H2z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
