import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dogInfo_style.css";

function DogInfoForm() {
  const navigate = useNavigate();

  const [dogData, setDogData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    breed: "",
    skillslearned: [],
    targetGKCDate: "",
  });

  const skillsOptions = [
    "Accepting a Friendly Stranger",
    "Sitting Politely for Petting",
    "Appearance and Grooming",
    "Out for a Walk",
    "Walking through a Crowd",
    "Sit, Down and Stay",
    "Recall",
    "Reaction to Another Dog",
    "Reaction to Distractions",
    "Supervised Separation",
    "No previous skills"
  ];

  const handleSkillAdd = (skill) => {
    setDogData((prevData) => ({
      ...prevData,
      skillslearned: prevData.skillslearned.includes(skill)
        ? prevData.skillslearned
        : [...prevData.skillslearned, skill],
    }));
  };

  const handleSkillRemove = (skill) => {
    setDogData((prevData) => ({
      ...prevData,
      skillslearned: prevData.skillslearned.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("dogDetails", JSON.stringify(dogData));
    console.log("Dog Details Submitted: ", dogData);
    navigate("/account"); 
  };

  const handleReset = () => {
    setDogData({ email: "", password: "", name: "", age: "", breed: "", skillslearned: [], targetGKCDate: "" });
  };

  return (
    <div className="dogInfoPage">
      <div className="dogForm">
        <h2>Input Dog Details</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={dogData.email} onChange={(e) => setDogData({ ...dogData, email: e.target.value })} required />

          <label>Password:</label>
          <input type="text" name="password" value={dogData.password} onChange={(e) => setDogData({ ...dogData, password: e.target.value })} required />

          <label>Dog Name:</label>
          <input type="text" name="name" value={dogData.name} onChange={(e) => setDogData({ ...dogData, name: e.target.value })} required />
          
          <label>Age:</label>
          <input type="text" name="age" value={dogData.age} onChange={(e) => setDogData({ ...dogData, age: e.target.value })} required />
          
          <label>Breed:</label>
          <input type="text" name="breed" value={dogData.breed} onChange={(e) => setDogData({ ...dogData, breed: e.target.value })} required />
          
          <label>Skills Learned:</label>
          <div className="skills-container">
            {dogData.skillslearned.map((skill) => (
              <span key={skill} className="skill-item" onClick={() => handleSkillRemove(skill)}>
                {skill} ✖
              </span>
            ))}
          </div>
          
          <div className="skills-dropdown">
            <select onChange={(e) => handleSkillAdd(e.target.value)} className="skill-select">
              <option value="" disabled selected>Select a skill</option>  
              {skillsOptions.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <label>Target GKC Date:</label>
          <input type="date" name="targetGKCDate" value={dogData.targetGKCDate} onChange={(e) => setDogData({ ...dogData, targetGKCDate: e.target.value })} required />
          
          <div>
            <button type="submit">Add Pet</button>
            <button type="button" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DogInfoForm;
