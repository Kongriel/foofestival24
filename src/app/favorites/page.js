"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Knap1 from "@/app/components/Knap1";

const FavoritesPage = () => {
  const [favoriteBands, setFavoriteBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [bandSchedules, setBandSchedules] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteBands")) || [];
    setFavoriteBands(storedFavorites);

    const fetchSchedule = async () => {
      try {
        const res = await fetch("https://winter-frill-lemon.glitch.me/schedule");
        const scheduleData = await res.json();
        setSchedule(scheduleData);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchSchedule();
  }, []);

  const dayNames = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  useEffect(() => {
    if (Object.keys(schedule).length > 0 && favoriteBands.length > 0) {
      const fetchBands = async () => {
        try {
          const res = await fetch("https://winter-frill-lemon.glitch.me/bands");
          const bandsData = await res.json();
          const favoriteSchedules = [];

          Object.entries(schedule).forEach(([scene, days]) => {
            Object.entries(days).forEach(([day, slots]) => {
              slots.forEach((slot) => {
                if (slot.act !== "break") {
                  const band = favoriteBands.find((b) => b.name === slot.act);
                  if (band) {
                    const bandInfo = bandsData.find((data) => data.name === band.name);
                    if (bandInfo) {
                      favoriteSchedules.push({
                        ...bandInfo,
                        scene,
                        start: slot.start,
                        end: slot.end,
                        day,
                      });
                    }
                  }
                }
              });
            });
          });

          favoriteSchedules.sort((a, b) => {
            const dayOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
            const dayComparison = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
            if (dayComparison !== 0) return dayComparison;
            return a.start.localeCompare(b.start);
          });

          setBandSchedules(favoriteSchedules);
        } catch (err) {
          console.error("Fetch error:", err);
        }
      };

      fetchBands();
    }
  }, [schedule, favoriteBands]);

  const isBandFavorited = (slug) => favoriteBands.some((band) => band.slug === slug);

  const handleFavoriteClick = (slug) => {
    const updatedFavorites = favoriteBands.filter((favBand) => favBand.slug !== slug);
    localStorage.setItem("favoriteBands", JSON.stringify(updatedFavorites));
    setFavoriteBands(updatedFavorites);
  };

  const groupedBands = bandSchedules.reduce((acc, band) => {
    if (!acc[band.day]) {
      acc[band.day] = [];
    }
    acc[band.day].push(band);
    return acc;
  }, {});

  if (favoriteBands.length === 0) {
    return <div className="flex flex-col items-center justify-center mt-24">No favorite bands added yet.</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-11/12 md:w-5/6 lg:w-3/4 flex flex-col px-4 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-7xl text-bono-10 font-bebas text-center mt-10 font-bold mb-8">My Favorite Bands</h1>
        <div className="flex justify-center mb-14">
          <Knap1 />
        </div>
        {Object.entries(groupedBands).map(([day, bands]) => (
          <div key={day} className="mb-6">
            <h2 className="text-m font-bebas bg-knap-10 text-bono-10 font-bold pl-4 mb-4">{dayNames[day].toUpperCase()}</h2>
            <ul className="space-y-4">
              {bands.map((band, index) => (
                <div key={band.slug}>
                  <li className="overflow-hidden">
                    <div className="flex">
                      <div className="p-4 w-full md:w-3/4">
                        <h2 className="text-xl font-bold mb-1 text-bono-10">{band.name.toUpperCase()}</h2>
                        <p className="text-sm font-Konnect text-gray-700 mb-1">
                          {band.start}, {band.scene.toUpperCase()}
                        </p>
                        <button onClick={() => handleFavoriteClick(band.slug)}>
                          <Image src={isBandFavorited(band.slug) ? "/heart-filled.svg" : "/heart-empty.svg"} alt="Favorite" width={24} height={24} />
                        </button>
                      </div>
                      <div className="relative w-1/4 h-32">
                        <Image src={band.logo.startsWith("http") ? band.logo : `/${band.logo}`} alt={`${band.name} logo`} layout="fill" objectFit="cover" />
                      </div>
                    </div>
                  </li>
                  {index < bands.length - 1 && <hr className="my-2 border-b-2 border-knap-10 w-full" />}
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
