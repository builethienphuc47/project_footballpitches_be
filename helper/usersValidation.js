const Joi = require('joi');
const { errorFunction } = require('../utils/errorFunction');


// const patternPhoneNummber = /[0]{1}{0-9}{9}/;
const patternPassword = /^[a-zA-Z0-9]{5,30}$/;

const validation = Joi.object({
    name: Joi.string().trim().min(5).max(100).required(),
    email: Joi.string().trim().email({ tlds: { allow: false } }).allow(''),
    isAdmin: Joi.boolean().required(),
    phone: Joi.string().length(10).required().trim(),
    password: Joi.string().trim().pattern(new RegExp(patternPassword)).required(),
});

const usersValidation = async (req, res, next) => {
     const payload = {
         name: req.body.name,
         email: req.body.email,
         isAdmin: req.body.isAdmin,
         phone: req.body.phone,
         password: req.body.password
     }

     const {error} = validation.validate(payload) //req.body
     if(error) {
         res.status(406)
         return res.json(
             errorFunction(true, 406, `Error is User Data: ${error.message}`)
         )
     } else {
        next()
     }
}
module.exports = { usersValidation }

