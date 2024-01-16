import { FaRegCheckCircle } from "react-icons/fa";
import { useUpdateTaskMutation } from "../../../slices/tasksApiSlice";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";



const TaskDescriptionEdit = ({ task, editDescId, setEditDescId }) => {
  const { activeProjectId } = useSelector((state) => state.activeProject)
  // State
  const [ taskDesc, setTaskDesc] = useState('')

  // Reference
  const textAreaRef = useRef(null)

  // Query & Muatations
  const [ updateTask ] = useUpdateTaskMutation()
  
  // API Call Functions 
  const handleEditTaskDesc = async () => {
    const data = {
      projectId: activeProjectId,
      taskId: editDescId,
      description: taskDesc
    }
    await updateTask(data)
    setEditDescId('')
    setTaskDesc('')
  }

  useEffect(() => {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }, [taskDesc])

  return (
    <div className='task-description'>
      <textarea
        className='task-description-input'
        defaultValue={task.description}
        onChange={(e) => setTaskDesc(e.target.value)}
        autoFocus
        ref={textAreaRef}
        rows={1}
      >
      </textarea>
      <FaRegCheckCircle
        className='edit-task-description-btn task-icon'
        style={{'color': 'green'}}
        onClick={() => handleEditTaskDesc()}
      >
      </FaRegCheckCircle>
    </div>
  )
}

export default TaskDescriptionEdit