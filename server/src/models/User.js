const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    clerkUserId:{type:String , required:true, unique:true, index:true},
    name:{type:String },
    email:{type:String , required:true},
    profilePicture:{type:String}
});

module.exports= mongoose.model("User", userSchema);