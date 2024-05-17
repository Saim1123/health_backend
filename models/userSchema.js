import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.methods.generateOTP = function () {
//   const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
//   this.otp = otp;
//   this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
//   return otp;
// };

export const Users = mongoose.model("Users", userSchema);
