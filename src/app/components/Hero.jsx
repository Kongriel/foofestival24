import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSkeleton from "./LoadingSkeleton";

function Hero() {
  const [bands, setBands] = useState([]);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://winter-frill-lemon.glitch.me/bands")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.length >= 14) {
          const firstThree = [data[10], data[13], data[12]];

          const remaining = data.filter((_, index) => ![9, 10, 12, 13].includes(index));

          setBands([...firstThree, ...remaining.slice(0, 14)]);
        } else {
          setBands(data.slice(0, 17));
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 668);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const firstThree = isMobile ? bands.slice(0, 2) : bands.slice(0, 3);
  const secondRow = isMobile ? bands.slice(3, 6) : bands.slice(3, 10);
  const thirdRow = isMobile ? bands.slice(8, 11) : bands.slice(10, 17);
  const fourthRow = isMobile ? bands.slice(12, 15) : [];

  return (
    <div>
      {error && <div className="text-red-500 text-center p-4">{error}</div>}

      <div className="flex flex-col items-center space-y-1 px-9">
        {/* First row */}
        <div className="flex justify-center items-center space-x-4">
          {loading ? (
            <>
              <LoadingSkeleton sizeClass="w-36 h-36 lg:w-80 lg:h-80 md:w-56 md:h-56" />
              <LoadingSkeleton sizeClass="w-36 h-36 lg:w-80 lg:h-80 md:w-56 md:h-56" />
              <LoadingSkeleton sizeClass="w-36 h-36 lg:w-80 lg:h-80 md:w-56 md:h-56" />
            </>
          ) : (
            firstThree.map((band) => (
              <Link key={band.slug} href={`/bands/${band.slug}`}>
                <div className="group relative text-center cursor-pointer">
                  <div className="block w-36 h-36 lg:w-80 lg:h-80 md:w-56 md:h-56 overflow-hidden rounded-full mx-auto border-4 border-transparent border-white hover:border-blue-400 hover:-rotate-8 transition-all duration-200 ease-in-out transform hover:scale-105">
                    <Image src={band.logo.startsWith("https") ? band.logo : `/${band.logo}`} alt={band.name} layout="fill" objectFit="cover" className="rounded-full group-hover:opacity-50 transition-opacity duration-200 ease-in-out" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                      <span className="text-white font-semibold text-sm md:text-xl">{band.name}</span>
                    </div>
                  </div>
                  <div className="mt-1 md:hidden text-bono-10 text-xs font-semibold">{band.name}</div>
                </div>
              </Link>
            ))
          )}
        </div>
        {/* Other rows with conditional margin */}
        {[secondRow, thirdRow, fourthRow].map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center items-center space-x-3">
            {loading
              ? Array.from({ length: row.length }).map((_, index) => <LoadingSkeleton key={index} sizeClass="w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40" extraClass={index % 2 !== 0 ? "mt-[3em]" : ""} />)
              : row.map((band, index) => (
                  <Link key={band.slug} href={`/bands/${band.slug}`} passHref>
                    <div className={`group text-xxs relative text-center cursor-pointer ${index % 2 !== 0 ? "mt-[3em] hover:-rotate-9 transition-all duration-200 ease-in-out transform hover:scale-105" : "hover:-rotate-8 transition-all duration-300 ease-in-out transform hover:scale-105"}`}>
                      <div className="block w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 overflow-hidden rounded-full mx-auto border-4 border-transparent border-white hover:border-blue-400 transition-all duration-300 ease-in-out transform">
                        <Image src={band.logo.startsWith("http") ? band.logo : `/${band.logo}`} alt={band.name} layout="fill" objectFit="cover" className="rounded-full group-hover:opacity-50 transition-opacity duration-200 ease-in-out" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                          <span className="text-white text-xxs md:text-lg">{band.name}</span>
                        </div>
                      </div>
                      <div className="mt-1 md:hidden text-bono-10 text-xxs">{band.name}</div>
                    </div>
                  </Link>
                ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
