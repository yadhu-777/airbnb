const Joi = require('joi');

let listingValidation = Joi.object({
    listing :Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required(),
        image: Joi.object({
            filename: Joi.string().allow(null, ""),
            url: Joi.string().allow(null, "")
        }).required(),
        location:Joi.string().required(),
        country:Joi.string().required()
    })
});





module.exports = listingValidation;