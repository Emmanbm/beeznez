const express = require("express");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addTask,
} = require("../controllers/projectControllers");
const router = express.Router();

router.post("/project", createProject);
router.post("/project/:id/tasks", addTask);
router.get("/projects", getProjects);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

module.exports = router;
