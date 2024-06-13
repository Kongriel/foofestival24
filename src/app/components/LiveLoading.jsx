import React from "react";

function LiveLoading({ width, height, extraClass = "" }) {
  return (
    <div className={`animate-pulse ${extraClass}`}>
      <div className={`block ${width} ${height} bg-knap-10 rounded-lg`}></div>
    </div>
  );
}

export default LiveLoading;
