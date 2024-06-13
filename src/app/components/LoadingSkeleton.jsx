import React from "react";

function LoadingSkeleton({ sizeClass, offsetClass }) {
  return (
    <div className={`group relative text-center cursor-pointer ${offsetClass}`}>
      <div className={`block ${sizeClass} overflow-hidden rounded-full mx-auto bg-knap-10`}></div>
      <div className="mt-1 md:hidden text-bono-10 text-xs font-semibold bg-knap-10 w-24 h-4 mx-auto"></div>
    </div>
  );
}

export default LoadingSkeleton;
