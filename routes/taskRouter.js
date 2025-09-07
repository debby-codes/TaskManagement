import Router from "express";
import {
  createTask,
  deleteTask,
  readTask,
  updateTask,
} from "../controllers/taskApis/barrel.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const taskRouter = Router();

taskRouter
  .post("/task/create", authMiddleware, createTask)
  .get("/readTask", authMiddleware, readTask)
  .put("/updateTask/:id", authMiddleware, updateTask)
  .delete("/deleteTask/:id", authMiddleware, deleteTask);
export default taskRouter;
