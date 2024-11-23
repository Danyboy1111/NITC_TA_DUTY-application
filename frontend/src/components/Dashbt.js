import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashbt.css';

function StudentCard({ name, id }) {
    const [taskMessage, setTaskMessage] = useState(null); // Store the task message
    const [errorMessage, setErrorMessage] = useState('');
    const [newTask, setNewTask] = useState(''); // For task input
    const [isEditing, setIsEditing] = useState(false); // Toggle input field visibility

    useEffect(() => {
        // Fetch tasks from the database
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/work/${id}`);
                const tasks = response.data?.data || [];

                // Check if there's a task for this student
                if (tasks.length > 0) {
                    const existingTask = tasks[0]; // Get the first task (assuming one task per student)
                    setTaskMessage(existingTask.msg || null); // Handle empty msg
                }
            } catch (error) {
                console.error('Error fetching task:', error);
                setErrorMessage('Failed to fetch task.');
            }
        };

        fetchTask();
    }, [id]);

    // Function to update the task
    const handleUpdateTask = async () => {
        if (!newTask.trim()) {
            alert('Task cannot be empty.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/work/${id}`, {
                msg: newTask,
            });

            if (response.data.success) {
                setTaskMessage(newTask); // Update UI with new task
                setNewTask(''); // Clear input field
                setIsEditing(false); // Hide input field
            } else {
                alert('Failed to update task.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('An error occurred while updating the task.');
        }
    };

    // Function to fetch data and update the ack value
    const handleGiveAccomplishments = async () => {
        try {
            // Fetch the request data from the API
            const response = await axios.get(`http://localhost:5000/api/requests/${id}`);
            
            if (response.data.success) {
                const requestData = response.data.data;
                const updatedAck = requestData.ack + 2; // Increment ack by 2
                
                // Send PUT request to update the ack value
                const updateResponse = await axios.put(`http://localhost:5000/api/requests/${requestData.id}`, {
                    ack: updatedAck
                });

                if (updateResponse.data.success) {
                    alert('Accomplishments updated successfully!');
                } else {
                    alert('Failed to update accomplishments.');
                }
            } else {
                alert('Failed to fetch request data.');
            }
        } catch (error) {
            console.error('Error giving accomplishments:', error);
            alert('An error occurred while updating accomplishments.');
        }
    };

    return (
        <div className="student-card">
            <h4>{name} (ID: {id})</h4> {/* Display student ID */}
            {errorMessage ? (
                <p className="error-message">{errorMessage}</p>
            ) : taskMessage ? (
                <p><strong>Task:</strong> {taskMessage}</p>
            ) : isEditing ? (
                <div className="task-input">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter task details"
                    />
                    <button onClick={handleUpdateTask}>Submit</button>
                </div>
            ) : (
                <button onClick={() => setIsEditing(true)}>Assign Task</button>
            )}
            
            {/* Static button for Giving Accomplishments */}
            <button onClick={handleGiveAccomplishments} className="accomplishments-button">
                Give Accomplishments
            </button>
        </div>
    );
}

function DashboardSection({ title, students, teacherRoll }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="dashboard-section">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {title}
            </button>
            {isOpen && (
                <div className="student-list">
                    {students.map((student) => (
                        <StudentCard
                            key={student.id}
                            name={student.name}
                            id={student.id}
                            teacherRoll={teacherRoll}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function Dashbt() {
    const location = useLocation();
    const navigate = useNavigate();
    const { roll } = location.state || {};
    const [teacher, setTeacher] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (roll) {
            axios
                .get(`http://localhost:5000/api/teachers/${roll}`)
                .then((response) => {
                    if (response.data.success) {
                        setTeacher(response.data.data);
                    } else {
                        setError('Teacher not found.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching teacher data:', error);
                    setError('An error occurred while fetching data.');
                });
        } else {
            navigate('/login', { replace: true });
        }
    }, [roll, navigate]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!teacher) {
        return <p>Loading...</p>;
    }

    const assists = Array.isArray(teacher.assist)
        ? teacher.assist.map((id, index) => ({ id, name: `Assist ${index + 1}` }))
        : [];

    return (
        <div className="teacher-dashboard">
            <h2>{teacher.name}'s Dashboard</h2>
            <img src={teacher.image} alt={teacher.name} className="teacher-image" />
            <p>Roll: {teacher.roll}</p>
            <DashboardSection
                title="Assists"
                students={assists}
                teacherRoll={teacher.roll}
            />
        </div>
    );
}

export default Dashbt;
