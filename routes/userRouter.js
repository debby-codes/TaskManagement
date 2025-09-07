import Router from "express";
import {
  createUser,
  getAllUsers,
  getAUser,
  updateUser,
  deleteUser,
} from "../controllers/userApis/barrel.js";
const userRouter = Router();

userRouter
  .post("/user/create", createUser)
  .get("/users", getAllUsers)
  .get("/user/:id", getAUser)
  .put("/user/update/:id", updateUser)
  .delete("/user/delete/:id", deleteUser);
export default userRouter;
