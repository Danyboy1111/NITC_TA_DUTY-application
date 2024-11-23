import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({

name:{
    type:String,
    required:true,
},
roll :{
type:String,
required:true,
},
image:
{
    type:String,
    required:true,
},
lab:
{
type:Number,
},
teach:{

type:Number,
},
project:{
type:Number,
},
},
{
    timestamps:true,
});
const Student = mongoose.model("Student",studentSchema);
export default Student;