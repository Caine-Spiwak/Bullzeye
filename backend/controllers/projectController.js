import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

// @desc		Get a User's Projects
// @route 	GET /api/projects
// @access 	Private
const getProjects = asyncHandler(async (req, res) => {
	const userId = req.params.id

	const projects = await Project.find({ userId: userId })

  res.status(200).json(projects)
})

// @desc		Create a Project
// @route 	POST /api/projects
// @access 	Private
const setProject = asyncHandler(async (req, res) => {
	if(!req.body.name) {
		res.status(400)
		throw new Error('Please add a name field')
	}

	const project = await Project.create({
		userId: req.body.userId,
		name: req.body.name
	})

	res.status(200).json(project)
})

// @desc	Update project
// @route 	PUT /api/projects/
// @access 	Private
const updateProject = asyncHandler(async (req, res) => {
	const projectId = req.body.projectId
	
	const data = {
		name: req.body.name,
		isActive: req.body.isActive
	}

	const project = await Project.findById(projectId)

	if(!project) {
		res.status(400)
		throw new Error('Project not found')
	}

	const updatedProject = await Project.findByIdAndUpdate(req.body.projectId, data, {new: true})

	res.status(200).json(updatedProject)
})

// @desc		Delete project
// @route 	DELETE /api/projects/:id
// @access 	Private
const deleteProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id)

	if(!project) {
		res.status(400)
		throw new Error('Project not found')
	}

	await project.deleteOne()


	res.status(200).json({ id: req.params.id })
})

export {
	getProjects,
	setProject,
	updateProject,
	deleteProject,
}