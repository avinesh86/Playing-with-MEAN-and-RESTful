const mongoose = require('mongoose'),
Schema = mongoose.Schema,
Designation = require('../models/designation');

class DesignationsRepository {

// get all the departments
getDesignations(callback) {
  console.log('*** DesignationsRepository.getDesignations');
  Designation.count((err, desCount) => {
      var count = desCount;
      console.log(`Designation count: ${count}`);

      Designation.find({}, (err, designations) => {
          if (err) { 
              console.log(`*** designationsRepository.getDesignations error: ${err}`); 
              return callback(err); 
          }
          callback(null, {
              count: count,
              designations: designations
          });
      });

  });
}

getPagedDesignations(skip, top, callback) {
  console.log('*** DesignationsRepository.getPagedDesignations');
  Designation.count((err, desCount) => {
      var count = desCount;
      console.log(`Skip: ${skip} Top: ${top}`);
      console.log(`Designation count: ${count}`);

      Designation.find({})
              .sort({designationName: 1})
              .skip(skip)
              .limit(top)
              .exec((err, designations) => {
                  if (err) { 
                      console.log(`*** designationsRepository.getPagedDesignations error: ${err}`); 
                      return callback(err); 
                  }
                  callback(null, {
                      count: count,
                      designations: designations
                  });
              });

  });
}

// get the designations summary
getDesignationsSummary(skip, top, callback) {
  console.log('*** DesignationsRepository.getDesignationsSummary');
  Designation.count((err, desCount) => {
      var count = desCount;
      console.log(`Designation count: ${count}`);

      Designation.find({}, { '_id': 0, 'designationName': 1})
              .skip(skip)
              .limit(top)
              .exec((err, designationsSummary) => {
                  callback(null, {
                      count: count,
                      designationsSummary: designationsSummary
                  });
              });
  });
}

// get a  designation
getDesignation(id, callback) {
  console.log('*** DesignationsRepository.getDepartment');
  Designation.findById(id, (err, designation) => {
      if (err) { 
          console.log(`*** DesignationsRepository.getDesignation error: ${err}`); 
          return callback(err); 
      }
      callback(null, designation);
  });
}

// insert a  designation
insertDesignation(body, callback) {
  console.log('*** DesignationsRepository.insertDesignation');
  var designation = new Designation();
  console.log(body);

  designation.designationName = body.designationtName;
  designation.description = body.description;

  designation.save((err, department) => {
      if (err) { 
          console.log(`*** DesignationsRepository insertDesignation error: ${err}`); 
          return callback(err, null); 
      }

      callback(null, designation);
  });
}

updateDesignation(id, body, callback) {
  console.log('*** DesignationRepository.editDesignation');

  Designation.findById(id, (err, designation)  => {
      if (err) { 
          console.log(`*** DesignationsRepository.editDesignation error: ${err}`); 
          return callback(err); 
      }

      designation.designationtName = body.designationName || designation.designationtName;
      designation.description = body.description || designation.description;

      designation.save((err, designation) => {
          if (err) { 
              console.log(`*** DesignationsRepository.updateDesignation error: ${err}`); 
              return callback(err, null); 
          }

          callback(null, designation);
      });

  });
}

// delete a department
deleteDesignation(id, callback) {
  console.log('*** DesignationRepository.deleteDesignation');
  Designation.remove({ '_id': id }, (err, designation) => {
      if (err) { 
          console.log(`*** DesignationRepository.deleteDesignation error: ${err}`); 
          return callback(err, null); 
      }
      callback(null, designation);
  });
}

}

module.exports = new DesignationsRepository();