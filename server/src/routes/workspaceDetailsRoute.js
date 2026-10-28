const express = require("express");
const workspaceDetails = require("../controllers/workspaceDetailsController");

const workspaceDetailsRouter = express.Router();

workspaceDetailsRouter.get("/workspace", workspaceDetails);

module.exports = workspaceDetailsRouter;