const Joi = require("joi");

const UserRegisterationDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    role: Joi.string().allow('passenger','driver','admin').default("passenger"),
    gender: Joi.string().allow('male','female','other').optional().default(null),
})

module.exports = UserRegisterationDTO;