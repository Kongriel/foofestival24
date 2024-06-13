import React from "react";

function Herotekst() {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center mt-8 md:gap-6 text-center px-2 mb-14">
      <h1 className="font-bebas font-semibold text-bono-10 text-6xl md:text-8xl" style={{ transform: "scaleY(1.1)" }}>
        FooFest'24{" "}
      </h1>
      <p className="text-bono-10 font-montserrat text-xl ">
        Vi ses til dans, sang,
        <br />
        kærlighed og magi på
        <br />
        FooFest 2024!
      </p>
    </section>
  );
}

export default Herotekst;
