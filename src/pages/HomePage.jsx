import React from "react";
import UFO from "../assets/UFO.png";
import "../App.css";

const HomePage = () => {
  return (
    <div className="HomePage">
      <h1>Welcome to the Crewmate Creator!</h1>
      <p>
        Here is where you can create your very own set of crewmates before
        sending them off into space!
      </p>

      <div className="home-image">
        <img src={UFO} alt="UFO spaceship" />
      </div>
    </div>
  );
};

export default HomePage;
