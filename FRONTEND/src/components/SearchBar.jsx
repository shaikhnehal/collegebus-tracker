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

import React from "react";

const SearchBar = ({ busNo, onChange, suggestions, onSelect }) => (
  <div className="flex flex-col gap-3 relative w-full max-w-md mx-auto">
    <input
      type="text"
      value={busNo}
      onChange={onChange}
      placeholder="Type BUS to search..."
      className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base w-full"
    />
    {suggestions.length > 0 && (
      <ul className="absolute top-full mt-1 w-full bg-white border rounded shadow z-10 max-h-48 overflow-y-auto">
        {suggestions.map((sug) => (
          <li
            key={sug}
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm md:text-base"
            onClick={() => onSelect(sug)}
          >
            {sug}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchBar;
