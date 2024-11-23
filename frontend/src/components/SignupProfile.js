import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupProfile.css';

function Profile() {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract data passed through location.state
    useEffect(() => {
        console.log(location.state); // Debugging: Log the state object
    }, [location]);

    const { name, roll, image } = location.state || {}; // Ensure fallbacks if state is undefined
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const [imageURL, setImageURL] = useState(image || ''); // Default to passed image or empty

    // Add subject to the list
    const addSubject = () => {
        if (newSubject.trim() !== '') {
            setSubjects([...subjects, newSubject]);
            setNewSubject('');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the payload
        const profileData = {
            name: name || 'Unknown', // Fallback if no name provided
            roll: roll || 'Unknown Roll', // Fallback if no roll provided
            image: imageURL,
            subjects,
        };

        try {
            console.log("Sending profile data:", profileData); // Debugging

            // Send data to the backend
            const response = await axios.post('http://localhost:5000/api/teachers/', profileData);

            if (response.data.success) {
                alert('Profile submitted successfully!');
                navigate('/login'); // Navigate to the login page after submission
            } else {
                alert('Failed to submit the profile. Please try again.');
            }
        } catch (error) {
            console.error("Error submitting profile data:", error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="profile-page">
            <h2>Welcome, {name || 'User'}</h2> {/* Fallback for undefined name */}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name</label>
                    <input type="text" value={name || ''} readOnly />
                </div>

                <div className="input-container">
                    <label>Roll</label>
                    <input type="text" value={roll || ''} readOnly />
                </div>
                <div className="input-container">
                    <label>Image URL</label>
                    <input
                        type="url"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        placeholder="Enter image URL"
                    />
                </div>
                <div className="subject-container">
                    <label>Subjects</label>
                    <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="Add a subject"
                    />
                    <button type="button" onClick={addSubject}>Add Subject</button>
                </div>
                <ul>
                    {subjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                    ))}
                </ul>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default Profile;
