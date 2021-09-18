const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      uppercase: true,
      alias: 'code',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    updatedAt: {
      type: Date,
      select: false,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// same as the alias above
// schema.virtual('code').get(function () {
//   return this._id;
// })

// courses
const model = mongoose.model('Course', schema);

module.exports = model;
