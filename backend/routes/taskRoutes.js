import express from 'express'
const router = express.Router()
import {
    createTask,
    deleteTask,
    getTasks,
    updateTask
} from '../controllers/taskController.js'

router.post('/', createTask)
router.get('/:id', getTasks)
router.put('/', updateTask)
router.delete('/', deleteTask)

export default router