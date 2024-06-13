"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative flex items-center h-20 bg-knap-10 w-full shadow-md opacity-90 px-4">
      <div className="absolute left-0 z-10">
        <Link href="#" passHref onClick={handleScrollToTop}>
          <Image src="/Foofest-logo-2.png" alt="Footer Image" width={80} height={80} />
        </Link>
      </div>

      <div className="absolute inset-x-0 mx-auto flex justify-center z-0">
        <Link href="/booking" passHref className="transition duration-300 font-montserrat md:animate-bounce">
          <button className="px-8 py-4 md:text-base font-medium text-bono-10 md:text-white md:bg-bono-10 rounded-md md:hover:bg-blue-600 font-montserrat">Køb billetter</button>
        </Link>
      </div>

      <div className="absolute pr-6 right-0 z-10 max-w-xs whitespace-normal break-words">
        <p className="text-bono-10 font-montserrat">
          Vi ses til <br></br> FooFest '24!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
