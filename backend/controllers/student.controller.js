import mongoose from "mongoose";
import Student from "../models/student.model.js";

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        console.error("Error retrieving student details:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getStudent = async (req, res) => {
    const roll = req.params.id;  // Directly use the parameter as a string

    try {
        const student = await Student.findOne({ roll });

        if (!student) {
            return res.status(404).json({ success: false, message: "student not found" });
        }

        res.status(200).json({ success: true, data: student });
    } catch (error) {
        console.error("Error finding the student by roll:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createStudent = async (req, res) => {
    const student = req.body;

    if (!student.name || !student.roll|| !student.image ) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newStudent = new Student(student);

    try {
        await newStudent.save();
        return res.status(201).json({ success: true, data: newStudent });
    } catch (error) {
        console.error("Error creating student:", error.message);
        return res.status(500).json({ success: false, message: "The student data was not created by the server" });
    }
};

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const student = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No student found to update" });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, student, { new: true });
        return res.status(200).json({ success: true, data: updatedStudent });
    } catch (error) {
        console.error("Error updating student:", error.message);
        return res.status(500).json({ success: false, message: "Student could not be updated" });
    }
};

export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Student ID" });
    }

    try {
        await Student.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "The student was deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
