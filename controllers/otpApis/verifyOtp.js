import User from "../../schemas/userSchema.js";
import { generateOTP, sendMail } from "../../utils/sendEmail/barrel.js";
export const verifyOTP = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ message: "User not found please register first to continue" });
      return;
    }
    if (user.isVerified) {
      return res.status(201).json({ message: "OTP is already verified" });
    }
    if (user.otpExpires < Date.now()) {
      return res
        .status(201)
        .json({ message: "OTP is already expired generate new one" });
    }
    if (user.otp !== otp) {
      return res.status(201).json({ message: "OTP is incorrect" });
    }
    // verify otp
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;

    await user.save();
    res
      .status(200)
      .json({ message: "OTP is verified, please proceed to login" });
  } catch (error) {
    console.log(error);
  }
};
export const resendOTP = async (req, res) => {
  const { email } = req.body;
  const { otp, otpExpires } = generateOTP();
  try {
    const user = await User.findOne({ email });
    const time = Date.now();
    if (!user) {
      res
        .status(400)
        .json({ message: "User not found please register first to continue" });
    }
    if (user.isVerified) {
      return res.status(201).json({ message: "OTP is already verified" });
    }
    if (user.lastOtpSentAt && time - user.lastOtpSentAt < 2 * 60 * 1000) {
      return res
        .status(400)
        .json({ message: "Wait for 2mins before resending" });
    }

    user.otp = otp;
    user.otpExpires = otpExpires;
    user.lastOtpSentAt = time;
    await user.save();

    await sendMail({
      mailFrom: `Task Management ${process.env.EMAIL_USER}`,
      mailTo: email,
      subject: "Updated OTP",
      body: `<p> Here is your OTP ${otp}, proceed to verify </p>`,
    });
    res.status(200).json({ message: "OTP is resent successfully" });
  } catch (error) {
    console.log(error);
  }
};
