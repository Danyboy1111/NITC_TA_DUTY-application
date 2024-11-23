import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';

function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminClick = () => {
        setShowPopup(true); // Show popup when Admin Login is clicked
    };

    const handlePasswordSubmit = () => {
        if (password === 'admin@nitc') {
            navigate('/map'); // Navigate to <Map /> if password matches
        } else {
            alert('Incorrect password. Please try again.');
        }
        setShowPopup(false); // Close popup
        setPassword(''); // Clear the password input
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>TA Duty Management</h1>
                <button onClick={handleAdminClick} className="admin-button">Admin Login</button>
            </header>
            <div className="card-container">
                {/* Teacher Card */}
                <div className="card">
                    <h2>Teachers</h2>
                    <div className="card-buttons">
                        <Link to="/login" state={{ text: "teacher" }}>
                            <button className="login-button">Login</button>
                        </Link>
                        <Link to="/signup" state={{ text: "teacher" }}>
                            <button className="signup-button">Sign Up</button>
                        </Link>
                    </div>
                </div>

                {/* Student Card */}
                <div className="card">
                    <h2>Students</h2>
                    <div className="card-buttons">
                        <Link to="/login" state={{ text: "student" }}>
                            <button className="login-button">Login</button>
                        </Link>
                        <Link to="/signup" state={{ text: "student" }}>
                            <button className="signup-button">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Admin Popup for Password Entry */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>Admin Login</h2>
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordSubmit}>Submit</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
