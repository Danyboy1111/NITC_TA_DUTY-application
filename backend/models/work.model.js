import mongoose from "mongoose";

const workSchema=new mongoose.Schema({


sid:{
    type:String,
    required:true,
},
stream:{
type:String,
},
msg:{
type:String,
},
},
{
    timestamps:true,
});
const Work = mongoose.model("Work",workSchema);
export default Work;