/*
 ; Title:  item.js
 ; Author: Soliman Abdelmalak
 ; Date:   01 November 2021
 ; Description: item model.
*/

//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Item Schema, sprint 2
let itemSchema = new Schema({
    text: { type: String},
});
//exports itemSchema 
module.exports = itemSchema;