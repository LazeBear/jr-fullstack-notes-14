const { Schema, model } = require('mongoose');
const Joi = require('joi');
// joi, express-validator, validator.js

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        // const validation = Joi.string().email().validate(email);
        // const { error } = validation;
        // // error 有值，代表joi的验证失败
        // if (error) {
        //   // 返回false 代表mongoose的验证失败
        //   return false;
        // }
        // return true;
        // regex
        return !Joi.string().email().validate(email).error;
      },
      msg: 'Invalid email format',
    },
  },
  courses: [
    {
      type: String,
      ref: 'Course',
    },
  ],
});

module.exports = model('Student', schema);
