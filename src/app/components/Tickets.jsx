"use client";
import React, { useState, useEffect, useRef } from "react";

const Tickets = () => {
  const [campingOptions, setCampingOptions] = useState([]);
  const [reservationId, setReservationId] = useState(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const timerRef = useRef(null);
  const [isCampingAvailable, setIsCampingAvailable] = useState(true);
  const [regularTickets, setRegularTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [greenCamping, setGreenCamping] = useState(false);
  const [tent2Person, setTent2Person] = useState(0);
  const [tent3Person, setTent3Person] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    // Retrieve ticket details from local storage
    const ticketDetails = JSON.parse(localStorage.getItem("selectedTicket"));
    if (ticketDetails) {
      if (ticketDetails.ticketType === "regular") {
        setRegularTickets(1);
      } else if (ticketDetails.ticketType === "VIP") {
        setVipTickets(1);
      }
      localStorage.removeItem("selectedTicket");
    }

    const fetchCampingOptions = async () => {
      try {
        const response = await fetch("https://winter-frill-lemon.glitch.me/available-spots");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCampingOptions(data);
        setIsCampingAvailable(data.some((option) => option.available > 0));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCampingOptions();
  }, []);

  useEffect(() => {
    if (reservationId && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      releaseSpot();
    }

    return () => clearInterval(timerRef.current);
  }, [reservationId, timeLeft]);

  const reserveSpot = async () => {
    const payload = {
      area: selectedOption,
      amount: regularTickets + vipTickets,
      name,
      email,
      phoneNumber,
    };

    try {
      const response = await fetch("https://winter-frill-lemon.glitch.me/reserve-spot", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setReservationId(data.id);
      setTimeLeft(300); // Reset timer to 5 minutes
    } catch (error) {
      setError(error.message);
    }
  };

  const releaseSpot = async () => {
    try {
      const response = await fetch("https://winter-frill-lemon.glitch.me/release-spot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: reservationId,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setReservationId(null);
      setTimeLeft(0);
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmReservation = async () => {
    try {
      const response = await fetch("https://winter-frill-lemon.glitch.me/fullfill-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: reservationId,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setReservationConfirmed(true);
      clearInterval(timerRef.current);
      window.location.href = "/checkout";
    } catch (error) {
      setError(error.message);
    }
  };

  const calculateTotalCost = () => {
    const regularCost = regularTickets * 799;
    const vipCost = vipTickets * 1299;
    const campingCost = greenCamping ? 249 : 0;
    const tent2Cost = tent2Person * 299;
    const tent3Cost = tent3Person * 399;
    const bookingFee = 99;

    return regularCost + vipCost + campingCost + tent2Cost + tent3Cost + bookingFee;
  };

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regularTickets === 0 && vipTickets === 0) {
      errors.tickets = "At least one ticket must be selected.";
    }
    if (!selectedOption) {
      errors.camping = "A camping spot must be selected.";
    } else {
      const selectedCampingOption = campingOptions.find((option) => option.area === selectedOption);
      if (selectedCampingOption) {
        if (selectedCampingOption.available === 0) {
          errors.camping = "Selected camping spot is not available.";
        } else if (regularTickets + vipTickets > selectedCampingOption.available) {
          errors.camping = `Selected camping spot only has ${selectedCampingOption.available} spots available.`;
        }
      }
    }
    if (!name) {
      errors.name = "Name is required.";
    } else if (!nameRegex.test(name)) {
      errors.name = "Name should contain only letters.";
    }
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextClick = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const totalCost = calculateTotalCost();
      const queryString = new URLSearchParams({
        regularTickets,
        vipTickets,
        selectedOption,
        greenCamping,
        tent2Person,
        tent3Person,
        name,
        email,
        phoneNumber,
        totalCost,
      }).toString();

      await reserveSpot();
      window.location.href = `/checkout?${queryString}`;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen text-bono-10 flex flex-col items-center px-4 justify-center py-10">
      <h1 className="text-4xl text-bono-10 text-center font-bold mt-4 mb-8">Buy Tickets to FooFest'24</h1>
      {error && typeof error === "string" && <div className="text-red-500 mb-4">{error}</div>}
      {error && typeof error === "object" && (
        <div className="text-red-500 mb-4">
          {Object.values(error).map((errMsg, index) => (
            <div key={index}>{errMsg}</div>
          ))}
        </div>
      )}
      <form className="bg-knap-10 p-8 sm:p-16 rounded-lg shadow-lg w-full max-w-2xl" onSubmit={handleNextClick}>
        <fieldset className="mb-5">
          <legend className="text-lg font-semibold -mt-4 mb-2">Ticket Type</legend>
          <div className="mb-1 w-full flex justify-between items-center">
            <label className="text-base sm:text-lg text-bono-10">Regular Tickets (799,-)</label>
            <div className="flex items-center">
              <button type="button" onClick={() => setRegularTickets(Math.max(regularTickets - 1, 0))} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{regularTickets}</div>
              <button type="button" onClick={() => setRegularTickets(regularTickets + 1)} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          <div className=" w-full flex justify-between items-center">
            <label className="text-base sm:text-lg text-bono-10">VIP Tickets (1299,-)</label>
            <div className="flex items-center">
              <button type="button" onClick={() => setVipTickets(Math.max(vipTickets - 1, 0))} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{vipTickets}</div>
              <button type="button" onClick={() => setVipTickets(vipTickets + 1)} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          {error && error.tickets && <div className="text-red-500 mb-4 w-full text-center">{error.tickets}</div>}
        </fieldset>

        <fieldset className="mb-2">
          <legend className="text-lg font-semibold mb-2">Camping Options</legend>
          <div className="mb-2 w-full flex justify-between items-center">
            <label className="text-base sm:text-lg text-bono-10">Prebook Camping Spot</label>
            <select id="area-select" aria-label="select-area" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="p-1 sm:p-2 border border-gray-300 rounded w-52 text-base sm:text-md">
              <option value="">Select Camping Area</option>
              {campingOptions.map((option) => (
                <option key={option.area} value={option.area}>
                  {option.area} ({option.available} available spots)
                </option>
              ))}
            </select>
          </div>
          {error && error.camping && <div className="text-red-500 mb-4 w-full text-center">{error.camping}</div>}
          <div className="mb-6 w-full flex justify-between items-center">
            <label className="text-base sm:text-lg text-bono-10">Green Camping (249,-)</label>
            <input type="checkbox" aria-label="checkbox" checked={greenCamping} onChange={(e) => setGreenCamping(e.target.checked)} className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="text-lg font-semibold mb-2">Tents</legend>
          <div className="mb-1 w-full flex justify-between items-center">
            <label className="text-base sm:text-lg text-bono-10">2 Person Tent (299,- each)</label>
            <div className="flex items-center">
              <button type="button" onClick={() => setTent2Person(Math.max(tent2Person - 1, 0))} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{tent2Person}</div>
              <button type="button" onClick={() => setTent2Person(tent2Person + 1)} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
          <div className="mb-2 w-full flex justify-between items-center">
            <label className="text-base sm:text-lg text-bono-10">3 Person Tent (399,- each)</label>
            <div className="flex items-center">
              <button type="button" onClick={() => setTent3Person(Math.max(tent3Person - 1, 0))} className="px-3 py-1 bg-gray-300 rounded-l text-xl">
                -
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300">{tent3Person}</div>
              <button type="button" onClick={() => setTent3Person(tent3Person + 1)} className="px-3 py-1 bg-gray-300 rounded-r text-xl">
                +
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset className="mb-1">
          <legend className="text-lg font-semibold mb-2">Personal Information</legend>
          <div className="mb-2 w-full">
            <label className="text-base sm:text-lg text-bono-10">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="p-2 border bg-knap border-gray-300 rounded w-full text-base sm:text-lg" />
          </div>
          {error && error.name && <div className="text-red-500 mb-4 w-full text-center">{error.name}</div>}
          <div className="mb-6 w-full">
            <label className="text-base sm:text-lg text-bono-10">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="p-2 border border-gray-300 rounded w-full text-base sm:text-lg" />
          </div>
          {error && error.email && <div className="text-red-500 mb-4 w-full text-center">{error.email}</div>}
          <div className="mb-6 w-full">
            <label className="text-base sm:text-lg text-bono-10">Phone Number</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" className="p-2 border border-gray-300 rounded w-full text-base sm:text-lg" />
          </div>
          {error && error.phoneNumber && <div className="text-red-500 mb-4 w-full text-center">{error.phoneNumber}</div>}
        </fieldset>

        <div className="mb-6 w-full">
          <p className="text-lg font-bold">Total Cost: {calculateTotalCost()},-</p>
          <p className="text-sm text-gray-500">* Includes a fixed booking fee of 99,-</p>
        </div>
        {reservationId && timeLeft > 0 && <p className="text-red-500 mb-4">You have {formatTime(timeLeft)} to complete your reservation.</p>}
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700" disabled={!isCampingAvailable}>
          Next
        </button>
      </form>
    </div>
  );
};

export default Tickets;
