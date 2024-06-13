"use client";
import React, { useState } from "react";
import Link from "next/link";

const PersonalInfo = () => {
  const [tickets, setTickets] = useState([{ name: "", email: "" }]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newTickets = [...tickets];
    newTickets[index][name] = value;
    setTickets(newTickets);
  };

  const validateForm = () => {
    const newErrors = [];
    tickets.forEach((ticket, index) => {
      const ticketErrors = {};
      if (!ticket.name) {
        ticketErrors.name = "Name is required";
      }
      if (!ticket.email) {
        ticketErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(ticket.email)) {
        ticketErrors.email = "Invalid email";
      }
      newErrors[index] = ticketErrors;
    });
    setErrors(newErrors);
    return newErrors.every((ticketErrors) => Object.keys(ticketErrors).length === 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form is valid", tickets);
    }
  };

  return (
    <div className="min-h-screen text-bono-10 flex flex-col items-center justify-center bg-gray-50 py-10">
      <h1 className="text-4xl font-bold mb-6">Personal Information</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {tickets.map((ticket, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ticket {index + 1} - Name</label>
            <input type="text" name="name" value={ticket.name} onChange={(e) => handleChange(index, e)} className="mt-1 p-2 w-full border border-gray-300 rounded" />
            {errors[index]?.name && <div className="text-red-500 text-sm">{errors[index].name}</div>}
            <label className="block text-sm font-medium text-gray-700 mt-4">Ticket {index + 1} - Email</label>
            <input type="email" name="email" value={ticket.email} onChange={(e) => handleChange(index, e)} className="mt-1 p-2 w-full border border-gray-300 rounded" />
            {errors[index]?.email && <div className="text-red-500 text-sm">{errors[index].email}</div>}
          </div>
        ))}
        <Link href="/checkout">
          <button type="submit" className="w-full p-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 mt-4">
            Next
          </button>
        </Link>
      </form>
    </div>
  );
};

export default PersonalInfo;
