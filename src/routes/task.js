import { Router } from "express";
import {
  getTasks,
  count,
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

router.get("/tasks", getTasks);
router.get("/tasks/count", count);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
