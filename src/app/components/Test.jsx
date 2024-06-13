import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ScheduleLoading from "./ScheduleLoading";

const Schedule = () => {
  const getCurrentDay = () => {
    const dayOfWeek = new Date().getDay();
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days[dayOfWeek];
  };

  const dayNames = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [selectedScene, setSelectedScene] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteBands, setFavoriteBands] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state

  useEffect(() => {
    const fetchBands = fetch("https://winter-frill-lemon.glitch.me/bands").then((res) => res.json());
    const fetchSchedule = fetch("https://winter-frill-lemon.glitch.me/schedule").then((res) => res.json());

    Promise.all([fetchBands, fetchSchedule])
      .then(([bandsData, scheduleData]) => {
        setLoading(false);
        setBands(bandsData);
        setSchedule(scheduleData);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Fetch error:", err);
        setError(err.message);
      });

    const storedFavorites = JSON.parse(localStorage.getItem("favoriteBands")) || [];
    setFavoriteBands(storedFavorites);
  }, []);

  const getBandsForDayAndScene = () => {
    return Object.keys(schedule).reduce((acc, scene) => {
      const days = Object.keys(schedule[scene]);
      days.forEach((day) => {
        if (selectedDay && day !== selectedDay) {
          return; // Skip days not matching selectedDay
        }
        const daySchedule = schedule[scene][day];
        if (daySchedule) {
          daySchedule.forEach((slot) => {
            if (slot.act !== "break") {
              const band = bands.find((b) => b.name === slot.act);
              if (band) {
                if (!selectedScene || scene === selectedScene) {
                  if (band.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    acc.push({ ...band, scene, start: slot.start, end: slot.end });
                  }
                }
              }
            }
          });
        }
      });
      return acc;
    }, []);
  };

  const isBandFavorited = (slug) => favoriteBands.some((band) => band.slug === slug);

  const handleFavoriteClick = (band) => {
    let updatedFavorites;
    if (isBandFavorited(band.slug)) {
      updatedFavorites = favoriteBands.filter((favBand) => favBand.slug !== band.slug);
    } else {
      updatedFavorites = [...favoriteBands, band];
    }
    localStorage.setItem("favoriteBands", JSON.stringify(updatedFavorites));
    setFavoriteBands(updatedFavorites);
  };

  const bandsForDayAndScene = selectedDay ? getBandsForDayAndScene(selectedDay) : [];

  const filteredBands = getBandsForDayAndScene().filter((band) => {
    const matchScene = !selectedScene || band.scene === selectedScene;
    const matchSearch = band.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchScene && matchSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold font-bebas text-bono-10 my-12">
        FOOFEST Schedule
        <span
          className="ml-2 sm:ml-4 font-bebas"
          style={{
            WebkitTextStroke: "1px black",
            color: "transparent",
          }}
        >
          {dayNames[selectedDay]?.toUpperCase() || "WHOLE WEEK"}
        </span>
      </h1>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
        <button onClick={() => setSelectedDay("")} className="bg-bono-10 border-2 text-white hover:border-blue-600 border-gray-500 rounded-lg  py-2 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base">
          ALL
        </button>
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
          <button key={day} onClick={() => setSelectedDay(day)} className="bg-knap-10 border-2 hover:border-blue-600 border-gray-500 rounded-lg text-bono-10 py-2 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base">
            {dayNames[day].toUpperCase()}
          </button>
        ))}
        {/* Search Field */}
        <input type="text" placeholder="Search bands..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-knap-10 border-2 text-bono-10 hover:border-blue-600 border-gray-500 rounded-lg py-2 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base focus:outline-none focus:border-blue-600" />

        <select id="scene-select" onChange={(e) => setSelectedScene(e.target.value)} className="bg-bono-10 border-2 text-white hover:border-blue-600 border-gray-500 rounded-lg py-2 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base focus:outline-none focus:border-blue-600" aria-label="Select a scene">
          <option value="">All Scenes</option>
          <option value="Midgard">MIDGARD</option>
          <option value="Vanaheim">VANAHEIM</option>
          <option value="Jotunheim">JOTUNHEIM</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <ScheduleLoading width="400px" height="370px" />
            <ScheduleLoading width="400px" height="370px" />
            <ScheduleLoading width="400px" height="370px" />
          </>
        ) : (
          filteredBands.map((band) => (
            <div key={band.slug} className="relative max-w-sm mx-auto bg-knap-10 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-101 cursor-pointer">
              <Link href={`/bands/${band.slug}`} passHref>
                <div>
                  <div style={{ width: "400px", height: "370px", position: "relative" }}>
                    <Image src={band.logo.startsWith("http") ? band.logo : `/${band.logo}`} alt={`${band.name} logo`} layout="fill" objectFit="cover" />
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-bono-10">{band.name}</div>
                    <p className="text-bono-10">
                      Genre: {band.genre}
                      <br />
                      Time: {band.start} - {band.end} on {band.scene}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="absolute top-2 right-2">
                <button onClick={() => handleFavoriteClick(band)}>
                  <Image src={isBandFavorited(band.slug) ? "/heart-filled.svg" : "/heart-empty.svg"} alt="Favorite" width={32} height={32} />
                </button>
              </div>
            </div>
          ))
        )}
        {!loading && filteredBands.length === 0 && <p className="text-center text-white">No bands found.</p>}
      </div>
    </div>
  );
};

export default Schedule;
