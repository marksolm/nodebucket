/*
============================================
; Title:  employee-api.js
; Author: Professor Krasso
; Date:   27 October 2021
; Description: NodeBucket app API
;===========================================
*/

const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

/* API findEmployeeById */
router.get("/:empId", async (req, res) => {
    // query MongoDB Atlas by employeeId using Mongoose
    try {
        Employee.findOne({'empId': req.params.empId}, function(err, employee) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `Internal server error!`
                })
            } else {
                /** If there are no database errors, return the employee object */
                console.log(employee);
                res.json(employee);
            }
        })
    } catch (e) {
        /** catch any errors that we didnt prepare for */
        console.log(e);
        res.status(500).send({
            'message': `Internal server error!`
        })
    }
})

/* API createTask */

router.post('/:empId/tasks', async(req, res)=>{
  try {
      Employee.findOne({ empId: req.params.empId }, function (err, employee) {
        if (err) {
          console.log(err);
          res.status(500).send({
            'message': `Internal server error: ', err.message`
        });
        } else {
          console.log(employee);
          const newTask = {text: req.body.text};
          employee.todo.push(newTask);
          employee.save(function (err, updatedEmployee) {
            if (err) {
              console.log(err);
              res.status(500).send({
                'message': `Internal server error: ', err.message`
              });
            } else {
              console.log(updatedEmployee);
              res.json(updatedEmployee);
            }
          })
        }
      })
    } catch (e) {
      console.log(e);
      res.status(500).send({
        'message': `Internal server error: ', err.message`
      })
    }
  })

  /* API findAllTasks */

  router.get('/:empId/tasks', async(req, res)=>{
    try {
      Employee.findOne({empId: req.params.empId}, 'empId todo done', function(err, employee) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Internal server error: " + err.message,
          });

  
        } else {
            console.log(employee);
            res.json(employee);
        }
      })
  
    } catch (e) {
        console.loge(e);
        res.status(500).send({
            message: "Internal server error: " + e.message,
        });
    }
    })
  
  
module.exports = router;
