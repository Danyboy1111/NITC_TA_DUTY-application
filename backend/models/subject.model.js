import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    teacher:{
        type:String,
        required:true,
    },
    students: {
        type: [String], // Array of strings
        required: true,
        validate: {
            validator: (array) => array.length > 0 && array.length <= 5, // Validate min 1, max 5
            message: "A subject must have between 1 and 5 subjects.",
        }
    }
},
{
    timestamps: true,
});

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
