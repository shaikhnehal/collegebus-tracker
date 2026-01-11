import React, { useState } from "react";
import { FaGlobeAsia } from "react-icons/fa";

const LanguageSelection = ({ onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected Language: ${selectedLanguage}`);
    localStorage.setItem("language", selectedLanguage);
    if (onClose) onClose();
  };

  const languages = [
    { label: "English", value: "english" },
    { label: "हिंदी", value: "hindi" },
    { label: "ಕನ್ನಡ", value: "kannada" },
    { label: "தமிழ்", value: "tamil" },
    { label: "বাংলা", value: "bengali" },
    { label: "मराठी", value: "marathi" },
    { label: "മലയാളം", value: "malayalam" },
    { label: "తెలుగు", value: "telugu" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          <FaGlobeAsia /> Choose Language
        </h2>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {languages.map((lang) => (
          <label
            key={lang.value}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border ${
              selectedLanguage === lang.value
                ? "bg-blue-100 border-blue-600 font-semibold"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <span>{lang.label}</span>
            <input
              type="radio"
              checked={selectedLanguage === lang.value}
              onChange={() => setSelectedLanguage(lang.value)}
            />
          </label>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-900"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default LanguageSelection;
