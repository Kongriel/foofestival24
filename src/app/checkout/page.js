"use client";
import React, { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const [reservationId, setReservationId] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [regularTickets, setRegularTickets] = useState(null);
  const [vipTickets, setVipTickets] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [greenCamping, setGreenCamping] = useState(null);
  const [tent2Person, setTent2Person] = useState(null);
  const [tent3Person, setTent3Person] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      setReservationId(queryParams.get("reservationId"));
      setTotalCost(queryParams.get("totalCost"));
      setName(queryParams.get("name"));
      setEmail(queryParams.get("email"));
      setPhoneNumber(queryParams.get("phoneNumber"));
      setRegularTickets(parseInt(queryParams.get("regularTickets")));
      setVipTickets(parseInt(queryParams.get("vipTickets")));
      setSelectedOption(queryParams.get("selectedOption"));
      setGreenCamping(queryParams.get("greenCamping") === "true");
      setTent2Person(parseInt(queryParams.get("tent2Person")));
      setTent3Person(parseInt(queryParams.get("tent3Person")));
    }
  }, []);

  const nameRef = useRef();
  const numberRef = useRef();
  const expiryRef = useRef();
  const cvcRef = useRef();
  const submitButtonRef = useRef();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));

    if (name === "number" && value.length === 16) {
      expiryRef.current.focus();
    } else if (name === "expiry" && value.length === 4) {
      cvcRef.current.focus();
    } else if (name === "cvc" && value.length === 3) {
      submitButtonRef.current.focus();
    }
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleInputBlur = () => {
    setState((prev) => ({ ...prev, focus: "" }));
  };

  const handleNumberKeyPress = (evt) => {
    if (!/[0-9]/.test(evt.key)) {
      evt.preventDefault();
    }
  };

  const handleNameKeyPress = (evt) => {
    if (/[0-9]/.test(evt.key)) {
      evt.preventDefault();
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
      setShowPopup(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 7000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (state.name && state.number.length === 16 && state.expiry.length === 4 && state.cvc.length === 3) {
      confirmReservation();
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-4xl font-bebas text-bono-10 font-bold mb-8">Payment Information</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="scale-125 mb-8 md:mb-0">
          <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
        </div>
        <form className="p-6 w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input type="text" name="name" placeholder="Name" value={state.name} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} onKeyPress={handleNameKeyPress} ref={nameRef} className="w-full px-3 py-3 rounded-md bg-knap-10 text-bono-10 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="number">
              Card Number
            </label>
            <input type="text" name="number" placeholder="Card Number" value={state.number} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} onKeyPress={handleNumberKeyPress} ref={numberRef} className="w-full px-3 py-3 bg-knap-10 text-bono-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" inputMode="numeric" pattern="[0-9]*" maxLength="16" required />
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="expiry">
                Expiration (mm/yy)
              </label>
              <input type="text" name="expiry" placeholder="MM/YY" value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} onKeyPress={handleNumberKeyPress} ref={expiryRef} className="w-full px-3 py-3 bg-knap-10 rounded-md text-bono-10 focus:outline-none focus:ring-2 focus:ring-blue-500" inputMode="numeric" pattern="[0-9]*" maxLength="4" required />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="cvc">
                Security Code
              </label>
              <input type="text" name="cvc" placeholder="CVC" value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} onKeyPress={handleNumberKeyPress} ref={cvcRef} className="w-full px-3 py-3 rounded-md bg-knap-10 text-bono-10 focus:outline-none focus:ring-2 focus:ring-blue-500" inputMode="numeric" pattern="[0-9]*" maxLength="3" required />
            </div>
          </div>
          <button ref={submitButtonRef} type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
            Pay {totalCost} DKK
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-3xl text-bono-10 font-bold mb-4">Receipt</h2>
            <p className="text-lg text-bono-10 mb-4">Thank you for your purchase!</p>
            <p className="text-lg text-bono-10 mb-4">You will be forwarded an Email reciept!</p>
            <div className="text-left text-bono-10">
              <p>
                <strong>Reservation ID:</strong> {reservationId}
              </p>
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone Number:</strong> {phoneNumber}
              </p>
              {regularTickets > 0 && (
                <p>
                  <strong>Regular Tickets:</strong> {regularTickets}
                </p>
              )}
              {vipTickets > 0 && (
                <p>
                  <strong>VIP Tickets:</strong> {vipTickets}
                </p>
              )}
              {selectedOption && (
                <p>
                  <strong>Camping Spot:</strong> {selectedOption}
                </p>
              )}
              {greenCamping && (
                <p>
                  <strong>Green Camping:</strong> Yes
                </p>
              )}
              {tent2Person > 0 && (
                <p>
                  <strong>2 Person Tent:</strong> {tent2Person}
                </p>
              )}
              {tent3Person > 0 && (
                <p>
                  <strong>3 Person Tent:</strong> {tent3Person}
                </p>
              )}
              <p>
                <strong>Total Cost:</strong> {totalCost} DKK
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
