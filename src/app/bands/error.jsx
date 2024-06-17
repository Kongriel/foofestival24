"use client";
import React from "react";
import Image from "next/image";

const Error404Page = () => {
  return (
    <div>
      <Image src="/404.png" alt="Error 404" width={500} height={400} />
      <h1 style={{ textAlign: "center" }}>ERROR 404</h1>
    </div>
  );
};

export default Error404Page;
