import crypto from "crypto";
export const generateOTP = () => {
  return {
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
    otpExpires: new Date(Date.now() + 20 * 60 * 1000),

    token: crypto.randomBytes(32).toString("hex"),
  };
};
