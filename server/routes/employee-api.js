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

module.exports = router;
