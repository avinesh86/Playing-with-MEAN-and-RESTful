const mongoose = require('mongoose'),
Schema = mongoose.Schema,
State = require('./state');
Department = require('./department');
Designation = require('./designation');

const EmployeeSchema = new Schema({
firstName   : { type : String, required: true, trim: true },
lastName    : { type : String, required: true, trim: true },
email       : { type : String, required: true, trim: true },

designationId: { type : String, required: true, trim: true },
designation :Designation.schema,

departmentId: { type : String, required: true, trim: true },
department  : Department.schema,

address     : { type : String, required: true, trim: true },
city        : { type : String, required: true, trim: true },

stateId     : { type : Number, required: true },
state       : State.schema ,

zip         : { type : Number, required: true },
gender      : { type : String },
});

module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');
