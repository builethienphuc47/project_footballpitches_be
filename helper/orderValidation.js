const Joi = require("joi");
const { errorFunction } = require("../utils/errorFunction");

const patternPhoneNummber =  /[0]{1}[0-9]{9}/;

const addOrderSchema = Joi.object({
  userId: Joi.string().max(100).required(),
  customerName: Joi.string().min(5).max(100).required(),
  phone: Joi.string().trim()
    .length(10)
    .pattern(new RegExp(patternPhoneNummber))
    .required(),
  pitchId: Joi.string().required(),
  pitchName: Joi.string().max(100).required(),
  pitchSize: Joi.number().required(),
  timeOrder: Joi.string().required(),
  dateOrder: Joi.string().required(),
  price: Joi.number().required(),
  orderStatus: Joi.number().required(),
});

const ordersValidation = async (req, res, next) => {
  const { error } = addOrderSchema.validate(req.body); //req.body
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, 406, `Error is User Data: ${error.message}`)
    );
  } else {
    next();
  }
};
module.exports = { ordersValidation };
