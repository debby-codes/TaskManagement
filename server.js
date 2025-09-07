import express from "express";
import connectDb from "./dbConnect/mongodb.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import otpRouter from "./routes/otpRouter.js";
import authRouter from "./routes/authRouter.js";
import taskRouter from "./routes/taskRouter.js";
import { startTaskCleanUp } from "./cronJobs/taskCron.js";
dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);
app.use("/api/otp", otpRouter);
app.use("/api", authRouter);
app.use("/api", taskRouter);
startTaskCleanUp();
const port = process.env.PORT;

app.listen(port, console.log(`Server listening on port ${port}`));
