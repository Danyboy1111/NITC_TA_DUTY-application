import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminForm.css';

function AdminForm() {
  const [students, setStudents] = useState([]);

  // Fetch students and their ack values
  const fetchStudentsWithAck = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      const studentsData = response.data.data; // Adjust if response structure is different

      // Add ack value for each student
      const updatedStudents = await Promise.all(
        studentsData.map(async (student) => {
          try {
            const ackResponse = await axios.get(`http://localhost:5000/api/requests/${student.roll}`);
            const ack = Number(ackResponse.data.data.ack); // Convert ack to number
            return { ...student, ack };
          } catch (error) {
            console.error(`Error fetching ack for student ${student.roll}:`, error);
            return { ...student, ack: null }; // Default ack to null if error occurs
          }
        })
      );

      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchStudentsWithAck();
  }, []);

  // Function to handle verification
  const handleVerify = (id) => {
    console.log(`Verifying student with ID: ${id}`);
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === id ? { ...student, verified: true } : student
      )
    );
  };

  return (
    <div className="admin-form">
      <h2>Student List</h2>
      <div className="student-card-container">
        {students.map((student) => (
          <div key={student._id} className="student-card">
            <h3>{student.name}</h3>
            <p>Roll: {student.roll}</p>
            <p>Ack Value: {student.ack !== null ? student.ack : 'Loading...'}</p>
            <button
              className={`verify-button ${student.verified ? 'verified' : ''}`}
              onClick={() => handleVerify(student._id)}
              disabled={student.verified}
            >
              {student.verified ? 'Verified' : 'Verify'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminForm;
