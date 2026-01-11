// import React, { useState } from "react";


// const SearchBar = ({ buses = [] }) => {
//   const [query, setQuery] = useState("");

//   const filteredBuses = buses.filter((bus) =>
//     bus?.number?.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="w-full max-w-md mx-auto mb-6">
//       <input
//         type="text"
//         placeholder="Search Bus Number..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       {query && (
//         <div className="bg-white border rounded mt-2 shadow">
//           {filteredBuses.length > 0 ? (
//             filteredBuses.map((bus, index) => (
//               <div
//                 key={index}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 Bus No: {bus.number}
//               </div>
//             ))
//           ) : (
//             <div className="px-4 py-2 text-gray-500">
//               No buses found
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCity, FaCog, FaShareAlt, FaLanguage, FaLightbulb, FaBell,
  FaBusAlt, FaSignOutAlt
} from "react-icons/fa";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import LanguageSelection from './LanguageSelection';
import SelectCityModal from "./SelectCityModal";

const UserSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const handleClick = (label) => {
    if (onClose) onClose();

    switch (label) {
      case "Language Selection":
        setIsLanguageModalOpen(true);
        break;
      case "Select City":
        setIsCityModalOpen(true);
        break;
      case "Settings":
        navigate("/setting-page"); // ✅ Navigate to settings page
        break;
        case "Share App":
        navigate("/share"); // ✅ Navigate to settings page
        break;
        case "View all Alerts":
          navigate("/alerts"); // ✅ Navigate to settings page
          break;
      case "Log Out":
        alert("🚪 Logged out");
        navigate("/user-login");
        break;
      default:
        alert(label);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white rounded-full p-2">
          <FaBusAlt className="text-blue-800 text-3xl" />
        </div>
        <div>
          <div className="text-2xl font-bold">Track My Ride</div>
          <div className="text-xs text-gray-200">from OBYS</div>
          <div className="text-xs text-gray-300 mt-1">Last sync: 07-Apr-2025</div>
        </div>
      </div>

      <div className="bg-white text-blue-800 px-4 py-2 mb-4 text-sm font-semibold rounded shadow">
        Track My Ride
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 flex-1">
        {[
          ["Select City", <FaCity />],
          ["Language Selection", <FaLanguage />],
          ["Settings", <FaCog />],
          ["Share App", <FaShareAlt />],
          ["Suggest a feature", <FaLightbulb />],
          ["View all Alerts", <FaBell />],
          ["Log Out", <FaSignOutAlt />]
        ].map(([label, icon]) => (
          <MenuItem key={label} icon={icon} label={label} onClick={() => handleClick(label)} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 z-50 w-72 h-full bg-blue-800 text-white p-5 shadow-lg md:hidden"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-72 bg-blue-800 text-white p-5 h-screen overflow-y-auto">
        {sidebarContent}
      </div>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {isLanguageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setIsLanguageModalOpen(false)}
          >
            <div
              className="bg-white p-5 rounded-lg w-80"
              onClick={(e) => e.stopPropagation()}
            >
              <LanguageSelection onClose={() => setIsLanguageModalOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Select City Modal */}
      <AnimatePresence>
        {isCityModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setIsCityModalOpen(false)}
          >
            <div
              className="bg-white p-5 rounded-lg w-80"
              onClick={(e) => e.stopPropagation()}
            >
              <SelectCityModal onClose={() => setIsCityModalOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserSidebar;
