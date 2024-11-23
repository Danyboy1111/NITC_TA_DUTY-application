import mongoose from "mongoose";
import Teacher from "../models/teacher.model.js";

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.status(200).json({ success: true, data: teachers });
    } catch (error) {
        console.error("Error retrieving teacher details:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createTeacher = async (req, res) => {
    const teacher = req.body;

    // Ensure all required fields are provided
    if (!teacher.name || !teacher.roll || !teacher.image || !teacher.subjects) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Create a new teacher record
    const newTeacher = new Teacher(teacher);

    try {
        await newTeacher.save();
        res.status(201).json({ success: true, data: newTeacher });
    } catch (error) {
        console.error("Error creating teacher credentials:", error.message);
        res.status(500).json({ success: false, message: "The teacher data was not created by the server" });
    }
};

export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const teacher = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No teacher found to update" });
    }

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacher, { new: true });
        res.status(200).json({ success: true, data: updatedTeacher });
    } catch (error) {
        console.error("Error updating teacher:", error.message);
        res.status(500).json({ success: false, message: "Teacher could not be updated" });
    }
};

export const getTeacher = async (req, res) => {
    const roll = req.params.id;  // Directly use the parameter as a string

    try {
        const teacher = await Teacher.findOne({ roll });

        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        res.status(200).json({ success: true, data: teacher });
    } catch (error) {
        console.error("Error finding the teacher by roll:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Teacher ID" });
    }

    try {
        await Teacher.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "The teacher was deleted successfully" });
    } catch (error) {
        console.error("Error deleting teacher:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
