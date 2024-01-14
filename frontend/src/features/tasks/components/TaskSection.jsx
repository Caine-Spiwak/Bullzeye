import '../TaskSection.css'
import { BiEdit } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux"
import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from "../../../slices/tasksApiSlice"
import { useState } from "react"





const TaskSection = () => {
  const { activeProjectId } = useSelector((state) => state.activeProject)
  // State
  const [newTaskName, setNewTaskName] = useState('')
  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskNameId, setEditTaskNameId] = useState('')

  const [editDesc, setEditDesc] = useState('')
  const [editDescId, setEditDescId] = useState('')

  const [nameHoveringId, setNameHoveringId] = useState('')
  const [descHoveringId, setDescHoveringId] = useState('')

  // Query & Mutations 
  const { data: tasks, isLoading, error } = useGetTasksQuery(activeProjectId)
  const [ createTask ] = useCreateTaskMutation()
  const [ updateTask ] = useUpdateTaskMutation()
  const [ deleteTask ] = useDeleteTaskMutation()
	
  // API Call Functions
  const handleCreateProject = async () => {
    await createTask({ projectId: activeProjectId, name: newTaskName})
    setNewTaskName('')
  }

  const handleEditTaskName = async () => {
    const data = {
      projectId: activeProjectId,
      taskId: editTaskNameId,
      name: editTaskName
    }
    await updateTask(data)
    setEditTaskNameId('')
    setEditTaskName('')
  }

  const handleEditTaskDesc = async () => {
    const data = {
      projectId: activeProjectId,
      taskId: editDescId,
      description: editDesc
    }
    await updateTask(data)
    setEditDescId('')
    setEditDesc('')
  }

  const handleDeleteTask = async (taskId) => {
    const data = {
      projectId: activeProjectId,
      taskId: taskId,
    }
    await deleteTask(data)
  }

  if ( isLoading ) return <p>Loading</p>
  if ( error ) return <div>{ error?.data?.message || error.error }</div>
  return (
    <div className="task-section">
      <div className="task-section-header">
        <input
          placeholder="New Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        >
        </input>
        <button 
          type="button"
          onClick={ handleCreateProject }
        >
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {tasks.length < 1 && <p>No Tasks</p>}
        {tasks.map((task, index) => (
          <li key={task._id} className='task'>
            <div className='order'>
              <div className='order-number'>{index + 1}</div>
            </div>
            <div className='task-content'>
              {task._id !== editTaskNameId ? (
                <div 
                  className='task-name'
                  onMouseEnter={() => setNameHoveringId(task._id)}
                  onMouseLeave={() => setNameHoveringId('')}
                >
                  <div>{task.name}</div>
                  <BiEdit 
                    className={`edit-task-name-btn ${task._id === nameHoveringId ? '' : 'hidden' }`}
                    onClick={() => setEditTaskNameId(task._id)}
                  >
                  </BiEdit>
                </div>
              ) : (
                <input
                  defaultValue={task.name}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  onKeyDown={(e) => {if (e.key === 'Enter') handleEditTaskName()}}
                  onBlur={() => setEditTaskNameId('')}
                  autoFocus
                >
                </input>
              )}
              {task._id !== editDescId ? (
                <div 
                  className='task-description'
                  onMouseEnter={() => setDescHoveringId(task._id)}
                  onMouseLeave={() => setDescHoveringId('')}
                >
                  {task.description}
                <BiEdit
                  className={`edit-task-description-btn ${task._id === descHoveringId ? '' : 'hidden' }`}
                  onClick={() => setEditDescId(task._id)}
                >
                </BiEdit>
              </div>
              ) : (
                <textarea
                defaultValue={task.description}
                onChange={(e) => setEditDesc(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter') handleEditTaskDesc()}}
                onBlur={() => setEditDescId('')}
                autoFocus
                >
                </textarea>
              )}
              <div className='todo-list'></div>
            </div>
            <div className='task-control'>
              <AiOutlineDelete
                className='del-task-btn'
                onClick={() => handleDeleteTask(task._id)}
              >
              </AiOutlineDelete>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskSection