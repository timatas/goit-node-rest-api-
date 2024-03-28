// import Joi from "joi";

// export const createContactSchema = Joi.object({

// })

// export const updateContactSchema = Joi.object({

// })
const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = { createContactSchema };
