import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
    lastOtpSentAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
