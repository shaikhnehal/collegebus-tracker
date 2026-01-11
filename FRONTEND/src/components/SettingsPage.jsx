import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import back icon from react-icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for back navigation

const SettingsLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top bar with back button - fixed on all settings pages */}
      <div className="bg-blue-600 text-white py-4 px-4 shadow-md flex items-center">
        <FaArrowLeft
          className="text-2xl cursor-pointer"
          onClick={() => window.history.back()} // Navigate back to the previous page
        />
        <h2 className="text-xl font-bold text-center ml-4">Settings</h2>
      </div>

      {/* Children will be the actual settings content */}
      <div className="flex-1 bg-white max-w-lg mx-auto p-4 mt-2 rounded-lg shadow text-gray-900 sm:max-w-full sm:w-full sm:rounded-none">
        {children}
      </div>
    </div>
  );
};

const SettingToggle = ({ title, description, isChecked, onChange }) => (
  <div className="flex items-center justify-between py-4">
    <div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition relative duration-300">
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition duration-300" />
      </div>
    </label>
  </div>
);

const SettingsPage = () => {
  const [trainOption, setTrainOption] = useState(true);
  const [spotNotification, setSpotNotification] = useState(true);
  const [speedometer, setSpeedometer] = useState(false);

  return (
    <SettingsLayout>
      {/* Language */}
      <div
        className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50 rounded px-1"
        onClick={() => alert("Language selection modal open hoga")}
      >
        <div>
          <h3 className="text-base font-semibold">Language</h3>
          <p className="text-sm text-gray-600">Choose your language</p>
        </div>
      </div>
      <hr className="border-gray-300" />

      {/* Time Settings */}
      <div className="py-4">
        <h3 className="text-base font-semibold">Time Settings</h3>
        <p className="text-sm text-gray-600">AM/PM format time</p>
      </div>
      <hr className="border-gray-300" />

      {/* Inside Train Option */}
      <SettingToggle
        title="Are you inside bus option"
        description="Suggest Are you inside bus option"
        isChecked={trainOption}
        onChange={() => setTrainOption(!trainOption)}
      />
      <hr className="border-gray-300" />

      {/* Spot Settings */}
      <div>
        <p className="text-blue-600 text-sm font-medium mb-2">Spot Settings</p>
        <SettingToggle
          title="Spot Notifications"
          description="Your location information as a standing notification"
          isChecked={spotNotification}
          onChange={() => setSpotNotification(!spotNotification)}
        />
      </div>
      <hr className="border-gray-300" />

      {/* Speedometer Settings */}
      <div>
        <p className="text-blue-600 text-sm font-medium mb-2">Speedometer Settings</p>
        <SettingToggle
          title="Speedometer (Beta)"
          description="Show Speedometer in GPS mode"
          isChecked={speedometer}
          onChange={() => setSpeedometer(!speedometer)}
        />
      </div>
      <hr className="border-gray-300" />

      {/* Alarm Settings */}
      <div
        className="py-4 cursor-pointer hover:bg-gray-50 rounded px-1"
        onClick={() => alert("Alarm tone chooser open hoga")}
      >
        <p className="text-blue-600 text-sm font-medium mb-2">Alarm Settings</p>
        <h3 className="text-base font-semibold">Alarm tone</h3>
        <p className="text-sm text-gray-600">Choose alarm tone</p>
      </div>
      <hr className="border-gray-300" />

      {/* About */}
      <div className="py-4">
        <p className="text-blue-600 text-sm font-medium mb-2">About</p>
        <p className="text-sm text-gray-800">Terms of Use & Privacy Policy</p>
        <p className="text-sm text-gray-800">Open source licenses</p>
        <p className="text-sm text-gray-600 mt-2">App Version: 7.1.5.738766480</p>
      </div>
    </SettingsLayout>
  );
};

export default SettingsPage;
