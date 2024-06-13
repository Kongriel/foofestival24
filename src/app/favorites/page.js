"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

  if (favoriteBands.length === 0) {
    return <div className="flex flex-col items-center justify-center mt-24">No favorite bands added yet.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8">My Favorite Bands</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bandSchedules.map((band) => (
          <li key={band.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image src={band.logo.startsWith("http") ? band.logo : `/${band.logo}`} alt={`${band.name} logo`} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{band.name}</h2>
              <p className="text-sm text-gray-700 mb-2">{band.genre}</p>
              <p className="text-sm text-gray-700 mb-2">
                {band.day.toUpperCase()} {band.start} - {band.end} @ {band.scene}
              </p>
              <div className="flex justify-between items-center">
                <Link href={`/bands/${band.slug}`} passHref className="text-blue-500 hover:text-blue-700">
                  View Details
                </Link>
                <button onClick={() => handleFavoriteClick(band.slug)}>
                  <Image src={isBandFavorited(band.slug) ? "/heart-filled.svg" : "/heart-empty.svg"} alt="Favorite" width={32} height={32} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
