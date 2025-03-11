import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { getNearbyTrainers } from "../client/apiTrainer"; // Import the API function
import "./account_style.css"; // Import the CSS file

const AccountPage = () => {
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedDog = JSON.parse(localStorage.getItem("currentDog"));
    if (storedDog) {
      setDog(storedDog);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentDog");
    navigate("/");
  };

  const findNearbyTrainers = async () => {
    const zipCode = prompt("Enter your ZIP code:");
    if (!zipCode) return;

    try {
      const trainerData = await getNearbyTrainers(zipCode);
      setTrainers(trainerData);
      setError("");
    } catch (err) {
      setTrainers([]);
      setError(err.message);
    }
  };

  return (
    <div className="accountPage">
      <nav className="navbar horizontal-navbar">
        <ul>
          <li><button onClick={() => navigate("/planCheckList")}>Plan Checklist</button></li>
        </ul>
      </nav>

      <h1 className="account-title">Your Dog's Profile</h1>

      {dog ? (
        <div className="dog-details">
          <p><strong>Name:</strong> {dog.name}</p>
          <p><strong>Breed:</strong> {dog.breed}</p>
          <p><strong>Age:</strong> {dog.age} years</p>
          <p>
            <strong>Skills Learned:</strong>{" "}
            {dog?.skillslearned?.length ? dog.skillslearned.join(", ") : "None"}
          </p>
          <p><strong>Target Exam Date:</strong> {dog.targetCGCDate || "Not Set"}</p>
        </div>
      ) : (
        <p>No dog details found.</p>
      )}

      <div className="account-buttons">
        <button className="find-trainers-btn" onClick={findNearbyTrainers}>
          Find Nearby Trainers
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {trainers.length > 0 && (
        <div className="trainer-list">
          <h2>Nearby Trainers</h2>
          <ul>
            {trainers.map((trainer, index) => (
              <li key={index} className="trainer-card">
                <p><strong>Name:</strong> {trainer.name}</p>
                <p><strong>Specialty:</strong> {trainer.specialty}</p>
                <p><strong>Contact:</strong> {trainer.contact}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
