"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LiveLoading from "./LiveLoading";

// Helper function to get the current time in "HH:mm" format
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

// Helper function to find the current and next act
const findCurrentAndNextAct = (schedule) => {
  const currentTime = getCurrentTime();

  // Find the current and next act for each stage
  return Object.entries(schedule).map(([stage, days]) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" }).toLowerCase();
    const acts = days[today];

    let currentAct = null;
    let nextAct = null;

    if (acts) {
      for (let i = 0; i < acts.length; i++) {
        const act = acts[i];
        if (currentTime >= act.start && currentTime < act.end) {
          currentAct = act;
          nextAct = acts[i + 1] || null;
          break;
        } else if (currentTime < act.start) {
          nextAct = acts[i];
          break;
        }
      }
    }

    return { stage, currentAct, nextAct };
  });
};

const LiveNow = () => {
  const [schedule, setSchedule] = useState({});
  const [bands, setBands] = useState([]);
  const [liveActs, setLiveActs] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [loadingBands, setLoadingBands] = useState(true);

  useEffect(() => {
    fetch("https://winter-frill-lemon.glitch.me/schedule")
      .then((response) => response.json())
      .then((data) => {
        setLoadingSchedule(false);
        setSchedule(data);
        setLiveActs(findCurrentAndNextAct(data));
      })
      .catch((error) => {
        setLoadingSchedule(false);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetch("https://winter-frill-lemon.glitch.me/bands")
      .then((response) => response.json())
      .then((data) => {
        setLoadingBands(false);
        setBands(data);
      })
      .catch((error) => {
        setLoadingBands(false);
        setError(error.message);
      });
  }, []);

  const getBandLogo = (bandName) => {
    const band = bands.find((band) => band.name === bandName);
    return band ? band.logo : null;
  };

  const formatLogoUrl = (url) => {
    if (url.startsWith("http")) {
      return url;
    }
    return `/${url}`;
  };

  const isLoading = loadingSchedule || loadingBands;

  return (
    <div className="min-h-screen text-bono-10 flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold mb-8">Who's Live Now</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-10/12 max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <>
            <LiveLoading width="w-full" height="h-72" extraClass="p-6 rounded-lg shadow-lg" />
            <LiveLoading width="w-full" height="h-72" extraClass="p-6 rounded-lg shadow-lg" />
            <LiveLoading width="w-full" height="h-72" extraClass="p-6 rounded-lg shadow-lg" />
          </>
        ) : (
          liveActs.map(({ stage, currentAct, nextAct }) => (
            <div key={stage} className="bg-knap-10 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">{stage}</h2>
              {currentAct ? (
                <div className="mb-4">
                  <h3 className="text-xl mb-2">Now Playing</h3>
                  <p className="text-lg">{currentAct.act}</p>
                  <p className="text-sm mb-2">
                    {currentAct.start} - {currentAct.end}
                  </p>
                  {getBandLogo(currentAct.act) && (
                    <div className="relative w-full h-48 mb-4">
                      <Image src={formatLogoUrl(getBandLogo(currentAct.act))} alt={currentAct.act} layout="fill" objectFit="cover" className="rounded-lg" />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-lg mb-4">No act is playing right now.</p>
              )}
              {nextAct ? (
                <div>
                  <h3 className="text-xl mb-2">Next Up</h3>
                  <p className="text-lg">{nextAct.act}</p>
                  <p className="text-sm mb-2">
                    {nextAct.start} - {nextAct.end}
                  </p>
                  {getBandLogo(nextAct.act) && (
                    <div className="relative w-full h-48">
                      <Image src={formatLogoUrl(getBandLogo(nextAct.act))} alt={nextAct.act} layout="fill" objectFit="cover" className="rounded-lg" />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-lg">No upcoming acts.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveNow;
