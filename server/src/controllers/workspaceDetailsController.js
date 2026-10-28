const User = require("../models/User");
const Workspace= require("../models/workspace");
const Membership= require("../models/membership");
const {getAuth}= require("@clerk/express");

const workspaceDetails= async(req,res)=>{
    try{
        const auth = getAuth(req);
        const id = auth.userId;
        const getUser= await User.findOne({clerkUserId:id});
        if(!getUser){
            return res.status(404).json({success:false, message:"User not found"});
        }
        const membershipDetails= await Membership.find({userId:getUser._id}); //fetching all the memberships the user had
        if(membershipDetails.length===0){
            return res.status(200).json({success:true, workspaces:[]});
        }
        const workspaceIds= membershipDetails.map((membership)=>membership.workspaceId); //extracting workspace ids from memberships
        const workspaceDetails= await Workspace.find({_id:{$in:workspaceIds}}); //fetching all the workspaces with the extracted ids

        const details= workspaceDetails.map((workspace)=>{
            const membership= membershipDetails.find((membership)=>membership.workspaceId.equals(workspace._id));
            return {
                id:workspace._id,
                name:workspace.name,
                slug:workspace.slug,
                image_url:workspace.image_url,
                role:membership.role
            };
        });
        return res.status(200).json({success:true,workspaces:details});
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false, message:"Internal Server Error!!"});
    }
}

module.exports= workspaceDetails;