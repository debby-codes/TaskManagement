import User from "../../schemas/userSchema.js";
import bcrypt from "bcryptjs";
import { generateOTP, sendMail } from "../../utils/sendEmail/barrel.js";

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400).json({ message: "Please provide all fields" });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // generate otp and otp expiration date
    const { otp, otpExpires } = generateOTP();

    // hashed password
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      admin: false,
      otp,
      otpExpires,
    });
    await newUser.save();
    try {
      // send email
      const mailObj = {
        mailFrom: `Task Management  ${process.env.EMAIL_USER}`,
        mailTo: email,
        subject: "Successfully created an account ",
        body: `<h1> Welcome to Task Management   ${userName} </h1>
        <p>Here is youur otp ${otp} proceed to verify your account </p>
        <p>Please procced to create a to do list and enjoy the experience</p>
          </p`,
      };

      await sendMail(mailObj);
    } catch (error) {
      console.log(error);
    }
    res.status(201).json({ message: "New user created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
