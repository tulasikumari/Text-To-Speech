import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faHistory } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.style.backgroundColor = darkMode ? "white" : "gray";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  const handleSave = () => {
    navigate("/saved-translations");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <nav style={styles.navbar(darkMode)}>
      <div style={styles.logo} onClick={handleHome}>
        <h5>Textspeak App</h5>
      </div>
      <div style={styles.navActions}>
        <button onClick={handleSave} style={styles.actionButton(darkMode)}>
        <FontAwesomeIcon icon={faHistory} /> 
        </button>
        <button onClick={handleToggle} style={styles.toggleButton}>
          <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: (darkMode) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 3rem",
    backgroundColor: darkMode ? "#2e2e2e" : "#f0f0f0",
    color: darkMode ? "#fff" : "#000",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: darkMode ? "0 2px 10px rgba(0, 0, 0, 0.7)" : "0 2px 10px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  }),
  logo: {
    fontSize: "2rem",
    flex: "1",
    cursor: "pointer",
  },
  navActions: {
    display: "flex",
    gap: "1rem",
  },
  actionButton: (darkMode) => ({
    backgroundColor: darkMode ? "#444" : "#ddd", // Button color based on dark mode
    color: darkMode ? "#fff" : "#000", // Text color based on dark mode
    border: "none",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  }),
  toggleButton: {
    background: "none",
    border: "none",
    color: "inherit",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};

export default NavBar;
