// models/Task.model.js
//Each project will hold a reference to one or more Task documents coming from another collection, 
//so let’s create the model for that collection.

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
    title: String,
    description: String,
    project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = model('Task', taskSchema);
