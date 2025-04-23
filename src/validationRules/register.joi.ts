import Joi from 'joi'

const registrationSchema = Joi.object({
    name: {
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256),
        last: Joi.string().min(2).max(256).required()
    },

    phone: Joi.string().min(9).max(11).required().pattern(/^(?:\+972-?|0)?5\d([- ]?)\d{7}$/).messages({
        'string.pattern.base':'Please enter a valid Israeli phone number.'
    }),

    email: Joi.string().email({tlds: {allow:false}}).required().messages({
        'string.min':'Email is too short',
        'any.required': 'Email is required',
    }),

    password: Joi.string().max(20).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-]).{7,20}$/).messages({
            'string.pattern.base': 'Password must be between 7 and 20 characters and contain at least 1 uppercase, 1 number, and 1 special character '
        }),

    image: Joi.object({
        url: Joi.string().uri().allow(''),
        alt: Joi.string().min(2).max(256).allow(''),
    }).optional(),

    address: Joi.object({
        state: Joi.string().min(2).max(256),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.string().pattern(/^\d+$/).min(2).max(256).required(),
        zip: Joi.string().min(2).pattern(/^\d+$/).max(256).required(),
    }),
    
    isBusiness: Joi.boolean()
})

export {registrationSchema}