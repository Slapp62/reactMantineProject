import Joi from 'joi'

const editProfileSchema = Joi.object({
    name: {
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256).allow('').optional(),
        last: Joi.string().min(2).max(256).required()
    },

    phone: Joi.string().min(9).max(11).required().pattern(/^(?:\+972-?|0)?5\d([- ]?)\d{7}$/).messages({
        'string.pattern.base':'Please enter a valid Israeli phone number.'
    }),

    image: Joi.object({
        url: Joi.string().uri().allow(''),
        alt: Joi.string().min(2).max(256).allow(''),
    }).optional(),

    address: Joi.object({
        state: Joi.string().min(2).max(256).allow('').optional(),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.string().pattern(/^\d+$/).min(2).max(256).required(),
        zip: Joi.string().min(2).pattern(/^\d+$/).max(256).required(),
    }),
    
    isBusiness: Joi.boolean()
})

export {editProfileSchema}