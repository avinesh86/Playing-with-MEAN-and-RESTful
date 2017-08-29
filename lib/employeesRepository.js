const mongoose = require('mongoose'),
Schema = mongoose.Schema,
Employee = require('../models/employee');

class EmployeesRepository {

// get all the employee
getEmployees(callback) {
  console.log('*** EmployeesRepository.getEmployees');
  Employee.count((err, empsCount) => {
      var count = empsCount;
      console.log(`Employees count: ${count}`);

      Employee.find({}, (err, employees) => {
          if (err) { 
              console.log(`*** EmployeesRepository.getEmployees error: ${err}`); 
              return callback(err); 
          }
          callback(null, {
              count: count,
              employees: employees
          });
      });

  });
}

getPagedEmployees(skip, top, callback) {
  console.log('*** EmployeesRepository.getPagedEmployees');
  Employee.count((err, empsCount) => {
      var count = empsCount;
      console.log(`Skip: ${skip} Top: ${top}`);
      console.log(`Employees count: ${count}`);

      Employee.find({})
              .sort({lastName: 1})
              .skip(skip)
              .limit(top)
              .exec((err, employees) => {
                  if (err) { 
                      console.log(`*** EmployeesRepository.getPagedEmployees error: ${err}`); 
                      return callback(err); 
                  }
                  callback(null, {
                      count: count,
                      employees: employees
                  });
              });

  });
}

// get the employee summary
getEmployeesSummary(skip, top, callback) {
  console.log('*** EmployeesRepository.getEmployeesSummary');
  Employee.count((err, empsCount) => {
      var count = empsCount;
      console.log(`Employees count: ${count}`);

      Employee.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'gender': 1 })
              .skip(skip)
              .limit(top)
              .exec((err, employeesSummary) => {
                  callback(null, {
                      count: count,
                      employeesSummary: employeesSummary
                  });
              });

  });
}

// get a  customer
getEmployee(id, callback) {
  console.log('*** EmployeesRepository.getEmployee');
  Employee.findById(id, (err, employee) => {
      if (err) { 
          console.log(`*** EmployeesRepository.getEmployee error: ${err}`); 
          return callback(err); 
      }
      callback(null, employee);
  });
}

// insert a  customer
insertEmployee(body, state, designation, department, callback) {
  console.log('*** EmployeesRepository.insertEmployee');
  console.log(state);
  var employee = new Employee();
  var newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
  var newDesignation = { 'id': designation[0].id, 'designationName': designation[0].designationName, 'description': designation[0].description }
  var newDepartment = { 'id': department[0].id, 'departmentName': department[0].departmentName, 'description': department[0].description }
  console.log(body);

  employee.firstName = body.firstName;
  employee.lastName = body.lastName;
  employee.email = body.email;
  employee.designation = newDesignation;
  employee.department = newDepartment;
  employee.address = body.address;
  employee.city = body.city;
  employee.state = newState;
  employee.stateId = newState.id;
  employee.zip = body.zip;
  employee.gender = body.gender;

  employee.save((err, employee) => {
      if (err) { 
          console.log(`*** EmployeesRepository insertEmployee error: ${err}`); 
          return callback(err, null); 
      }

      callback(null, employee);
  });
}

updateEmployee(id, body, state, designation, department, callback) {
  console.log('*** EmployeesRepository.editEmployee');

  var state = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
  var Designation = { 'id': designation[0].id, 'designationName': designation[0].designationName, 'description': designation[0].description }
  var Department = { 'id': department[0].id, 'departmentName': department[0].departmentName, 'description': department[0].description }
  
  Employee.findById(id, (err, employee)  => {
      if (err) { 
          console.log(`*** EmployeesRepository.editEmployee error: ${err}`); 
          return callback(err); 
      }

      employee.firstName = body.firstName || employee.firstName;
      employee.lastName = body.lastName || employee.lastName;
      employee.email = body.email || employee.email;
      employee.designation = designation;
      employee.designationId = designation.id;
      employee.department = department;
      employee.departmentId = department.id;
      employee.address = body.address || employee.address;
      employee.city = body.city || employee.city;
      employee.state = state;
      employee.stateId = state.id;
      employee.zip = body.zip || employee.zip;
      employee.gender = body.gender || employee.gender;


      employee.save((err, employee) => {
          if (err) { 
              console.log(`*** EmployeesRepository.updateEmployee error: ${err}`); 
              return callback(err, null); 
          }

          callback(null, employee);
      });

  });
}

// delete a employee
deleteEmployee(id, callback) {
  console.log('*** EmployeesRepository.deleteEmployee');
  Customer.remove({ '_id': id }, (err, customer) => {
      if (err) { 
          console.log(`*** EmployeesRepository.deleteEmployee error: ${err}`); 
          return callback(err, null); 
      }
      callback(null, employee);
  });
}

}

module.exports = new EmployeesRepository();