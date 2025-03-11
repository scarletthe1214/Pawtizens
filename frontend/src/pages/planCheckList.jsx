import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrainingPlan } from "../client/apiPlan"; 
import { getDemoVideo } from "../client/apiVideo"; 
import "./planCheckList_style.css";

const PlanChecklist = () => {
  const navigate = useNavigate();
  const [trainingPlan, setTrainingPlan] = useState([]); // Store the full training plan
  const [checkedItems, setCheckedItems] = useState(() => {
    const storedChecked = localStorage.getItem("checkedItems");
    return storedChecked ? JSON.parse(storedChecked) : {};
  });
  const [expanded, setExpanded] = useState({});
  const [error, setError] = useState(null);

  // Skill descriptions
  const skillDetails = {
    "Accepting a Friendly Stranger": "The dog allows a friendly stranger to approach and greet the handler. (0:20)",
    "Sitting Politely for Petting": "The dog should sit calmly and allow a friendly stranger to pet them.",
    "Appearance and Grooming": "Ensures the dog is comfortable being handled for grooming and veterinary exams. (0:54)",
    "Out for a Walk": "The dog must walk nicely on a leash without pulling.",
    "Walking through a Crowd": "The dog should walk calmly through a group of people.",
    "Sit, Down and Stay": "The dog must respond to sit and down commands. (2:00)",
    "Recall": "The dog should come when called, even with distractions.",
    "Reaction to Another Dog": "The dog should stay calm when meeting another dog and handler. (3:23)",
    "Reaction to Distractions": "The dog should remain calm when faced with distractions.",
    "Supervised Separation": "The dog should remain calm when left with a trusted person for a short period."
  };

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      const storedData = localStorage.getItem("currentDog");
      if (!storedData) {
        setError("No current dog data found.");
        return;
      }

      let dogDetails;
      try {
        dogDetails = JSON.parse(storedData);
      } catch (error) {
        setError("Error loading dog details.");
        return;
      }

      const targetDate = dogDetails.targetDate || "2025-06-01";

      try {
        const trainingPlanData = await getTrainingPlan(targetDate);

        if (!Array.isArray(trainingPlanData) || trainingPlanData.length === 0) {
          setError("No training plan available.");
          return;
        }

        setTrainingPlan(trainingPlanData);

      } catch (err) {
        setError("Failed to fetch training plan.");
      }
    };

    fetchTrainingPlan();
  }, []);

  const toggleExpand = (skill) => {
    setExpanded((prev) => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleCheckboxChange = (skill) => {
    setCheckedItems((prev) => {
      const updatedCheckedItems = { ...prev, [skill]: !prev[skill] };
      localStorage.setItem("checkedItems", JSON.stringify(updatedCheckedItems));
      return updatedCheckedItems;
    });
  };

  const fetchDemoVideo = async (skillName) => {
    try {
      const data = await getDemoVideo(skillName);
      if (data.success) {
        window.open(data.video_link, "_blank"); // Open YouTube link in a new tab
      }
    } catch (error) {
      alert("Failed to fetch demo video. Please try again.");
    }
  };

  return (
    <div className="planChecklistPage">
      <nav className="navbar horizontal-navbar">
        <ul>
          <li><button onClick={() => navigate("/planCheckList")}>Plan Checklist</button></li>
          <li><button onClick={() => navigate("/account")}>Account</button></li>
        </ul>
      </nav>

      <h1 className="planChecklistHeader">Training Plan</h1>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : trainingPlan.length === 0 ? (
        <p>Loading training plan...</p>
      ) : (
        trainingPlan.map((task) => (
          <div key={task.date} className={`skill-container ${expanded[task.task] ? "expanded" : ""}`}>
            <button className="skill-title" onClick={() => toggleExpand(task.task)}>
              {expanded[task.task] ? "▼" : "▶"} {task.task} ({task.date})
            </button>
            <input
              type="checkbox"
              className="cute-checkbox"
              checked={checkedItems[task.task] || false}
              onChange={() => handleCheckboxChange(task.task)}
            />
            {expanded[task.task] && (
              <>
                <p className="skill-description">{skillDetails[task.task]}</p>
                <button className="watch-demo-btn" onClick={() => fetchDemoVideo(task.task)}>
                  🎥 Watch Demo
                </button>
              </>
            )}
          </div>
        ))
      )}

      <div className="planChecklist-buttons">
        <button className="save-btn" onClick={() => alert("Progress saved!")}>Save</button>
        <button className="back-btn" onClick={() => navigate("/account")}>Go Back</button>
      </div>
    </div>
  );
};

export default PlanChecklist;
