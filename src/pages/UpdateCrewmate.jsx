import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCrewmate, updateCrewmate, deleteCrewmate } from "../utils/supabase";
import "../App.css";

const UpdateCrewmate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    color: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    try {
      setLoading(true);
      const data = await getCrewmate(id);
      setFormData({
        name: data.name,
        speed: data.speed.toString(),
        color: data.color,
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching crewmate:", err);
      setError("Crewmate not found");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a name");
      return;
    }

    if (
      !formData.speed ||
      isNaN(formData.speed) ||
      parseFloat(formData.speed) <= 0
    ) {
      alert("Please enter a valid speed");
      return;
    }

    if (!formData.color) {
      alert("Please select a color");
      return;
    }

    setSaving(true);
    try {
      await updateCrewmate(id, {
        name: formData.name.trim(),
        speed: parseFloat(formData.speed),
        color: formData.color,
      });

      alert("Crewmate updated successfully!");
      navigate(`/gallery/details/${id}`);
    } catch (error) {
      console.error("Error updating crewmate:", error);
      alert("Error updating crewmate. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this crewmate? This action cannot be undone."
      )
    ) {
      setSaving(true);
      try {
        await deleteCrewmate(id);
        alert("Crewmate deleted successfully!");
        navigate("/gallery");
      } catch (error) {
        console.error("Error deleting crewmate:", error);
        alert("Error deleting crewmate. Please try again.");
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="UpdateCrewmate">
        <div className="loading">Loading crewmate...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="UpdateCrewmate">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/gallery")}>Back to Gallery</button>
        </div>
      </div>
    );
  }

  return (
    <div className="UpdateCrewmate">
      <h1>Update Your Crewmate :)</h1>

      <div className="current-info">
        <h3>Current Crewmate Info:</h3>
        <p>
          Name: {formData.name}, Speed: {formData.speed}, Color:{" "}
          {formData.color}
        </p>
      </div>

      <form onSubmit={handleUpdate} className="edit-form-container">
        <div className="form-card">
          <h3>Character Name</h3>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter character's name"
              disabled={saving}
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
              value={formData.speed}
              onChange={handleInputChange}
              placeholder="Enter speed in mph"
              step="0.1"
              min="0.1"
              disabled={saving}
            />
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
                  checked={formData.color === color}
                  onChange={handleInputChange}
                  disabled={saving}
                />
                <span className={`color-swatch swatch-${color}`}></span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/gallery/details/${id}`)}
            disabled={saving}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Updating..." : "Update Crewmate"}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={saving}
          >
            {saving ? "Deleting..." : "Delete Crewmate"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCrewmate;
