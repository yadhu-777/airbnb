const Joi = require('joi');

let listingValidation = Joi.object({
    listing :Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().allow(null,""),
        location:Joi.string().required(),
        country:Joi.string().required()
    })
});





module.exports = listingValidation;