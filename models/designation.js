
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const DesignationSchema = new Schema({
designationName   : { type : String, required: true, trim: true },
description    : { type : String },
});

module.exports = mongoose.model('Designation', DesignationSchema, 'designations');
