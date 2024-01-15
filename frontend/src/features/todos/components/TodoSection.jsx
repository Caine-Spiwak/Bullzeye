import { useState } from "react"
import { useSelector } from "react-redux"
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../../../slices/todosApiSlice"
import { AiOutlineDelete } from "react-icons/ai";





const TodoSection = ({task, taskId}) => {
  const { activeProjectId } = useSelector((state) => state.activeProject)
  // State
  const [editTodoId, setEditTodoId] = useState('')
  const [editTodoDesc, setEditTodoDesc] = useState('')
  const [hoveringId, setHoveringId] = useState('')

  // Query & Mutations
  const [ updateTodo ] = useUpdateTodoMutation()
  const [ deleteTodo ] = useDeleteTodoMutation()

  // API Call Functions
  const handleEditTodo = async () => {
    const data = {
      projectId: activeProjectId,
      todoId: editTodoId,
      description: editTodoDesc,
      taskId: taskId
    }
    await updateTodo(data)
    setEditTodoId('')
    setEditTodoDesc('')
  }

  const handleDeleteTodo = async (todoId) => {
    const data = {
      projectId: activeProjectId,
      taskId: taskId,
      todoId: todoId
    }
    await deleteTodo(data)
  }

  return (
    <ul className='todo-list'>
      {task.todos.map((todo, index) => (
        <li className='todo' key={todo._id}>
          <div>{index + 1}</div>
          {todo._id !== editTodoId ? (
            <div 
              className="todo-section"
              onDoubleClick={() => setEditTodoId(todo._id)}
              onMouseEnter={() => setHoveringId(todo._id)}
              onMouseLeave={() => setHoveringId('')}
            >
              <div className='todo-description'>{todo.description}</div>
              <AiOutlineDelete
                className={`del-todo-btn ${todo._id === hoveringId ? '' : 'hidden'}`}
                onClick={() => handleDeleteTodo(todo._id)}
              >
              </AiOutlineDelete>
            </div>
          ) : (
            <input
              className="edit-todo-input"
              onKeyDown={(e) => {if (e.key === 'Enter') handleEditTodo()}}
              defaultValue={todo.description}
              onChange={(e) => setEditTodoDesc(e.target.value)}
              autoFocus
            >
            </input>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TodoSection