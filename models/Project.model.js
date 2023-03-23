// models/Project.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const projectSchema = new Schema({
    title: String,
    description: String,
    //We are referencing the Task model to make a relationship between the project and the tasks.
    //Taks follow a different model as a single project can have many tasks (ONE TO MANY)
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
    // owner will be added later on
});

module.exports = model('Project', projectSchema);
