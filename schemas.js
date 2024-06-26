const Joi = require('joi')

module.exports.serviceSchema = Joi.object({
    service: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required()
    }).required()
})

module.exports.contactSchema = Joi.object({
    contact: Joi.object({
        phone: Joi.string().required(),
        email: Joi.string().required(),
        address: Joi.string().required()
    }).required()
})

module.exports.inquirySchema = Joi.object({
    inquiry: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        subject: Joi.string().required(),
        message: Joi.string().required()
    }).required()
})

module.exports.testimonialSchema = Joi.object({
    testimonial: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        message: Joi.string().required()
    }).required()
})
