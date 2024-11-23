import mongoose from "mongoose";
import Request from "../models/request.model.js";

export const r = async (req, res) => {
    try {
        const requests = await Request.find({});
        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        console.error("Error retrieving request details:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getRequest = async (req, res) => {
    const { id } = req.params; // Get the 'id' from the URL parameters

    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    try {
        // Find the request by the custom 'id' field
        const request = await Request.findOne({ id });

        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found with that ID" });
        }

        return res.status(200).json({ success: true, data: request });
    } catch (error) {
        console.error("Error retrieving request:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const c = async (req, res) => {
    const { id, ack } = req.body;

    if (!id || ack === undefined) { // ack can be 0, so check for undefined
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newRequest = new Request({ id, ack });

    try {
        await newRequest.save();
        return res.status(201).json({ success: true, data: newRequest });
    } catch (error) {
        console.error("Error creating request:", error.message);
        return res.status(500).json({ success: false, message: "The request could not be created" });
    }
};

export const u = async (req, res) => {
    const { id } = req.params;  // This is the 'id' from the URL
    const request = req.body;   // This is the new data sent in the body

    // Validate if the id is valid (if it's a valid string in your case)
    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    try {
        // Find the request using the 'id' field in your schema, not '_id'
        const updatedRequest = await Request.findOneAndUpdate({ id }, request, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({ success: false, message: "Request not found with that ID" });
        }

        return res.status(200).json({ success: true, data: updatedRequest });
    } catch (error) {
        console.error("Error updating request:", error.message);
        return res.status(500).json({ success: false, message: "Request could not be updated" });
    }
};

export const d = async (req, res) => {
    const { id } = req.params;

    // Try to find the request by the custom 'id' field
    try {
        const request = await Request.findOneAndDelete({ id }); // Using the 'id' field from your schema

        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found with that ID" });
        }

        return res.status(200).json({ success: true, message: "The Request was deleted successfully" });
    } catch (error) {
        console.error("Error deleting request:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }

};
