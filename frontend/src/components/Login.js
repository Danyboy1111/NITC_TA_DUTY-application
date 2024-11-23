// Login.js
import React, { useState } from 'react';
import './Login.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
    const [roll, setRoll] = useState('');  // Changed `email` to `roll` for clarity
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Use the `text` prop passed from Home component to set role
    const [role, setRole] = useState(location.state?.text || 'teacher'); // Default to 'teacher' if no role is passed

    const handleSubmit = (e) => {
        e.preventDefault();

        // Navigate based on role
        if (role === 'teacher') {
            navigate('/dashbt', { state: { roll, password } }); // Pass `roll` in state
        } else if (role === 'student') {
            navigate('/dashbs', { state: { roll, password } });
        }
    };

    return (
        <div className="login-page">
            <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Roll Number</label>
                    <input
                        type="text"
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                        placeholder="Enter your Roll"
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
