const express = require("express");
const clerkWebhookRouter = express.Router();
const { handleWebhook } = require("../controllers/clerkWebhookController");

clerkWebhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

module.exports = clerkWebhookRouter;
