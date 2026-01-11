import React, { useRef } from "react";
import api from "../api/axios";

const DriverPanel = () => {
  const intervalRef = useRef(null);

  const sendLocation = () => {
    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        await api.put("/driver/location", {
          lat: latitude,
          lng: longitude,
        });
      },
      () => alert("Location permission denied")
    );
  };

  const startTracking = () => {
    sendLocation();
    intervalRef.current = setInterval(sendLocation, 3000);
    alert("🟢 Tracking Started");
  };

  const stopTracking = () => {
    clearInterval(intervalRef.current);
    alert("🔴 Tracking Stopped");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">🚍 Driver Panel</h1>

      <button
        onClick={startTracking}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Start Tracking
      </button>

      <button
        onClick={stopTracking}
        className="bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Stop Tracking
      </button>
    </div>
  );
};

export default DriverPanel;
