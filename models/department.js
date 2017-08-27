const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
      departmentName   : { type : String, required: true, trim: true },
      description    : { type : String },
});

module.exports = mongoose.model('Department', DepartmentSchema, 'departments');
