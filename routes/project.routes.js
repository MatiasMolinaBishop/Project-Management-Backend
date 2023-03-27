// routes/project.routes.js

const router = require("express").Router();

// const mongoose = require('mongoose');
//Here we require the Project model as we will use this model to communicate with our data base
const Project = require('../models/Project.model');
//We also require the Task model as it will be needed to create tasks on the projetcs
const Task = require('../models/Task.model');

//  POST /api/projects  -  Creates a new project
router.post('/projects', (req, res, next) => {
    const { title, description } = req.body;

    Project.create({ title, description, tasks: [] })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});

router.get("/projects", async (req, res, next) => {
    try {
        const projects = await Project.find().populate('tasks')
        res.json(projects);

    } catch (err) {
        console.log(err)
    }
});

router.get("/projects/:id", async (req, res, next) => {
    const id = req.params.id

    try {
        const project = await Project.findById(id).populate('tasks')
        res.json(project);
    } catch (err) {
        console.log(err)
    }
})

router.put("/projects/:id", async (req, res, nect) => {
    const id = req.params.id
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updatedProject);

    } catch (err) {
        console.log(err)
    }
})

router.delete("/projects/:id", async (req, res, next) => {
    const id = req.params.id

    try {
        await Project.findByIdAndDelete(id)
        res.json('DELETED');

    } catch (err) {
        console.lg(err)
    }
})

module.exports = router;
