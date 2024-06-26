import Joi from "joi";

export const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.string().min(11).required(),
    role: Joi.string().required(),
    isVerified: Joi.boolean(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
