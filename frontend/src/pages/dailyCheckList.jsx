import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dailyChecklist_style.css"; // Import the new style

const DailyChecklist = () => {
  const navigate = useNavigate();

  // AKC Canine Good Citizen 2nd Edition skill descriptions
  const skillDetails = {
    "Accepting a Friendly Stranger": `This test demonstrates that the dog will allow a friendly stranger to approach and greet the handler in a natural setting.<br />
    The dog should remain calm and not show shyness or aggression.`,

    "Sitting Politely for Petting": `The dog should sit calmly and allow a friendly stranger to pet them.<br />
    The dog may not jump or show excessive excitement.`,

    "Appearance and Grooming": `This test ensures the dog is comfortable being handled for grooming and veterinary exams.<br />
    The evaluator will check ears, paws, and general grooming without signs of aggression or fear.`,

    "Out for a Walk": `The dog must walk nicely on a leash without pulling.<br />
    The handler will demonstrate control by making turns and stopping, with the dog staying near their side.`,

    "Walking through a Crowd": `The dog should walk calmly through a group of people.<br />
    It should stay focused on the handler and not react to distractions.`,

    "Sit, Down and Stay": `The dog must respond to sit and down commands.<br />
    It should stay in position while the handler walks away and returns.`,

    "Recall": `The dog should come when called, even with distractions.<br />
    The handler will walk away, turn to face the dog, and call them to return.`,

    "Reaction to Another Dog": `The dog should stay calm when meeting another dog and handler.<br />
    It may show mild interest but should not lunge, bark, or pull on the leash.`,

    "Reaction to Distractions": `The dog should remain calm when faced with distractions.<br />
    These could include loud noises, joggers, or sudden sounds.`,

    "Supervised Separation": `The dog should remain calm when left with a trusted person for a short period.<br />
    The handler will leave the dog's sight while the evaluator monitors the dog's behavior.`
  };

  const [unlearnedSkills, setUnlearnedSkills] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    // Retrieve learned skills from localStorage
    const storedData = localStorage.getItem("dogDetails");
    if (!storedData) {
      console.error("No dog details found in localStorage.");
      return;
    }

    let dogDetails;
    try {
      dogDetails = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing dog details:", error);
      return;
    }

    const learnedSkills = Array.isArray(dogDetails.skillslearned) ? dogDetails.skillslearned : [];
    
    // Ensure filtering does not break if the stored data is corrupt
    const filteredSkills = Object.keys(skillDetails).filter(
      (skill) => !learnedSkills.includes(skill)
    );

    setUnlearnedSkills(filteredSkills);
  }, []);

  const toggleExpand = (skill) => {
    setExpanded((prev) => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleCheckboxChange = (skill) => {
    setCheckedItems((prev) => ({ ...prev, [skill]: !prev[skill] }));
  };

  const handleSave = () => {
    alert("Progress saved!");
  };

  return (
    <div className="dailyChecklistPage">
      <nav className="navbar horizontal-navbar">
        <ul>
          <li><button onClick={() => navigate("/dailyCheckList")}>Daily Checklist</button></li>
          <li><button onClick={() => navigate("/account")}>Account</button></li>
        </ul>
      </nav>

      <h1 className="dailyChecklistHeader">Daily Checklist</h1>

      {unlearnedSkills.length === 0 ? (
        <p>Your dog has already learned all the skills! 🎉</p>
      ) : (
        unlearnedSkills.map((skill) => (
          <div key={skill} className={`skill-container ${expanded[skill] ? "expanded" : ""}`}>
            <button className="skill-title" onClick={() => toggleExpand(skill)}>
              {expanded[skill] ? "▼" : "▶"} {skill}
            </button>
            <input
              type="checkbox"
              className="cute-checkbox"
              checked={checkedItems[skill] || false}
              onChange={() => handleCheckboxChange(skill)}
            />
            {expanded[skill] && skillDetails[skill] && (
              <p className="skill-description" dangerouslySetInnerHTML={{ __html: skillDetails[skill] }} />
            )}
          </div>
        ))
      )}

      {/* Buttons */}
      <div className="dailyChecklist-buttons">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="back-btn" onClick={() => navigate("/account")}>Go Back</button>
      </div>
    </div>
  );
};

export default DailyChecklist;