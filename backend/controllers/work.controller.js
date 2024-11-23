import mongoose from "mongoose";
import Work from "../models/work.model.js"
export const r = async (req, res) => {
    try {
        const works = await Work.find({});
        res.status(200).json({ success: true, data: works });
    } catch (error) {
        console.error("Error retrieving work details:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const c = async (req, res) => {
    console.log("POST /api/work received:", req.body);
    const work = req.body;

    if ( !work.sid  ) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newWork = new Work(work);

    try {
        await newWork.save();
        return res.status(201).json({ success: true, data: newWork });
    } catch (error) {
        console.error("Error creating work:", error.message);
        return res.status(500).json({ success: false, message: "The work data was not created by the server" });
    }
};
export const getWork = async (req, res) => {
    const { id } = req.params; // Use "id" instead of "sid"

    try {
        // Debug: Verify id
        console.log("Received id:", id);

        // Query the database using the id as sid
        const work = await Work.find({ sid: id }); // Use "sid: id" to query by sid

        // Check if no data is found
        if (!work || work.length === 0) {
            return res.status(404).json({ success: false, message: "No work found for this student" });
        }

        // Return the work data
        res.status(200).json({ success: true, data: work });
    } catch (error) {
        console.error("Error retrieving work data:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const u = async (req, res) => {
    const { sid } = req.params;
    const work = req.body;

    try {
        // Find and update the document based on the custom field 'sid'
        const updatedWork = await Work.findOneAndUpdate({ sid }, work, { new: true });

        if (!updatedWork) {
            return res.status(404).json({ success: false, message: "No work found to update" });
        }

        return res.status(200).json({ success: true, data: updatedWork });
    } catch (error) {
        console.error("Error updating work:", error.message);
        return res.status(500).json({ success: false, message: "Work request could not be updated" });
    }
};

export const d = async (req, res) => {
    const { id } = req.params;
    console.log("SID received:", id);

    try {
        const work = await Work.findOneAndDelete({ sid:id });
        if (!work) {
            return res.status(404).json({ success: false, message: "No work found with the provided SID" });
        }
        return res.status(200).json({ success: true, message: "The work was deleted successfully" });
    } catch (error) {
        console.error("Error deleting work:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
