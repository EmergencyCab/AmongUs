import React, { useState, useEffect } from "react";
import { getAllCrewmates } from "../utils/supabase";
import Card from "../components/Card";
import "../App.css";

const CrewmateGallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    try {
      setLoading(true);
      const data = await getAllCrewmates();
      setCrewmates(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching crewmates:", err);
      setError("Failed to load crewmates");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="CrewmateGallery">
        <h1>Your Crewmate Gallery!</h1>
        <div className="loading">Loading crewmates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="CrewmateGallery">
        <h1>Your Crewmate Gallery!</h1>
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchCrewmates}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="CrewmateGallery">
      <h1>Your Crewmate Gallery!</h1>

      {crewmates.length === 0 ? (
        <div className="empty-gallery">
          <h2>You haven't made a crewmate yet!</h2>
          <p>Create your first crewmate to get started!</p>
          <a href="/new" className="create-button">
            Create one here!
          </a>
        </div>
      ) : (
        <div className="gallery-container">
          {crewmates.map((crewmate) => (
            <Card
              key={crewmate.id}
              id={crewmate.id}
              name={crewmate.name}
              speed={crewmate.speed}
              color={crewmate.color}
              type="crewmate" // Default since we're not storing type yet
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CrewmateGallery;
