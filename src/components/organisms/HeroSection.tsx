import React, { useState } from "react";
import TwoMainButtons from "../atoms/Form/TwoMainButtons";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="assets/vd.mp4"
          autoPlay
          muted
        />
      </div>
      <TwoMainButtons />
    </section>
  );
};

export default HeroSection;
