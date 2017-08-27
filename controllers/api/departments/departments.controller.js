const departmentsRepo = require('../../../lib/departmentsRepository'),
util = require('util');

class DepartmentsController {

constructor(router) {
  router.get('/', this.getDepartments.bind(this));
  router.get('/page/:skip/:top', this.getDepartmentsPage.bind(this));
  router.get('/:id', this.getDepartment.bind(this));
  router.post('/', this.insertDepartment.bind(this));
  router.put('/:id', this.updateDepartment.bind(this));
  router.delete('/:id', this.deleteDepartment.bind(this));
}

getDepartments(req, res) {
  console.log('*** getDepartments');
  departmentsRepo.getDepartments((err, data) => {
      if (err) {
          console.log('*** getDepartments error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getDepartments ok');
          res.json(data.departments);
      }
  });
}

getDepartmentsPage(req, res) {
  console.log('*** getDepartmentsPage');
  const topVal = req.params.top,
        skipVal = req.params.skip,
        top = (isNaN(topVal)) ? 10 : +topVal,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;

  departmentsRepo.getPagedDepartments(skip, top, (err, data) => {
      res.setHeader('X-InlineCount', data.count);
      if (err) {
          console.log('*** getDepartmentsPage error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getDepartmentsPage ok');
          res.json(data.departments);
      }
  });
}

getDepartment(req, res) {
  console.log('*** getDepartment');
  const id = req.params.id;
  console.log(id);

  departmentsRepo.getDepartment(id, (err, department) => {
      if (err) {
          console.log('*** getDepartment error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getDepartment ok');
          res.json(department);
      }
  });
}

insertDepartment(req, res) {
  console.log('*** insertDepartment');
    departmentsRepo.insertDepartment(req.body, (err, department) => {
        if (err) {
            console.log('*** departmentRepo.insertDepartment error: ' + util.inspect(err));
            res.json({status: false, error: 'Insert failed', department: null});
        } else {
            console.log('*** insertDepartment ok');
            res.json({ status: true, error: null, department: department });
        }
    });
}

updateDepartment(req, res) {
  console.log('*** updateDepartment');
  console.log('*** req.body');
  console.log(req.body);
    departmentsRepo.updateDepartment(req.params.id, req.body, (err, department) => {
        if (err) {
            console.log('*** updateDepartment error: ' + util.inspect(err));
            res.json({ status: false, error: 'Update failed', department: null });
        } else {
            console.log('*** updateDepartment ok');
            res.json({ status: true, error: null, department: department });
        }
    });
}

deleteDepartment(req, res) {
  console.log('*** deleteDepartment');

  departmentsRepo.deleteDepartment(req.params.id, (err) => {
      if (err) {
          console.log('*** deleteDepartment error: ' + util.inspect(err));
          res.json({ status: false });
      } else {
          console.log('*** deleteDepartment ok');
          res.json({ status: true });
      }
  });
}

}

module.exports = DepartmentsController;