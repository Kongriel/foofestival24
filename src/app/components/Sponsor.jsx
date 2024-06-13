import React from "react";
import Image from "next/image";

const SponsorWall = () => {
  const sponsors = [
    "https://assets-global.website-files.com/63619567f09fcef371836573/6638c5f424628a02698a8945_normal-p-500.png",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8e79dd2064c3444053d1e_pureshots.svg",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8e69a471b3d7aec35405f_drinx.svg",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8eb232d9d5596cc1331a9_havana.svg",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8e69f2d9d55145e12e1c9_kommune.svg",
    "https://assets-global.website-files.com/63619567f09fcef371836573/66264e70548f3c1435c8d5ca_PNG%20derivative-JM_INT_Logo_SingleColour_Black_White_RGB_digital_display-p-500.png",
    "https://assets-global.website-files.com/63619567f09fcef371836573/65f088e3429beb04df1d66c5_Rockstar%20ED%20Master%20Separates%20AW%20black-p-500.png",
    "https://assets-global.website-files.com/63619567f09fcef371836573/65f088f7ccd0b11c12ae6b8b_Pepsi%20Globe_logo_Black_Negativ_CMYK-p-500.png",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8eb3126cd7efa73baee26_booster.svg",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8eb2b14968712595dffc9_absolut.svg",
    "https://assets-global.website-files.com/63619567f09fcef371836573/65f089093228ee3a75062d3d_Royal_Secondary_Logo_Black_CMYK-p-500.png",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8eb66149687d12a5e02cc_malfy.svg",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8e7ada0e28d0a00d70843_gh.svg",
    "https://assets-global.website-files.com/63619567f09fcef371836573/65f086775c7b19f318f1a835_lykkeliga_logo_groen_blaa_PNG.png",
    "https://assets-global.website-files.com/63619567f09fcef371836573/63d8e78dbd85e2db9f2f99de_graitor.svg",
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sponsors.map((src, index) => (
            <div key={index} className="flex items-center justify-center h-28 p-4 bg-knap-10 hover:scale-105 ease-in-out rounded-lg shadow transition-transform duration-450">
              <Image src={src} alt="Sponsor Logo" className="svg-sm filter-red" width={100} height={100} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorWall;
