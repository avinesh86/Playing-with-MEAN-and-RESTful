const employeesRepo = require('../../../lib/employeesRepository'),
designatinsRepo = require('../../../lib/designationsRepository'),
departmentsRepo = require('../../../lib/departmentsRepository'),
statesRepo = require('../../../lib/statesRepository'),
util = require('util');

class EmployeesController {

constructor(router) {
  router.get('/', this.getEmployees.bind(this));
  router.get('/page/:skip/:top', this.getEmployeesPage.bind(this));
  router.get('/:id', this.getEmployee.bind(this));
  router.post('/', this.insertEmployee.bind(this));
  router.put('/:id', this.updateEmployee.bind(this));
  router.delete('/:id', this.deleteEmployee.bind(this));
}

getEmployees(req, res) {
  console.log('*** getEmployees');
  employeesRepo.getEmployees((err, data) => {
      if (err) {
          console.log('*** getEmployees error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getEmployees ok');
          res.json(data.employees);
      }
  });
}

getEmployeesPage(req, res) {
  console.log('*** getEmployeesPage');
  const topVal = req.params.top,
        skipVal = req.params.skip,
        top = (isNaN(topVal)) ? 10 : +topVal,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;

  employeesRepo.getPagedEmployees(skip, top, (err, data) => {
      res.setHeader('X-InlineCount', data.count);
      if (err) {
          console.log('*** getEmployeesPage error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getEmployeesPage ok');
          res.json(data.employees);
      }
  });
}

getEmployee(req, res) {
  console.log('*** getEmployee');
  const id = req.params.id;
  console.log(id);

  employeesRepo.getEmployee(id, (err, employee) => {
      if (err) {
          console.log('*** getEmployee error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getEmployee ok');
          res.json(employee);
      }
  });
}

insertEmployee(req, res) {
  console.log('*** insertEmployee');
  statesRepo.getState(req.body.stateId, (err, state) => {
      if (err) {
          console.log('*** statesRepo.getState error: ' + util.inspect(err));
          res.json({ status: false, error: 'State not found', employee: null });
      } else {
            designationsRepo.getDesignation(req.body.designationId, (err, designation) => {
                if (err) {
                    console.log('*** designationsRepo.getDesignation error: ' + util.inspect(err));
                    res.json({ status: false, error: 'Designation not found', employee: null });
                } else {
                    departmentsRepo.getDepartment(req.body.departmentId, (err, department) => {
                        if (err) {
                            console.log('*** departmentsRepo.getDepartment error: ' + util.inspect(err));
                            res.json({ status: false, error: 'Department not found', employee: null });
                        } else {
                            employeesRepo.insertEmployee(req.body, state, designation, department, (err, employee) => {
                                if (err) {
                                    console.log('*** employeesRepo.insertEmployee error: ' + util.inspect(err));
                                    res.json({status: false, error: 'Insert failed', employee: null});
                                } else {
                                    console.log('*** insertEmployee ok');
                                    res.json({ status: true, error: null, employee: employee });
                                }
                            });
                        }
                    });
                }
            });
      }
  });
}




updateEmployee(req, res) {
  console.log('*** updateEmployee');
  console.log('*** req.body');
  console.log(req.body);

  if (!req.body || !req.body.stateId) {
      throw new Error('Employee and associated stateId required');
  }
  if (!req.body || !req.body.designationId) {
    throw new Error('Employee and associated designationId required');
  }
  if (!req.body || !req.body.departmentId) {
    throw new Error('Employee and associated departmentId required');
  }

  statesRepo.getState(req.body.stateId, (err, state) => {
      if (err) {
          console.log('*** statesRepo.getState error: ' + util.inspect(err));
          res.json({ status: false, error: 'State not found', customer: null });
      } else {
        designationsRepo.getDesignation(req.body.designationId, (err, designation) => {
            if (err) {
                console.log('*** designationsRepo.getDesignation error: ' + util.inspect(err));
                res.json({ status: false, error: 'Designation not found', employee: null });
            } else {
                departmentsRepo.getDepartment(req.body.departmentId, (err, department) => {
                    if (err) {
                        console.log('*** departmentsRepo.getDepartment error: ' + util.inspect(err));
                        res.json({ status: false, error: 'Department not found', employee: null });
                    } else {
                        employeesRepo.updateEmployee(req.params.id, req.body, state, designation, department, (err, customer) => {
                            if (err) {
                                console.log('*** updateCustomer error: ' + util.inspect(err));
                                res.json({ status: false, error: 'Update failed', eemployee: null });
                            } else {
                                console.log('*** updateEmployee ok');
                                res.json({ status: true, error: null, employee: employee });
                            }
                        });
                    }
                });
            }
        });
      }
    });
}

deleteEmployee(req, res) {
  console.log('*** deleteEmployee');

  employeesRepo.deleteEmployee(req.params.id, (err) => {
      if (err) {
          console.log('*** deleteEmployee error: ' + util.inspect(err));
          res.json({ status: false });
      } else {
          console.log('*** deleteEployee ok');
          res.json({ status: true });
      }
  });
}

}

module.exports = EmployeesController;