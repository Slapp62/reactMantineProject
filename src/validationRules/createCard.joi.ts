import Joi from 'joi'

const cardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    
    phone: Joi.string().min(9).max(11).required().pattern(/^(?:\+972-?|0)?5\d([- ]?)\d{7}$/).messages({
        'string.pattern.base':'Please enter a valid Israeli phone number.'
    }),

    email: Joi.string().min(5).email({tlds: {allow:false}}).required().messages({
        'string.min':'Email is too short',
        'any.required': 'Email is required',
    }),

    web: Joi.string().min(14).uri().allow('').optional(),

    image: Joi.object({
        url: Joi.string().uri().allow('').optional(),
        alt: Joi.string().min(2).max(256).allow('').optional(),
    }).optional(),

    address: Joi.object({
        state: Joi.string().min(2).max(256).allow('').optional(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.string().pattern(/^\d+$/).min(1).required(),
        zip: Joi.string().pattern(/^\d+$/).allow('').optional(),
    }),
    
})

export {cardSchema}