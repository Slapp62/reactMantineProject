import Joi from 'joi'

const loginSchema = Joi.object({
    email:
        Joi.string()
        .email({tlds: {allow:false}})
        .required()
        .messages({
            'string.min':'Email is too short',
            'any.required': 'Email is required',
        }),

    password:
        Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)
        .messages({
            'string.pattern.base':'Password must be a minimum 8 characters and contain at least one uppercase letter, number, and special character',
            'any.required': 'Password is required',
        }),

    rememberMe: Joi.boolean(),
})

export {loginSchema}