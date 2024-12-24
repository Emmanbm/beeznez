const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");
const router = express.Router();

router.post("/task", createTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

module.exports = router;
