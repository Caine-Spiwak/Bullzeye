import express from 'express'
const router = express.Router()
import {
    getProjects,
    setProject,
    updateProject,
    deleteProject
} from '../controllers/projectController.js'

router.get('/:id', getProjects)
router.post('/', setProject)
router.put('/', updateProject)
router.delete('/:id', deleteProject)

export default router