const mongoose = require("mongoose");
const Project = require("../models/project");
const Workspace = require("../models/workspace");
const Membership = require("../models/membership");
const User = require("../models/User");

const createProject = async (req, res) => {
    try {
        const { name, description, status, priority, startDate, dueDate } = req.body;
        const workspaceId = req.params.workspaceId;
        const clerkUserId = req.auth?.userId;

         if (!name || !dueDate || !startDate || !priority || !status) {
            return res.status(400).json({ 
                success: false, 
                message: "Name,Due Date,Start Date, status and Priority are required" 
            });
        }

        if (!workspaceId || !mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({ 
                success: false, 
                message: "A valid workspace ID is required" 
            });
        }

        const workspace= await Workspace.findById(workspaceId);
        if(!workspace){
            return res.status(404).json({success:false,message:"Workspace not found"});
        }

        const user= await User.findOne({clerkUserId});
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }

        const membership= await Membership.findOne({
            workspaceId,
            userId:user._id
        });
        if(!membership){
            return res.status(404).json({success:false,message:"Access denied. You are not a member of this workspace"});
        }

        await Project.create({
            name,
            description,
            workspaceId,
            createdBy:user._id,
            status,
            priority,
            startDate,
            dueDate
        });

        return res.status(201).json({ success: true, message: "Project Created Successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getProjects= async(req,res)=>{
    try{
        const workspaceId=req.params.workspaceId;

        const projects= await Project.find({workspaceId});
        return res.status(200).json({success:true,projects});
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:err.message});
    }
}

const updateProject= async(req,res)=>{
    try{
        const {name,description,status,dueDate}=req.body;
        const projectId=req.params.projectId;

        if (!name || !dueDate) {
            return res.status(400).json({ 
                success: false, 
                message: "Name and Due Date are required" 
            });
        }

        const project = await Project.findByIdAndUpdate(
            projectId,
            {
                name,
                description,
                status,
                dueDate
            },
            { new: true }
        );

        return res.status(200).json({ success: true, project });
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:err.message});
    }
}

const deleteProject= async(req,res)=>{
    try{
        const projectId=req.params.projectId;
        if(!projectId || !mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(404).json({success:false,message:"Project is not valid"});
        }
        const deletedProject = await Project.findByIdAndDelete(projectId);
        return res.status(200).json({ success: true, message: "Project deleted successfully." });
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:err.message});
    }
}
module.exports={createProject,getProjects,updateProject,deleteProject};