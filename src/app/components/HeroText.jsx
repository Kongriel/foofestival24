import React from "react";
import Image from "next/image";


function HeroText() {
  return (
    <div className="flex items-center w-full  overflow-hidden">
      <Image
        src="/Foofest-logo-2.png"
        alt="Logo"
        width={400}
        height={400}
        className="transform transition duration-800 ease-in-out animate-move"
      />
    </div>
  
  );
}

export default HeroText;
