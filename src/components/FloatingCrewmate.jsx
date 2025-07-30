import React, { useState, useEffect } from "react";
import "./FloatingCrewmate.css";

import crewmate1 from "../assets/crewmate1.png";
import crewmate2 from "../assets/crewmate2.png";
import crewmate3 from "../assets/crewmate3.png";
import crewmate4 from "../assets/crewmate4.png";
import crewmate5 from "../assets/crewmate5.png";
import crewmate6 from "../assets/crewmate6.png";
import crewmate7 from "../assets/crewmate7.png";
import crewmate8 from "../assets/crewmate8.png";
import crewmate9 from "../assets/crewmate9.png";
import crewmate10 from "../assets/crewmate10.png";
import crewmate11 from "../assets/crewmate11.png";
import crewmate12 from "../assets/crewmate12.png";

const crewmateImages = [
  crewmate1,
  crewmate2,
  crewmate3,
  crewmate4,
  crewmate5,
  crewmate6,
  crewmate7,
  crewmate8,
  crewmate9,
  crewmate10,
  crewmate11,
  crewmate12,
];

const FloatingCrewmate = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [crewmate, setCrewmate] = useState({
    src: crewmateImages[0],
    top: "50%",
    key: 0,
  });

  useEffect(() => {
    const startAnimation = () => {
      const nextImageIndex = Math.floor(Math.random() * crewmateImages.length);
      const randomTop = `${Math.floor(Math.random() * 80) + 10}%`; // Random height from 10% to 90%

      setCrewmate((prev) => ({
        src: crewmateImages[nextImageIndex],
        top: randomTop,
        key: prev.key + 1,
      }));

      setIsAnimating(true);
    };

    startAnimation();

    const intervalId = setInterval(startAnimation, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="floating-crewmate-container">
      {isAnimating && (
        <img
          key={crewmate.key}
          src={crewmate.src}
          className="floating-crewmate"
          style={{ top: crewmate.top }}
          alt="A floating crewmate"
        />
      )}
    </div>
  );
};

export default FloatingCrewmate;
