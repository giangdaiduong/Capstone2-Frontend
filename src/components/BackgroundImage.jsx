import React from 'react';
import Background from '../assets/background.png';
const BackgroundImage = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <h1 className="text-4xl font-bold text-white">IDEAX</h1>
    </div>
  );
};

export default BackgroundImage;
