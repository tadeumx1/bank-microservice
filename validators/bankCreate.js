const Joi = require("joi");

module.exports = {
  body: {
    bankName: Joi.string().required(),
    accountType: Joi.string().required(),
    creditCardLimit: Joi.number().required(),
  },
};
