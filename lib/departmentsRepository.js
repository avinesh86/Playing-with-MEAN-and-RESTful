const mongoose = require('mongoose'),
Schema = mongoose.Schema,
Department = require('../models/department');

class DepartmentsRepository {

// get all the departments
getDepartments(callback) {
  console.log('*** DepartmentsRepository.getDepartments');
  Department.count((err, deptCount) => {
      var count = deptCount;
      console.log(`Departments count: ${count}`);

      Department.find({}, (err, departments) => {
          if (err) { 
              console.log(`*** departmentsRepository.getDepartments error: ${err}`); 
              return callback(err); 
          }
          callback(null, {
              count: count,
              departments: departments
          });
      });

  });
}

getPagedDepartments(skip, top, callback) {
  console.log('*** DepartmentsRepository.getPagedDepartments');
  Department.count((err, deptCount) => {
      var count = deptCount;
      console.log(`Skip: ${skip} Top: ${top}`);
      console.log(`Departments count: ${count}`);

      Department.find({})
              .sort({departmentName: 1})
              .skip(skip)
              .limit(top)
              .exec((err, departments) => {
                  if (err) { 
                      console.log(`*** departmentsRepository.getPagedDepartments error: ${err}`); 
                      return callback(err); 
                  }
                  callback(null, {
                      count: count,
                      departments: departments
                  });
              });

  });
}

// get the department summary
getDepartmentsSummary(skip, top, callback) {
  console.log('*** DepartmentsRepository.getDepartmentsSummary');
  Department.count((err, deptCount) => {
      var count = deptCount;
      console.log(`Department count: ${count}`);

      Department.find({}, { '_id': 0, 'departmentName': 1})
              .skip(skip)
              .limit(top)
              .exec((err, departmentsSummary) => {
                  callback(null, {
                      count: count,
                      departmentsSummary: departmentsSummary
                  });
              });
  });
}

// get a  department
getDepartment(id, callback) {
  console.log('*** DepartmentsRepository.getDepartment');
  Department.findById(id, (err, department) => {
      if (err) { 
          console.log(`*** DepartmentsRepository.getDepartment error: ${err}`); 
          return callback(err); 
      }
      callback(null, department);
  });
}

// insert a  department
insertDepartment(body, callback) {
  console.log('*** DepartmentsRepository.insertDepartment');
  var department = new Department();
  console.log(body);

  department.departmentName = body.departmentName;
  department.description = body.description;

  department.save((err, department) => {
      if (err) { 
          console.log(`*** DepartmentsRepository insertDepartment error: ${err}`); 
          return callback(err, null); 
      }

      callback(null, department);
  });
}

updateDepartment(id, body, callback) {
  console.log('*** DepartmentsRepository.editDepartment');

  Department.findById(id, (err, department)  => {
      if (err) { 
          console.log(`*** DepartmentsRepository.editDepartment error: ${err}`); 
          return callback(err); 
      }

      department.departmentName = body.departmentName || department.departmentName;
      department.description = body.description || department.departmentName;

      department.save((err, department) => {
          if (err) { 
              console.log(`*** DepartmentsRepository.updateDepartment error: ${err}`); 
              return callback(err, null); 
          }

          callback(null, department);
      });

  });
}

// delete a department
deleteDepartment(id, callback) {
  console.log('*** DepartmentRepository.deleteDepartment');
  Customer.remove({ '_id': id }, (err, department) => {
      if (err) { 
          console.log(`*** DepartmentRepository.deleteDepartment error: ${err}`); 
          return callback(err, null); 
      }
      callback(null, department);
  });
}

}

module.exports = new DepartmentsRepository();