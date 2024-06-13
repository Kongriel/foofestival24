"use client";
import React, { useEffect, useState } from "react";

// Helper function to get the current time in "HH:mm" format
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

// Helper function to find the current act
const findCurrentAct = (schedule) => {
  const currentTime = getCurrentTime();

  // Find the current act for each stage
  return Object.entries(schedule).map(([stage, days]) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" }).toLowerCase();
    const acts = days[today];

    let currentAct = null;

    if (acts) {
      for (let i = 0; i < acts.length; i++) {
        const act = acts[i];
        if (currentTime >= act.start && currentTime < act.end) {
          currentAct = act;
          break;
        }
      }
    }

    return { stage, currentAct };
  });
};

const LiveNow = () => {
  const [schedule, setSchedule] = useState({});
  const [liveActs, setLiveActs] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  useEffect(() => {
    fetch("https://winter-frill-lemon.glitch.me/schedule")
      .then((response) => response.json())
      .then((data) => {
        setLoadingSchedule(false);
        setSchedule(data);
        setLiveActs(findCurrentAct(data));
      })
      .catch((error) => {
        setLoadingSchedule(false);
        setError(error.message);
      });
  }, []);

  const isLoading = loadingSchedule;

  return (
    <div className=" text-bono-10 flex flex-col items-center justify-center py-10">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-8/12 max-w-7xl">
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">Who is playing right now?</h2>
          <p className="text-lg font-semibold text-blue-600 mb-2">Current Time: {getCurrentTime()}</p>
          <div className="text-2xl font-bold mb-4">16:00 - 18:00</div>
          <div className="text-left">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              liveActs.map(({ stage, currentAct }) => (
                <div key={stage}>
                  {currentAct ? (
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-blue-600 text-lg">{currentAct.act}</p>
                      <p className="text-gray-600">{stage}</p>
                    </div>
                  ) : (
                    <p className="text-lg mb-4">No act is playing right now.</p>
                  )}
                  <hr className="my-2" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNow;
