import Router from "express";
import {
  createUser,
  getAllUsers,
  getAUser,
  updateUser,
  deleteUser,
} from "../controllers/userApis/barrel.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const userRouter = Router();

userRouter
  .post("/user/create", createUser)
  .get("/users", authMiddleware, getAllUsers)
  .get("/user/:id", authMiddleware, getAUser)
  .put("/user/update/:id", authMiddleware, updateUser)
  .delete("/user/delete/:id", authMiddleware, deleteUser);
export default userRouter;
