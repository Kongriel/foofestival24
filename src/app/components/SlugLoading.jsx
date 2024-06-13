import React from "react";

function SlugLoading({ width, height, extraClass = "" }) {
  return (
    <div className={`animate-pulse ${extraClass}`}>
      <div className={`block ${width} ${height} bg-gray-300 rounded-lg`}></div>
    </div>
  );
}

export default SlugLoading;
