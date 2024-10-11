import React, { useState } from "react";
import TwoMainButtons from "../atoms/Form/TwoMainButtons";

const HeroSection = () => {
  const videoSources = ["/assets/vd.mp4", "/assets/vd3.mp4"];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoSources.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        <video
          key={currentVideoIndex}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={videoSources[currentVideoIndex]}
          autoPlay
          muted
          onEnded={handleVideoEnd}
        />
      </div>
      <TwoMainButtons />
    </section>
  );
};

export default HeroSection;
