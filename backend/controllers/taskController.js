import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

// @desc 		Create a Task
// @route 	POST /api/tasks
// @access	Private
const createTask = asyncHandler( async (req, res) => {
	const projectId = req.body.projectId
	const project = await Project.findById(projectId)

	const newTask = {
		name: req.body.name
	}

	project.tasks.push(newTask)
	await project.save()

	res.status(201).json(newTask)
})

// @desc 		Get Tasks
// @route 	GET /api/tasks
// @access	Private
const getTasks = asyncHandler( async (req, res) => {
	const projectId = req.params.id
	const project = await Project.findById(projectId)

	const tasks = project.tasks

	res.status(200).json(tasks)
})

// @desc 		Update Task
// @route 	PUT /api/tasks
// @access	Private
const updateTask = asyncHandler( async (req, res) => {
	const projectId = req.body.projectId
	const taskId = req.body.taskId

	const project = await Project.findById(projectId)
	const taskToUpdate = project.tasks.id(taskId)

	taskToUpdate.name = req.body.name || taskToUpdate.name
	taskToUpdate.description = req.body.description || taskToUpdate.description

	await project.save()

	res.status(200).json(taskToUpdate)
})

// @desc 		Delete Task
// @route 	DELETE /api/tasks
// @access	Private
const deleteTask = asyncHandler( async (req, res) => {
	const projectId = req.body.projectId
	const taskId = req.body.taskId

	const project = await Project.findById(projectId)
	const taskToDelete = project.tasks.id(taskId)

	taskToDelete.deleteOne()

	await project.save()

	res.status(200).json({ message: 'Task deleted Successfully'})
})

export {
	createTask,
	getTasks,
	updateTask,
	deleteTask
}