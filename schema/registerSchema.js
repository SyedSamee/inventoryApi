import mongoose from "mongoose";

var registerSchema = new mongoose.Schema({
    name:{type:String,requried:true},
    email:{type:String,requried:true,unique:true},
    password:{type:String,requried:true,}
})


const registerMainModel = new mongoose.model("registerSchema",registerSchema);



export default registerMainModel;

