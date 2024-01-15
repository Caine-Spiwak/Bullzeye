import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

// @desc    Create Todo
// @route   POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
  const projectId = req.body.projectId
  const taskId = req.body.taskId

  const project = await Project.findById(projectId)
  const task = project.tasks.id(taskId)

  const newTodo = {
    description: 'todo'
  }

  task.todos.push(newTodo)

  await project.save()

  res.status(201).json(newTodo)
})

// @desc    Get Todo
// @route   GET /api/todos
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const projectId = req.body.projectId
  const taskId = req.body.taskId

  const project = await Project.findById(projectId)
  const task = project.tasks.id(taskId)

  const todos = task.todos

  res.status(201).json(todos)
})

// @desc    Update Todo
// @route   PUT /api/todos
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const projectId = req.body.projectId
  const todoId = req.body.todoId
  const taskId = req.body.taskId

  const project = await Project.findById(projectId)
  const task = project.tasks.id(taskId)
  const todoToUpdate = task.todos.id(todoId)

  todoToUpdate.description = req.body.description

  await project.save()

  res.status(201).json(project)
})

// @desc    Delete Todo
// @route   DELETE /api/todos
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const projectId = req.body.projectId
  const todoId = req.body.todoId
  const taskId = req.body.taskId

  const project = await Project.findById(projectId)
  const task = project.tasks.id(taskId)
  const todoToDelete = task.todos.id(todoId)

  todoToDelete.deleteOne()

  await project.save()

  res.status(201).json({ message: 'Todo Deleted Successfully'})
})

export {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
}