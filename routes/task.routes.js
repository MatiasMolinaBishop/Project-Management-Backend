// routes/task.routes.js

const router = require("express").Router();
// const mongoose = require('mongoose');

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

//  POST /api/tasks  -  Creates a new task

//This route performs two actions on the database: creates a new task and updates an existing project. 
//Once the new task document is created, we use its _id to update the corresponding project document. 
//We update the project document by pushing the _id of the new task to the tasks array:

router.post('/tasks', (req, res, next) => {
    const { title, description, projectId } = req.body;

    Task.create({ title, description, project: projectId })
        .then(newTask => {
            return Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } });
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});

module.exports = router;
