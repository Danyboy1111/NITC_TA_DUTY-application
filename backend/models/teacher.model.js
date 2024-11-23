import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    assist:
    {
        type:[Number],
        default:[],
        validate: {
            validator: (array) => array.length <= 5, // Validate min 1, max 5
            message: "A teacher must have between 1 and 5 subjects.", 
        }
    },
    subjects: 
    {
        type: [Number], // Array of strings
        required: true,
        validate: {
            validator: (array) =>  array.length <= 5, // Validate min 1, max 5
            message: "A teacher must have between 1 and 5 subjects.",
        }
    }
},
{
    timestamps: true,
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
