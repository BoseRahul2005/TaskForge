const mongoose = require("mongoose");

const projectSchema= new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
    workspaceId:{type:mongoose.Schema.Types.ObjectId, ref:"Workspace",required:true},
    createdBy:{type:String,required:true},
    status:{type:String, enum:["Pending","Active","Completed"], default:"Pending", required:true},
    priority:{type:String, enum:["Low","Medium","High"], default:"Medium", required:true},
    startDate:{type:Date,required:true},
    dueDate:{type:Date,required:true}
},{timestamps:true});

module.exports= mongoose.model("Project",projectSchema);