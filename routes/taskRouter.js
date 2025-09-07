import Router from "express";
import {
  createTask,
  deleteTask,
  readTask,
  updateTask,
} from "../controllers/taskApis/barrel.js";
const taskRouter = Router();

taskRouter
  .post("/task/create", createTask)
  .get("/readTask", readTask)
  .put("/updateTask/:id", updateTask)
  .delete("/deleteTask/:id", deleteTask);
export default taskRouter;
