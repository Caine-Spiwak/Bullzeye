import express from 'express'
const router = express.Router()
import {
  createTodo, deleteTodo, getTodos, updateTodo
} from '../controllers/todoController.js'

router.post('/', createTodo)
router.get('/', getTodos)
router.put('/', updateTodo)
router.delete('/', deleteTodo)

export default router