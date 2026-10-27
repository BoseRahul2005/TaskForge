const { verifyWebhook } = require("@clerk/express/webhooks");
const { syncClerkUser, deleteUser } = require("../services/clerkUserService");

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
