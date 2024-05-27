import mongoose from "mongoose";
import Joi from "joi";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true, minLength: 5 },
  createdAt: { type: Date, expires: "15m", default: Date.now() },
});

export const Otp = mongoose.model("Otp", otpSchema);

export const otpValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().min(5).required(),
  });

  return schema.validate(data);
};
