import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roll, setRoll] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get the role from state, defaulting to 'teacher' if none is provided
    const role = location.state?.text || 'teacher';

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Define the general user data object
        const userData = {
            name: username,
            email,
            password,
            roll,
            image,
        };
    
        try {
            if (role === 'student') {
                // Define the student-specific data
                const studentData = {
                    name: username,
                    roll,
                    image,
                    lab: "",       // Setting lab, teach, project fields as empty initially
                    teach: "",
                    project: ""
                };
    
                // First POST request for the student
                await axios.post('http://localhost:5000/api/work/', {
                    sid: roll, // Use the student's roll number for sid
                    msg: "" // Empty message initially
                });
    
                // Second POST request to set ack to -3 for the student
                await axios.post('http://localhost:5000/api/requests/', {
                    id: roll, // Assuming 'id' refers to the roll number of the student
                    ack: "-3"
                });
    
                // Send the student data to the /api/students endpoint
                await axios.post('http://localhost:5000/api/students/', studentData);
            }
    
            // Send the general user data to the /api/login/signup endpoint
            const response = await axios.post('http://localhost:5000/api/login/signup', userData);
    
            if (response.data.success) {
                // Navigate based on role if signup is successful
                if (role === 'teacher') {
                    navigate('/profile', { state: { ...userData } });
                } else if (role === 'student') {
                    navigate('/dashbs', { state: { ...userData } });
                }
            } else {
                alert("Signup failed! Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup. Please try again.");
        }
    };
    
    return (
        <div className="signup-page">
            <h2>Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Roll</label>
                    <input
                        type="text"
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Image URL</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
