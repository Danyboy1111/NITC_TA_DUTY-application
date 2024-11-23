// AdminPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const EditModal = ({ item, isTeacher, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...item });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddListItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleListItemChange = (field, index, value) => {
    const updatedList = [...formData[field]];
    updatedList[index] = value;
    setFormData({ ...formData, [field]: updatedList });
  };

  const handleDeleteListItem = (field, index) => {
    const updatedList = [...formData[field]];
    updatedList.splice(index, 1);
    setFormData({ ...formData, [field]: updatedList });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isTeacher ? 'Edit Teacher' : 'Edit Student'}</h2>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Roll:
          <input type="text" name="roll" value={formData.roll} onChange={handleInputChange} />
        </label>

        {isTeacher ? (
          <>
            <h4>Assist List:</h4>
            {formData.assist.map((item, index) => (
              <div key={index} className="list-item">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListItemChange('assist', index, e.target.value)}
                />
                <button onClick={() => handleDeleteListItem('assist', index)}>Delete</button>
              </div>
            ))}
            <button onClick={() => handleAddListItem('assist')}>Add Assist</button>

            <h4>Subjects:</h4>
            {formData.subjects.map((item, index) => (
              <div key={index} className="list-item">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListItemChange('subjects', index, e.target.value)}
                />
                <button onClick={() => handleDeleteListItem('subjects', index)}>Delete</button>
              </div>
            ))}
            <button onClick={() => handleAddListItem('subjects')}>Add Subject</button>
          </>
        ) : (
          <>
            <h4>Lab Details:</h4>
            <input
              type="text"
              name="lab"
              value={formData.lab}
              onChange={handleInputChange}
            />
            <h4>Project Details:</h4>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
            />
            <h4>Teacher Assigned:</h4>
            <input
              type="text"
              name="teach"
              value={formData.teach}
              onChange={handleInputChange}
            />
          </>
        )}

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const TeacherCard = ({ teacher, handleDelete, handleShowDetails, handleEdit }) => (
  <div className="teacher-card">
    <div className="card-header">
      <div>
        <h3>{teacher.name}</h3>
        <p>Roll: {teacher.roll}</p>
      </div>
      <div className="button-group">
        <button className="show-details" onClick={() => handleShowDetails(teacher)}>View</button>
        <button className="edit" onClick={() => handleEdit(teacher, true)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(teacher._id, true)}>Delete</button>
      </div>
    </div>
    {teacher.showDetails && (
      <div className="dropdown-content show">
        <h4>Assist List:</h4>
        <ul>
          {teacher.assist.map((assist, index) => (
            <li key={index}>{assist}</li>
          ))}
        </ul>
        <h4>Subjects:</h4>
        <ul>
          {teacher.subjects.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const StudentCard = ({ student, handleDelete, handleShowDetails, handleEdit }) => (
  <div className="student-card">
    <div className="card-header">
      <div>
        <h3>{student.name}</h3>
        <p>Roll: {student.roll}</p>
      </div>
      <div className="button-group">
        <button className="show-details" onClick={() => handleShowDetails(student)}>View</button>
        <button className="edit" onClick={() => handleEdit(student, false)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(student._id, false)}>Delete</button>
      </div>
    </div>
    {student.showDetails && (
      <div className="dropdown-content show">
        <h4>Teacher Assigned:</h4>
        <p>{student.teach}</p>
        <h4>Lab Details:</h4>
        <p>{student.lab}</p>
        <h4>Project Details:</h4>
        <p>{student.project}</p>
      </div>
    )}
  </div>
);

const AdminPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTeacher, setIsTeacher] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherRes = await axios.get('http://localhost:5000/api/teachers');
        const studentRes = await axios.get('http://localhost:5000/api/students');
        setTeachers(teacherRes.data.data.map((teacher) => ({ ...teacher, showDetails: false })));
        setStudents(studentRes.data.data.map((student) => ({ ...student, showDetails: false })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, isTeacher) => {
    try {
      if (isTeacher) {
        await axios.delete(`http://localhost:5000/api/teachers/${id}`);
        setTeachers((prev) => prev.filter((teacher) => teacher._id !== id));
      } else {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        setStudents((prev) => prev.filter((student) => student._id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item, isTeacher) => {
    setSelectedItem(item);
    setIsTeacher(isTeacher);
  };

  const handleSave = async (updatedItem) => {
    try {
      if (isTeacher) {
        await axios.put(`http://localhost:5000/api/teachers/${updatedItem._id}`, updatedItem);
        setTeachers((prev) => prev.map((t) => (t._id === updatedItem._id ? updatedItem : t)));
      } else {
        await axios.put(`http://localhost:5000/api/students/${updatedItem._id}`, updatedItem);
        setStudents((prev) => prev.map((s) => (s._id === updatedItem._id ? updatedItem : s)));
      }
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="admin-page">
      <div className="teacher-section">
        <h2>Teachers</h2>
        {teachers.map((teacher) => (
          <TeacherCard
            key={teacher._id}
            teacher={teacher}
            handleShowDetails={() => setTeachers(teachers.map(t => t._id === teacher._id ? {...t, showDetails: !t.showDetails} : t))}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <div className="student-section">
        <h2>Students</h2>
        {students.map((student) => (
          <StudentCard
            key={student._id}
            student={student}
            handleShowDetails={() => setStudents(students.map(s => s._id === student._id ? {...s, showDetails: !s.showDetails} : s))}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {selectedItem && (
        <EditModal
          item={selectedItem}
          isTeacher={isTeacher}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminPage;
