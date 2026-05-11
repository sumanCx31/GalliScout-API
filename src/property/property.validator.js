const Joi = require("joi");

const propertyDTO = Joi.object({
    title: Joi.string().min(10).max(200).required(),
    description: Joi.string().min(20).required(),
    price: Joi.number().positive().required(),
    location: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    nearby_amenities: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('vacant', 'occupied').default('vacant')
});

const updatePropertyDTO = propertyDTO.fork(
    ['title', 'description', 'price', 'location', 'images'], 
    (field) => field.optional()
);

module.exports = { propertyDTO, updatePropertyDTO };