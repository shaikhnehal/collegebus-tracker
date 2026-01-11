import React, { useState } from "react";
import { motion } from "framer-motion";

const cities = [
  "Bhopal", "Darbhanga", "Ahmedabad", "Bengaluru", "Chennai", "Delhi",
  "Hyderabad", "Jaipur", "Kanpur", "Kochi", "Kolkata", "Khirma",
  "Mumbai", "All India"
];

const SelectCityModal = ({ selectedCity, onClose, onSave }) => {
  const [selected, setSelected] = useState(selectedCity || "All India");

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md w-[90%] max-w-sm p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Select city</h2>
        <div className="max-h-80 overflow-y-auto">
          {cities.map((city) => (
            <label
              key={city}
              className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-100 px-2 rounded"
            >
              <input
                type="radio"
                name="city"
                value={city}
                checked={selected === city}
                onChange={() => setSelected(city)}
                className="accent-blue-600"
              />
              <span className="text-gray-900">{city}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-4 text-blue-700 font-medium text-sm">
          <button onClick={onClose} className="hover:underline">CANCEL</button>
          <button onClick={handleSave} className="hover:underline">OK</button>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectCityModal;
