import mongoose from "mongoose";

const requestSchema=new mongoose.Schema({

id:{
    type:String,
    required:true,
},
ack:{
type:Number,
required: true,
default:0,
},
},
{
    timestamps:true,
});
const Request = mongoose.model("Request",requestSchema);
export default Request;