import React from "react";
import Image from 'next/image'; 
import errorImage from '.../'; // Path to your error image

const Error404Page = () => {
  return (
    <div>
      <Image src={errorImage} alt="Error 404" width={500} height={400} />
      <h1 style={{ textAlign: 'center' }}>ERROR 404</h1>
    </div>
  );
};

export default Error404Page;
