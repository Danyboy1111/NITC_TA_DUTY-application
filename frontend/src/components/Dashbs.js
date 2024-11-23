import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashbs.css';
function TaskCard({ name, msg, roll, onDelete }) {
    const [isProcessing, setIsProcessing] = useState(false); // Track "Clear Task" status
    const [isAskingAccomplishment, setIsAskingAccomplishment] = useState(false); // Track "Ask for Accomplishment" status

    const handleClearTaskClick = async () => {
        if (isProcessing) return; // Prevent duplicate requests
        setIsProcessing(true);

        try {
            console.log("Clearing task for roll:", roll);

            const response = await axios.put(`http://localhost:5000/api/work/${roll}`, {
                msg: '', // Set the message to empty
            });

            if (response.data.success) {
                console.log('Task message cleared successfully!');
                onDelete(); // Refresh parent tasks
            } else {
                console.error('Failed to clear task:', response.data.message);
                alert('Failed to clear task. Please try again.');
            }
        } catch (error) {
            console.error('Error clearing task:', error);
            alert('An error occurred while clearing the task.');
        } finally {
            setIsProcessing(false); // Re-enable the button
        }
    };
    const handleAskAccomplishmentClick = async () => {
        if (isAskingAccomplishment) return; // Prevent duplicate requests
        setIsAskingAccomplishment(true);
    
        try {
            console.log("Updating accomplishment status for roll:", roll);
    
            // First, retrieve the current 'ack' value from the server
            const getResponse = await axios.get(`http://localhost:5000/api/requests/${roll}`);
    
            if (!getResponse.data.success) {
                console.error('Failed to fetch the request:', getResponse.data.message);
                alert('Failed to fetch request data. Please try again.');
                return;
            }
    
            // Get the current ack value
            let currentAck = getResponse.data.data.ack;
    
            // Decrease the ack value by 1
            const updatedAck = currentAck - 1;
    
            // Now, update the 'ack' value on the server
            const updateResponse = await axios.put(`http://localhost:5000/api/requests/${roll}`, {
                ack: updatedAck, // Update the ack value
            });
    
            if (updateResponse.data.success) {
                console.log('Accomplishment status updated successfully!');
                alert('Accomplishment request sent successfully!');
            } else {
                console.error('Failed to update status:', updateResponse.data.message);
                alert('Failed to request accomplishment. Please try again.');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('An error occurred while requesting accomplishment.');
        } finally {
            setIsAskingAccomplishment(false); // Re-enable the button
        }
    };
    
    return (
        <div className="task-card">
            <h4>{name}</h4>
            <p>{msg || 'No task assigned.'}</p>
            <button
                className="submit-button"
                onClick={handleClearTaskClick}
                disabled={isProcessing} // Disable button while processing
            >
                {isProcessing ? 'Processing...' : 'Clear Task'}
            </button>
            <button
                className="accomplish-button"
                onClick={handleAskAccomplishmentClick}
                disabled={isAskingAccomplishment} // Disable button while processing
            >
                {isAskingAccomplishment ? 'Processing...' : 'Ask for Accomplishment'}
            </button>
        </div>
    );
}

function DashboardSection({ title, tasks, refreshTasks }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="dashboard-section">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {title}
            </button>
            {isOpen && (
                <div className="task-list">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                name={task.name}
                                msg={task.msg}
                                roll={task.sid}
                                onDelete={refreshTasks} // Pass refresh callback
                            />
                        ))
                    ) : (
                        <p className="no-tasks-message">No tasks assigned.</p>
                    )}
                </div>
            )}
        </div>
    );
}

function Dashbs() {
    const location = useLocation();
    const navigate = useNavigate();
    const { roll } = location.state || {}; // Retrieve roll from navigation state
    const [student, setStudent] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    // Fetch student details
    useEffect(() => {
        if (roll) {
            axios
                .get(`http://localhost:5000/api/students/${roll}`)
                .then((response) => {
                    if (response.data.success) {
                        setStudent(response.data.data);
                    } else {
                        setError('Student not found.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching student data:', error);
                    setError('An error occurred while fetching student data.');
                });
        } else {
            navigate('/login', { replace: true });
        }
    }, [roll, navigate]);

    // Fetch student tasks
    const fetchTasks = () => {
        if (roll) {
            console.log({roll});
            axios
                .get(`http://localhost:5000/api/work/${roll}`)
                .then((response) => {
                    if (response.data.success) {
                        setTasks(response.data.data);
                    } else {
                        setTasks([]); // No tasks found
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        setTasks([]); // Handle no tasks gracefully
                    } else {
                        console.error('Error fetching tasks:', error);
                        setError('Unable to fetch tasks. Please try again later.');
                    }
                });
        }
    };

    useEffect(fetchTasks, [roll]);

    if (!roll) {
        return <p>Redirecting to login...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!student) {
        return <p>Loading...</p>;
    }

    return (
        <div className="student-dashboard">
            <h2>{student.name}'s Dashboard</h2>
            <img src={student.image} alt={student.name} className="student-image" />
            <p>Roll: {student.roll}</p>
            <DashboardSection title="Assigned Tasks" tasks={tasks} refreshTasks={fetchTasks} />
        </div>
    );
}

export default Dashbs;