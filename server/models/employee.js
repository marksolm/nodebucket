/*
 ; Title:  employee.js
 ; Author: Soliman Abdelmalak
 ; Date:   27 October 2021
 ; Description: employee model.
*/

//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require('./item');

// employee Schema, sprint 1
let employeeSchema = new Schema({
    empId: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [Item],
    done: [Item]
}, { collection: "employees" });
  // define the employee model
var Employee = mongoose.model("Employee", employeeSchema);

//expose the employee to calling files
module.exports = Employee;