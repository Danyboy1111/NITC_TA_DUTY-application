import mongoose from "mongoose";

const userSchema=new mongoose.Schema({

name:{
    type:String,
    required:true,
},

image:{
    type:String,
    required:true,
},

roll:{

type:Number,
required:true,

},

email :{
type:String,
required:true,
},

password:
{
    type:String,
    required:true,
}
},
{
    timestamps:true,
});
const User = mongoose.model("User",userSchema);
export default User;