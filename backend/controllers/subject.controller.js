import mongoose from "mongoose";
import Subject from "../models/subject.model.js";

export const getSubjectId = async (req, res) => {
    try {
        const subjects = await Subject.find({});
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        console.error("Error retrieving student details:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createSubject = async (req, res) => {
    const subject = req.body;

    if (!subject.name || !subject.id || !subject.image|| !subject.teacher|| !subject.students) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newSubject = new Subject(subject);

    try {
        await newSubject.save();
        return res.status(201).json({ success: true, data: newSubject });
    } catch (error) {
        console.error("Error creating student:", error.message);
        return res.status(500).json({ success: false, message: "The subject data was not created by the server" });
    }
};
