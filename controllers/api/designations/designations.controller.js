const designationsRepo = require('../../../lib/designationsRepository'),
util = require('util');

class DesignationsController {

constructor(router) {
  router.get('/', this.getDesignations.bind(this));
  router.get('/page/:skip/:top', this.getDesignationsPage.bind(this));
  router.get('/:id', this.getDesignation.bind(this));
  router.post('/', this.insertDesignation.bind(this));
  router.put('/:id', this.updateDesignation.bind(this));
  router.delete('/:id', this.deleteDesignation.bind(this));
}

getDesignations(req, res) {
  console.log('*** getDesignations');
  designationsRepo.getDesignations((err, data) => {
      if (err) {
          console.log('*** getDesignations error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getDesignations ok');
          res.json(data.departments);
      }
  });
}

getDesignationsPage(req, res) {
  console.log('*** getDesignationsPage');
  const topVal = req.params.top,
        skipVal = req.params.skip,
        top = (isNaN(topVal)) ? 10 : +topVal,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;

  designationsRepo.getPagedDesignations(skip, top, (err, data) => {
      res.setHeader('X-InlineCount', data.count);
      if (err) {
          console.log('*** getDesignationsPage error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getDesignationsPage ok');
          res.json(data.designations);
      }
  });
}

getDesignation(req, res) {
  console.log('*** getDesignation');
  const id = req.params.id;
  console.log(id);

  designationsRepo.getDesignation(id, (err, designation) => {
      if (err) {
          console.log('*** getDesignation error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getDesignation ok');
          res.json(designation);
      }
  });
}

insertDesignation(req, res) {
  console.log('*** insertDesignation');
    designationsRepo.insertDesignation(req.body, (err, designation) => {
        if (err) {
            console.log('*** designationsRepo.insertDesignation error: ' + util.inspect(err));
            res.json({status: false, error: 'Insert failed', designation: null});
        } else {
            console.log('*** insertDesignation ok');
            res.json({ status: true, error: null, designation: designation });
        }
    });
}

updateDesignation(req, res) {
  console.log('*** updateDesignation');
  console.log('*** req.body');
  console.log(req.body);
    designationsRepo.updateDesignation(req.params.id, req.body, (err, designation) => {
        if (err) {
            console.log('*** updateDesignation error: ' + util.inspect(err));
            res.json({ status: false, error: 'Update failed', designation: null });
        } else {
            console.log('*** updateDesignation ok');
            res.json({ status: true, error: null, designation: designation });
        }
    });
}

deleteDesignation(req, res) {
  console.log('*** deleteDesignation');

  designationsRepo.deleteDesignation(req.params.id, (err) => {
      if (err) {
          console.log('*** deleteDesignation error: ' + util.inspect(err));
          res.json({ status: false });
      } else {
          console.log('*** deleteDesignation ok');
          res.json({ status: true });
      }
  });
}

}

module.exports = DesignationsController;