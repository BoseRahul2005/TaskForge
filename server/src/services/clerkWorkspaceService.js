const Workspace = require('../models/workspace');
const User = require('../models/User');
const Membership = require('../models/membership');

const syncClerkWorkspace = async (workspaceData) => {
    try {
        const { id, name, slug, image_url, created_by } = workspaceData;
        if (!id) {
            throw new Error("Workspace ID is missing");
        }
        if (!name) {
            throw new Error("Workspace Name is missing");
        }

        const getWorkspace = await Workspace.findOneAndUpdate(
            { clerkWorkspaceId: id },
            { $set: { name: name, slug: slug, image_url: image_url } },
            { upsert: true, new: true }
        );

        if(created_by){
            const user= await User.findOne({clerkUserId: created_by});
            if(user){
                await Membership.findOneAndUpdate({
                    workspaceId: getWorkspace._id,
                    userId: user._id
                },{role:"owner"},
                {upsert: true, new: true});
            }
        };


        return getWorkspace;
    }catch(err){
        console.log(err);
        throw err;
    }
}

const deleteWorkspace= async(clerkWorkspaceId)=>{
    try{
        const getWorkspace= await Workspace.findOneAndDelete({clerkWorkspaceId:clerkWorkspaceId});
        return getWorkspace;
    }catch(err){
        console.log(err);
        throw err;
    }
}

module.exports = {
    syncClerkWorkspace,
    deleteWorkspace
}