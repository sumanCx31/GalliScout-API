const Joi = require("joi");

const propertyDTO = Joi.object({
    _id: Joi.string().optional(), 
    title: Joi.string().min(2).max(200).required(),
    description: Joi.string().min(20).required(),
    price: Joi.number().positive().required(),
    location: Joi.object({
        coordinates: Joi.array().items(Joi.number()).length(2).required(),
        formattedAddress: Joi.string().required()
    }).required(),
    images: Joi.array().items(Joi.object()).optional(), 
    nearby_amenities: Joi.string().optional(),
    status: Joi.string().valid('vacant', 'occupied').default('vacant'),
    owner: Joi.string().optional(),
});

const updatePropertyDTO = propertyDTO.fork(
    ['title', 'description', 'price', 'location'], 
    (field) => field.optional()
);

module.exports = { propertyDTO, updatePropertyDTO };