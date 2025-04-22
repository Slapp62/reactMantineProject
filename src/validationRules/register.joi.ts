import Joi from 'joi'

const registrationSchema = Joi.object({
    name: {
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256),
        last: Joi.string().min(2).max(256).required()
    },

    phone: Joi.string().min(9).max(11).required(),

    email: Joi.string().min(5).required(),
    password: Joi.string().min(7).max(20).required(),

    image: {
        url: Joi.string().min(14),
        alt: Joi.string().min(2).max(256)
    },

    address: {
        state: Joi.string().min(2).max(256),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.string().pattern(/^\d+$/).min(2).max(256).required(),
        zip: Joi.string().min(2).pattern(/^\d+$/).max(256).required(),
    },
    
    isBusiness: Joi.boolean()
})

export {registrationSchema}