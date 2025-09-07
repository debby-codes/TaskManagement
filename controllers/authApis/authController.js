import User from "../../schemas/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail, generateOTP } from "../../utils/sendEmail/barrel.js";

export const logingIn = async (req, res) => {
  const { email, password, userName } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "please provide all fields" });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ message: "User not found please register first to continue" });
      return;
    }
    if (user.isVerified === false)
      return res.status(400).json({ message: "otp is not verified" });
    const compared = await bcrypt.compare(password, user.password);
    if (!compared) {
      res.status(401).json({ message: "Invalid details" });
      return;
    }
    const genToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60m" });
    };
    // send email
    const mailObj = {
      mailFrom: `Task Management ${process.env.EMAIL_USER}`,
      mailTo: email,
      subject: "successfully logged in",
      body: `<h1> Welcome to Task Management ${userName} </h1>
    <p>You have successfully logged in </p>
    <p>Please procced to create a to do list and enjoy the experience</p>
  </p>
    `,
    };
    await sendMail(mailObj);
    const token = genToken(user._id);
    return res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .status(200)
      .json({ message: "Login Successful proceed to create a to do list" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// reset password request
export const passwordResetRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ message: "User not found please register first to continue" });
      return;
    }

    const { token, otpExpires } = generateOTP();
    user.passwordResetToken = token;
    user.passwordResetExpires = otpExpires;
    await user.save();

    await sendMail({
      mailFrom: `Task Management${process.env.EMAIL_USER}`,
      mailTo: email,
      subject: "Reset Password Request",
      body: `<p>Click on this link to reset your password </p>  <a href="https://localhost:500/password/reset/${token}">Reset Password</a>`,
    });
    res
      .status(200)
      .json({ message: "Password reset request sent successfully" });
  } catch (error) {
    console.log(error);
  }
};
//reset password
export const passwordReset = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      token: token,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or expired" });

    user.password = bcrypt.hashSync(newPassword, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    return res.status(200).json({
      message:
        "Password reset successfully, proceed to login with your new password",
    });
  } catch (error) {
    console.log(error);
  }
};
