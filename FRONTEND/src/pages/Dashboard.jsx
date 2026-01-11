// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import SearchBar from "../components/SearchBar";
// import BusDetails from "../components/BusDetails";
// import Sidebar from "../components/UserSidebar";

// const Dashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [busNo, setBusNo] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => setIsDesktop(window.innerWidth >= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const busDetails = {
//     "BUS-101": { status: "On Time", location: "New Market", arrival: "08:45 AM" },
//     "BUS-202": { status: "Delayed", location: "BHEL", arrival: "09:00 AM" },
//     "BUS-303": { status: "Departed", location: "Habibganj", arrival: "08:30 AM" },
//     "BUS-404": { status: "On Time", location: "MP Nagar", arrival: "08:45 AM" },
//     "BUS-505": { status: "Delayed", location: "Kolar Road", arrival: "09:00 AM" },
//     "BUS-606": { status: "Departed", location: "Bansal Group of Institutes", arrival: "08:30 AM" },
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setBusNo(value);
//     const upper = value.toUpperCase();
//     const matches = Object.keys(busDetails).filter((bus) => bus.startsWith(upper));
//     setSuggestions(value && matches.length ? matches : []);
//   };

//   const handleSuggestionClick = (bus) => {
//     setBusNo(bus);
//     setSuggestions([]);
//   };

//   const handleShowLocation = () => {
//     const busKey = busNo.trim().toUpperCase();
//     if (busDetails[busKey]) {
//       const queryParam = busKey.replace("BUS-", ""); // for map page
//       navigate(`/map?bus=${queryParam}`);
//     } else {
//       alert("❌ Bus number galat hai");
//     }
//   };

//   const busInfo = busDetails[busNo.trim().toUpperCase()];

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen relative">
//       {/* Mobile backdrop */}
//       {menuOpen && !isDesktop && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className="md:block">
//         <Sidebar isOpen={menuOpen || isDesktop} onClose={() => setMenuOpen(false)} />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="flex-1"
//       >
//         {/* Navbar */}
//         <div className="bg-blue-800 text-white p-4 flex items-center gap-4 md:gap-6">
//           {!isDesktop && (
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="bg-blue-700 hover:bg-blue-600 p-2 rounded-md"
//             >
//               <FaBars className="text-xl" />
//             </button>
//           )}
//           <h1 className="text-lg font-bold">Track My Ride</h1>
//         </div>

//         {/* Main Content */}
//         <div className="p-4 space-y-6">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.4 }}
//             className="bg-white p-4 rounded-xl shadow space-y-4"
//           >
//             <SearchBar
//               busNo={busNo}
//               onChange={handleInputChange}
//               suggestions={suggestions}
//               onSelect={handleSuggestionClick}
//             />
//           </motion.div>

//           <AnimatePresence>
//             {busInfo && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <BusDetails
//                   busNo={busNo}
//                   busInfo={busInfo}
//                   onShowLocation={handleShowLocation}
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BusDetails from "../components/BusDetails";
import Sidebar from "../components/UserSidebar";
import api from "../api/axios";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [busNo, setBusNo] = useState("");
  const [buses, setBuses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const navigate = useNavigate();

  // 🔗 BACKEND CALL
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await api.get("/buses");
        setBuses(res.data);
      } catch (err) {
        console.error("Failed to load buses");
      }
    };
    fetchBuses();
  }, []);

  // 📱 Responsive
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔍 SEARCH LOGIC (Backend data)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setBusNo(value);

    const matches = buses
      .map((bus) => bus.number)
      .filter((num) =>
        num.toLowerCase().startsWith(value.toLowerCase())
      );

    setSuggestions(value && matches.length ? matches : []);
  };

  const handleSuggestionClick = (bus) => {
    setBusNo(bus);
    setSuggestions([]);
  };

  // 🚌 Selected bus info
  const busInfo = buses.find(
    (bus) => bus.number.toLowerCase() === busNo.toLowerCase()
  );

  // 🗺 Map navigation
  const handleShowLocation = () => {
    if (busInfo) {
      navigate(`/map?bus=${busInfo.number}`);
    } else {
      alert("❌ Bus number galat hai");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* Mobile backdrop */}
      {menuOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className="md:block">
        <Sidebar
          isOpen={menuOpen || isDesktop}
          onClose={() => setMenuOpen(false)}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1"
      >
        {/* Navbar */}
        <div className="bg-blue-800 text-white p-4 flex items-center gap-4">
          {!isDesktop && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-blue-700 p-2 rounded-md"
            >
              <FaBars className="text-xl" />
            </button>
          )}
          <h1 className="text-lg font-bold">Track My Ride</h1>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-4 rounded-xl shadow space-y-4"
          > 
            <SearchBar
              busNo={busNo}
              onChange={handleInputChange}
              suggestions={suggestions}
              onSelect={handleSuggestionClick}
            />
          </motion.div>

          <AnimatePresence>
            {busInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <BusDetails
                  busNo={busInfo.number}
                  busInfo={busInfo}
                  onShowLocation={handleShowLocation}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
