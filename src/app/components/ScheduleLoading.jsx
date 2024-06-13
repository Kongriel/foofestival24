import React from "react";

function ScheduleLoading({ width, height }) {
  return (
    <div className="max-w-sm mx-auto bg-knap-10 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-101 animate-pulse">
      <div style={{ width, height, position: "relative" }} className="bg-knap-10"></div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-bono-10 bg-gray-300 w-3/4 h-6"></div>
        <p className="text-bono-10">
          <span className="block bg-knap-10 w-1/2 h-4 mb-2"></span>
          <span className="block bg-knap-10 w-1/3 h-4"></span>
        </p>
      </div>
    </div>
  );
}

export default ScheduleLoading;
