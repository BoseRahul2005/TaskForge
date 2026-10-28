const { verifyWebhook } = require("@clerk/express/webhooks");
const { syncClerkUser, deleteUser } = require("../services/clerkUserService");
const { syncClerkWorkspace, deleteWorkspace } = require("../services/clerkWorkspaceService");
const Workspace = require("../models/workspace");
const Membership = require("../models/membership");
const User = require("../models/User");

const handleWebhook = async (req, res) => {
  try {
    const event = await verifyWebhook(req);

    console.log("Received Clerk event:", event.type);

    if (event.type === "user.created" || event.type === "user.updated") {
      await syncClerkUser(event.data);
      return res.status(200).json({
        success: true,
        message: "User synced successfully",
      });
    }

    if (event.type === "user.deleted") {
      await deleteUser(event.data.id);
      return res.status(200).json({
        success: true,
        message: "User deletion processed successfully",
      });
    }

    if (event.type === "organization.created" || event.type === "organization.updated") {
      const workspaceDetails= await syncClerkWorkspace(event.data);
      return res.status(200).json({
        success: true,workspaceDetails,
      });
    }

    if(event.type === "organization.deleted"){
      await deleteWorkspace(event.data.id);
      return res.status(200).json({
        success: true,
        message: "Workspace deletion processed successfully",
      });
    }

    if(event.type === 'organizationMembership.created'){
      const orgId= event.data.organization.id;
      const clerkUserId= event.data.public_user_data.user_id;
      const role= event.data.role === "org:admin" ? "owner" : "member";

      const workspace= await Workspace.findOne({clerkWorkspaceId: orgId});
      const user= await User.findOne({clerkUserId});

      if(workspace && user){
        await Membership.findOneAndUpdate(
          {workspaceId:workspace._id, userId: user._id},
          { role },
          { upsert: true, new: true}
        );
      }
      return res.status(200).json({ success: true, message: "Membership synced" });
    }

    // Acknowledge events that this endpoint does not handle
    return res.status(200).json({
      success: true,
      message: `Ignored event: ${event.type}`,
    });
  } catch (err) {
    console.error("Clerk webhook processing failed:", err);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { handleWebhook };
