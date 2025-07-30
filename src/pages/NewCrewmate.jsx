import React, { useState, useEffect } from "react";
import { createCrewmate } from "../utils/supabase";
import crewmateImg from "../assets/crewmate.png";
import imposterImg from "../assets/imposter.png";
import "../App.css";

const NewCrewmate = () => {
  const [crewmate, setCrewmate] = useState({
    name: "",
    speed: "",
    color: "",
    type: "crewmate",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (crewmate.type === "imposter") {
      setCrewmate((prev) => ({ ...prev, speed: "3" }));
    }
  }, [crewmate.type]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCrewmate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createCrewmateHandler = async (event) => {
    event.preventDefault();

    // Validation
    if (!crewmate.name.trim()) {
      alert("Please enter a name for your crewmate");
      return;
    }

    if (
      !crewmate.speed ||
      isNaN(crewmate.speed) ||
      parseFloat(crewmate.speed) <= 0
    ) {
      alert("Please enter a valid speed");
      return;
    }

    if (!crewmate.color) {
      alert("Please select a color");
      return;
    }

    setLoading(true);
    try {
      await createCrewmate({
        name: crewmate.name,
        speed: parseFloat(crewmate.speed),
        color: crewmate.color,
        // Note: We're not storing 'type' in the database for now
        // but you can add it to your database schema if needed
      });

      alert("Crewmate created successfully!");
      window.location = "/gallery";
    } catch (error) {
      console.error("Error creating crewmate:", error);
      alert("Error creating crewmate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="NewCrewmate">
      <h1>Create a Character</h1>

      <div className="type-selector">
        <label
          className={`type-option ${
            crewmate.type === "crewmate" ? "crewmate-selected" : ""
          }`}
        >
          <input
            type="radio"
            name="type"
            value="crewmate"
            checked={crewmate.type === "crewmate"}
            onChange={handleChange}
          />
          <img src={crewmateImg} alt="Select Crewmate" />
        </label>
        <label
          className={`type-option ${
            crewmate.type === "imposter" ? "imposter-selected" : ""
          }`}
        >
          <input
            type="radio"
            name="type"
            value="imposter"
            checked={crewmate.type === "imposter"}
            onChange={handleChange}
          />
          <img src={imposterImg} alt="Select Imposter" />
        </label>
      </div>

      <form className="edit-form-container">
        <div className="form-card">
          <h3>Character Name</h3>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={crewmate.name}
              onChange={handleChange}
              placeholder="Enter character's name"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-card">
          <h3>Attributes</h3>
          <div className="form-group">
            <label htmlFor="speed">Speed (mph):</label>
            <input
              type="number"
              id="speed"
              name="speed"
              className="form-input"
              value={crewmate.speed}
              onChange={handleChange}
              placeholder={
                crewmate.type === "imposter"
                  ? "Locked for Imposters"
                  : "Enter speed in mph"
              }
              disabled={crewmate.type === "imposter" || loading}
              step="0.1"
              min="0.1"
            />
            {crewmate.type === "imposter" && (
              <p className="help-text">
                Speed drops to 1 mph when lights are off.
              </p>
            )}
          </div>
        </div>

        <div className="form-card">
          <h3>Choose a Color</h3>
          <div className="color-options-container">
            {[
              "red",
              "green",
              "blue",
              "purple",
              "yellow",
              "orange",
              "pink",
              "rainbow",
            ].map((color) => (
              <label className="color-option" key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={crewmate.color === color}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className={`color-swatch swatch-${color}`}></span>
              </label>
            ))}
          </div>
        </div>
      </form>

      <button type="submit" onClick={createCrewmateHandler} disabled={loading}>
        {loading ? "Creating..." : "Create Character"}
      </button>
    </div>
  );
};

export default NewCrewmate;
