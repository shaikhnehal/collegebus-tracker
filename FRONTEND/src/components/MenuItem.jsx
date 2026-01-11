import React from "react";

const MenuItem = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition"
    >
      <div className="text-2xl">{icon}</div> {/* Icon bada */}
      <div className="text-lg font-semibold">{label}</div> {/* Text bada aur bold */}
    </div>
  );
};

export default MenuItem;
