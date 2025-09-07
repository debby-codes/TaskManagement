import { Router } from "express";
import {
  logingIn,
  passwordReset,
  passwordResetRequest,
} from "../controllers/authApis/authController.js";
const authRouter = Router();
authRouter

  .post("/user/login", logingIn)
  .post("/password/resetRequest", passwordResetRequest)
  .post("/password/reset", passwordReset);

export default authRouter;
