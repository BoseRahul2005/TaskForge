const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" , required:true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required:true},
  role: {
    type: String,
    enum: ["owner", "member"],
    default: "member",
  },
},{timestamps:true}
);

membershipSchema.index(
    {userId:1, workspaceId:1},
    {unique:true}
);

module.exports = mongoose.model("Membership", membershipSchema);
