const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
    clerkWorkspaceId: { type: String, required: true, unique:true },
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String},
    image_url:{type:String}
},{timestamps:true});

module.exports = mongoose.model("Workspace", workspaceSchema);
