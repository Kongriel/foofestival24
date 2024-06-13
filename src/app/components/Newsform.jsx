import React from "react";

function Newsform() {
  return (
    <div className="pb-8 text-bono-10 p-8 md:mt-0 w-full md:w-auto">
      <h2 className="text-2xl font-bebas font-bold mb-4">TILMELD NYHEDSBREV</h2>
      <form>
        <div className="mb-4">
          <input type="text" className="w-96 bg-knap-10 p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500" placeholder="Navn*" />
        </div>
        <div className="mb-4">
          <input type="email" className="w-full  bg-knap-10 p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500" placeholder="E-mail*" />
        </div>
        <button type="submit" className="w-full p-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600">
          TILMELD NU
        </button>
      </form>
    </div>
  );
}

export default Newsform;
