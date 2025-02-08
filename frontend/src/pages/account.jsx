import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./account_style.css"; // Import the CSS file

const AccountPage = () => {
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    const storedDog = JSON.parse(localStorage.getItem("dogDetails"));
    if (storedDog) {
      setDog(storedDog);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("dogDetails");
    navigate("/");
  };

  return (
    <div className="accountPage">
        <nav className="navbar horizontal-navbar">
        <ul>
          <li><button onClick={() => navigate("/dailyCheckList")}>Daily Checklist</button></li>
        </ul>
      </nav>
      <h1 className="account-title">Your Dog's Profile</h1>
      {dog ? (
        <div className="dog-details">
          <p><strong>Name:</strong> {dog.name}</p>
          <p><strong>Breed:</strong> {dog.breed}</p>
          <p><strong>Age:</strong> {dog.age} years</p>
          <p><strong>Skills Learned:</strong> {dog.skillslearned.length > 0 ? dog.skillslearned.join(", ") : "None"}</p>
          <p><strong>Target Exam Date:</strong> {dog.targetGKCDate || "Not Set"}</p>
        </div>
      ) : (
        <p>No dog details found.</p>
      )}
      <div className="account-buttons">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AccountPage;
