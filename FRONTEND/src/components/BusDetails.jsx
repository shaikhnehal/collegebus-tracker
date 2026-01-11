import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BusDetails = ({ busNo, busInfo, onShowLocation }) => {
  const navigate = useNavigate();

  if (!busInfo) return null;

  return (
    <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded-lg shadow space-y-2 w-full max-w-xl mx-auto">
      
      <h2 className="text-lg md:text-xl font-bold">
        {busNo.trim().toUpperCase()}
      </h2>

      <p className="text-sm md:text-base">
        Status: {busInfo.status || "Running"}
      </p>

      <p className="text-sm md:text-base">
        Last Location:{" "}
        {busInfo.location
          ? `${busInfo.location.lat}, ${busInfo.location.lng}`
          : "Not available"}
      </p>

      <p className="text-sm md:text-base">
        Expected Arrival: {busInfo.arrival || "N/A"}
      </p>

      <button
        onClick={onShowLocation}
        className="mt-2 inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition text-sm md:text-base"
      >
        <FaMapMarkerAlt /> View Location on Map
      </button>
    </div>
  );
};

export default BusDetails;
