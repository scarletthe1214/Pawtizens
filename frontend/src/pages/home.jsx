import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./home_style.css";
import { getImage } from '../client/apiImage';

const Home = () => {
  const navigate = useNavigate();
  const [dogName, setDogName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState();

  useEffect(() => {
    getImage("4.png").then(data => {
      console.log(data);
      setLogo(data)
    });
  }, [])

  // Hash function using SHA-256
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Retrieve stored data from localStorage
    const storedData = localStorage.getItem("dogDetails");

    if (!storedData) {
      alert("No account found. Please sign up first.");
      return;
    }

    let dogAccounts;
    try {
      dogAccounts = JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing stored data:", error);
      alert("Something went wrong. Try again.");
      return;
    }

    if (!Array.isArray(dogAccounts)) {
      alert("Corrupt data found. Please re-register.");
      return;
    }

    // Hash the input password for comparison
    const hashedInputPassword = await hashPassword(password);

    // Find matching account
    const matchedDog = dogAccounts.find(
      (dog) => dog.name === dogName && dog.email === email
    );

    if (!matchedDog) {
      alert("Dog Name or Email not found. Please check your credentials.");
      return;
    }

    // Check if the password is correct
    if (matchedDog.password === hashedInputPassword) {
      alert("Login successful!");
      localStorage.setItem("currentDog", JSON.stringify(matchedDog)); // Store current session
      navigate("/account"); // Redirect to Account page
    } else {
      alert("Incorrect password. Try again.");
    }
  };

  return (
    <div className="homePage">
      <header>
        {/* <img src={logo} alt="Pawtizens Logo" style={{ width: '100px', height: '100px' }} /> */}
        <h1>Pawtizens</h1>
        <p>
          Welcome to Pawtizens' Home, where every wag and purr finds comfort, joy, and the path to becoming a Good Canine Citizen!
        </p>
      </header>

      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Dog Name" 
            value={dogName} 
            onChange={(e) => setDogName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/dogInfo">Sign up</Link></p>
      </div>

      <div>Pawtizens™</div>
    </div>
  );
};

export default Home;
