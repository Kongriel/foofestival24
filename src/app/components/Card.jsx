import React, { useState } from "react";
import Link from "next/link";

function Card({ title, status, subtitle, price, ticketType }) {
  const [textStrokeColor, setTextStrokeColor] = useState("#007bff");

  // Define outline style based on state
  const outlineStyle = {
    color: "transparent",
    fontWeight: "bold",
    WebkitTextStroke: `2px ${textStrokeColor}`,
  };

  const handleClick = () => {
    const ticketDetails = { title, status, price, ticketType };
    localStorage.setItem("selectedTicket", JSON.stringify(ticketDetails));
  };

  return (
    <Link href="/booking" passHref>
      <div className="bg-knap-10 p-6 transition-all duration-200 ease-in-out hover:border-blue-500 focus:border-blue-500 hover:ring-2 focus:ring-2 hover:ring-blue-500 focus:ring-blue-500 focus:outline-none border-2 border-transparent rounded-xl shadow-xl max-w-sm mx-auto cursor-pointer group" onMouseEnter={() => setTextStrokeColor("black")} onMouseLeave={() => setTextStrokeColor("#007bff")} onFocus={() => setTextStrokeColor("black")} onBlur={() => setTextStrokeColor("#007bff")} tabIndex="0" onClick={handleClick}>
        <div className="text-center">
          <h1 className="text-2xl mt-6 mb-10 font-bold font-bebas text-gray-600">{title}</h1>
          <h2 className="text-6xl mt-12 mb-4 font-bebas font-bold text-blue-800" style={outlineStyle}>
            FOO'24 <br /> ALL WEEK
          </h2>
          <p className="mt-2 font-semibold font-bebas text-black">{status} TICKET</p>
          <p className="text-sm mt-1 mb-6 font-montserrat text-gray-800">{subtitle}</p>
          <p className="text-4xl font-bold font-bebas text-black mt-12 group-hover:text-blue-500 group-focus:text-blue-500">{price} DKK</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
