const express = require('express');
const projectRouter = express.Router({ mergeParams: true });
const requireAuthentication = require('../middlewares/requireAuthentication.js');
const { createProject,getProjects,updateProject,deleteProject } = require('../controllers/projectsController');

projectRouter.post("/:workspaceId/projects", requireAuthentication, createProject);
projectRouter.get("/:workspaceId/projects", requireAuthentication, getProjects);
projectRouter.put("/projects/:projectId", updateProject);
projectRouter.delete("/projects/:projectId", deleteProject);
module.exports = projectRouter;