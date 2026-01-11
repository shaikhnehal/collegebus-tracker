import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = ({ onMenuClick }) => (
  <div className="bg-blue-800 text-white p-4 flex items-center gap-4">
    <button
      onClick={onMenuClick}
      className="bg-blue-700 hover:bg-blue-600 p-2 rounded-md"
    >
      <FaBars className="text-xl" />
    </button>
    <h1 className="text-lg font-bold">Track My Ride</h1>
  </div>
);

export default Navbar;
