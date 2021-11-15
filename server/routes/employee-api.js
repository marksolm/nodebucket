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
const BaseResponse = require('../models/base-response')

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

/* API: updateTask */

router.put('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({empId: req.params.empId}, function(err, employee) {
      if (err) {
        // If there's an error, send a 500 status code error message back.
        console.log(err);
        const updateTaskServerErrorResponse = new BaseResponse('501', 'Mongo server error', err);
        res.status(501).send(updateTaskServerErrorResponse.toObject());

      } else {
        console.log(employee);
        employee.set({
          todo: req.body.todo,
          done: req.body.done
        });

        // Save the updated item(s) to the database
        employee.save(function(err, updateEmployee) {
          if (err) {
            console.log(err);
            const updateTaskMongoOnSaveErrorResponse = new BaseResponse('501', 'Mongo server error', err);
            res.status(501).send(updateTaskServerErrorResponse.toObject());

          } else {
            // Otherwise, send a successful update message
            console.log(updateEmployee);
            const updatedTaskSuccessResponse = new BaseResponse('200', 'Tasks successfully updated', updateEmployee);
            res.status(200).send(updatedTaskSuccessResponse.toObject());
          }
        })
      }
    })

  } catch (e) {
    // Catch any errors possibly missed by the try and send back a 500 status code and error message response
    console.log(e);
    const updateTaskServerErrorResponse = new BaseResponse('500', 'Internal server error', e.message);
    res.status(500).send(updateTaskServerErrorResponse.toObject());
  }
})


/*API: deleteTask */
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {
    // Query to find employeeId.
    Employee.findOne({empId: req.params.empId}, function(err, employee) {
      if (err) {
        // If there is an error occurs,  send a 500 status code error message back.
        console.log(err);
        const deleteTaskMongoDbErrorResp = new ErrorResponse('501', 'Mongo server error', err);
        res.status(501).send(deleteTaskMongoDbErrorResp.toObject());

      } else {
        console.log(employee);
        // Add the task based on its taskId into the appropriate array
        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, updatedToDoItemEmployee) {
            if (err) {
              // Send an error response back with a 500 status code.
              console.log(err);
              const deleteTaskSaveMongoDbErrorResp = new ErrorResponse('501', 'Mongo server error', err);
              res.status(501).send(deleteTaskSaveMongoDbErrorResp.toObject());

            } else {
              console.log(updatedToDoItemEmployee);
              const deleteToDoItemSuccessResp = new BaseResponse('200', 'Item Removed from the todo list', updatedToDoItemEmployee);
              res.status(200).send(deleteToDoItemSuccessResp.toObject());
            }
          })

        } else if (doneItem) {
          // Remove the item from the done Array if it found.
          employee.done.id(doneItem._id).remove();
          // Save the updated Array to the database
          employee.save(function(err, updatedDoneItemEmployee) {
            if (err) {
              // Send a response of a 500 status if there is an error.
              console.log(err);
              const deleteDoneItemSaveMongoDbErrorResp = new BaseResponse('500', 'Mongo server error', err);
              res.status(501).send(deleteDoneItemSaveMongoDbErrorResp.toObject());

            } else {
              // Otherwise send a response of successful with a 200 status code
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccessResp = new BaseResponse('200', 'Item Removed from the Done list', updatedDoneItemEmployee);
              res.status(200).send(deleteDoneItemSuccessResp.toObject());
            }
          })

        } else {
          // Send a 300 status code and a response that the task doesn't exist in the todo or done array.
          console.log('Invalid taskId' + req.params.taskId);
          const deleteTaskNotFoundResp = new BaseResponse('300', 'Unable to locate the requested task', req.params.taskId);
          res.status(300).send(deleteTaskNotFoundResp.toObject());
        }
      }
    })

  } catch (e) {
    // Catch any other missing errors.
    console.log(e);
    const deleteTaskCatchErrorResp = new BaseResponse('500', 'Internal server error', e);
    res.status(500).send(deleteTaskCatchErrorResp.toObject());
  }

})
module.exports = router;



       