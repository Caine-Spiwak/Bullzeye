import '../TaskSection.css'
import { IoIosAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux"
import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from "../../../slices/tasksApiSlice"
import { useCreateTodoMutation } from '../../../slices/todosApiSlice'
import TodoSection from '../../todos/components/TodoSection';
import { useState } from 'react';
import TaskDescription from './TaskDescription';
import TaskDescriptionEdit from './TaskDescriptionEdit';


const TaskSection = () => {
  const { activeProjectId } = useSelector((state) => state.activeProject)
  // State
  const [newTaskName, setNewTaskName] = useState('')
  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskNameId, setEditTaskNameId] = useState('')
  const [editDescId, setEditDescId] = useState('')

  // Query & Mutations 
  const { data: tasks, isLoading, error } = useGetTasksQuery(activeProjectId)
  const [ createTask ] = useCreateTaskMutation()
  const [ updateTask ] = useUpdateTaskMutation()
  const [ deleteTask ] = useDeleteTaskMutation()
  const [ createTodo ] = useCreateTodoMutation()
	
  // API Call Functions
  const handleCreateTask = async () => {
    await createTask({ projectId: activeProjectId, name: newTaskName})
    setNewTaskName('')
  }

  const handleCreateTodo = async (taskId) => {
    await createTodo({ projectId: activeProjectId, taskId: taskId})
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
          className='new-task-input'
          placeholder="New Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') handleCreateTask()}}
          onBlur={() => setNewTaskName('')}
        >
        </input>
      </div>
      <hr className='task-header-hr'></hr>
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
                  className='task-header'
                >
                  <div 
                    className='task-name'
                    onDoubleClick={() => setEditTaskNameId(task._id)}
                  >
                    {task.name}
                  </div>
                </div>
              ) : (
                <div className="task-header">
                  <input
                    className='edit-task-name-input'
                    defaultValue={task.name}
                    onChange={(e) => setEditTaskName(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter') handleEditTaskName()}}
                    onBlur={() => setEditTaskNameId('')}
                    autoFocus
                  >
                  </input>
                </div>
              )}
              {task._id !== editDescId ? (
                <TaskDescription 
                  task={task} 
                  setEditDescId={setEditDescId}
                />
              ) : (
                <TaskDescriptionEdit 
                  task={task}
                  editDescId={editDescId}
                  setEditDescId={setEditDescId}
                />
              )}
              <TodoSection task={task} taskId={task._id}/>
            </div>
            <div className='task-control'>
              <AiOutlineDelete
                className='del-task-btn'
                onClick={() => handleDeleteTask(task._id)}
              >
              </AiOutlineDelete>
              <IoIosAdd
                className='add-todo-btn'
                onClick={() => handleCreateTodo(task._id)}
              >
              </IoIosAdd>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskSection