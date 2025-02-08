import React from 'react';
import { Link } from 'react-router-dom';
import "./home_style.css";

const Home = () => {
  return (
    <div className="homePage">
      <header>
        <img src="/IMG_8174.PNG" alt="Pawtizens Logo" style={{ width: '100px', height: '100px' }} />
        <h1>Pawtizens</h1>
        <p>
          Welcome to Pawtizens' Home, where every wag and purr finds comfort, joy, and the path to becoming a Good Canine Citizen!
        </p>
      </header>

      <div>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Dog Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/dogInfo">Sign up</Link></p>
      </div>

      <div>Pawtizens™</div>
    </div>
  );
};

export default Home;
