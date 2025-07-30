import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCrewmate, deleteCrewmate } from "../utils/supabase";
import crewmateOutline from "../assets/crewmate-outline.png";
import "../App.css";

const CrewmateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    try {
      setLoading(true);
      const data = await getCrewmate(id);
      setCrewmate(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching crewmate:", err);
      setError("Crewmate not found");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this crewmate?")) {
      try {
        await deleteCrewmate(id);
        alert("Crewmate deleted successfully!");
        navigate("/gallery");
      } catch (error) {
        console.error("Error deleting crewmate:", error);
        alert("Error deleting crewmate. Please try again.");
      }
    }
  };

  const getSpeedComment = (speed) => {
    if (speed < 1) return "This one is quite slow 🐌";
    if (speed < 3)
      return "You may want to find a Crewmate with more speed, this one is kind of slow 😐";
    if (speed < 5) return "This Crewmate has decent speed! ⚡";
    return "This Crewmate is super fast! 🚀";
  };

  if (loading) {
    return (
      <div className="CrewmateDetails">
        <div className="loading">Loading crewmate details...</div>
      </div>
    );
  }

  if (error || !crewmate) {
    return (
      <div className="CrewmateDetails">
        <div className="error">
          <h2>Crewmate Not Found</h2>
          <p>The crewmate you're looking for doesn't exist.</p>
          <Link to="/gallery" className="back-button">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="CrewmateDetails">
      <div className="detail-container">
        <h1>Crewmate: {crewmate.name}</h1>

        <div className={`detail-avatar color-${crewmate.color}`}>
          <img
            src={crewmateOutline}
            alt="crewmate outline"
            className="crewmate-outline-large"
          />
        </div>

        <div className="stats-container">
          <h2>Stats:</h2>
          <div className="stat-item">
            <strong>Color:</strong> {crewmate.color}
          </div>
          <div className="stat-item">
            <strong>Speed:</strong> {crewmate.speed} mph
          </div>

          <div className="speed-indicator">
            <p>{getSpeedComment(crewmate.speed)}</p>
          </div>
        </div>

        <p className="edit-prompt">Wanna edit this Crewmate?</p>

        <div className="action-buttons">
          <Link to="/gallery" className="btn btn-secondary">
            Back to Gallery
          </Link>
          <Link to={`/edit/${crewmate.id}`} className="btn btn-primary">
            Edit Crewmate
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Crewmate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrewmateDetails;
