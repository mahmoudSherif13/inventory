const mongoose = require('mongoose');
const dbErrors = require('../dbErrorsMessages');

const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    min: [3, dbErrors.fewChars],
    max: [500, dbErrors.manyChars],
    required: [true, dbErrors.required],
  },
  description: String,
});

tagSchema.virtual('url')
  // eslint-disable-next-line func-names
  .get(function () {
    // eslint-disable-next-line no-underscore-dangle
    return `/tag/${this._id}`;
  });

module.exports = mongoose.model('Tag', tagSchema);
