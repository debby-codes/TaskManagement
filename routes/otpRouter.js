import Router from "express";
import { resendOTP, verifyOTP } from "../controllers/otpApis/verifyOtp.js";
const otpRouter = Router();
otpRouter

  .post("/verify", verifyOTP)

  .post("/resend", resendOTP);
export default otpRouter;
