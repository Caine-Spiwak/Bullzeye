import './Dashboard.css'
import { BiEdit } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md"
import { useGetProjectsQuery, useCreateProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } from '../slices/projectsApiSlice'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { defaultActiveProject, removeActiveProject, setActiveProject } from '../slices/activeProjectSlice';




const Dashboard = () => {
  const dispatch = useDispatch()
  // State
  const [newProjectName, setNewProjectName] = useState('')
  const [editProjectId, setEditProjectId] = useState('')
  const [editProjectName, setEditProjectName] = useState('')
  const [isHovering, setIsHovering] = useState(null)
  const { userInfo } = useSelector((state) => state.auth)
  const { activeProjectId } = useSelector((state) => state.activeProject)

  // Query & Mutations
  const { data: projects, isLoading, error } = useGetProjectsQuery(userInfo._id);
  const [ createProject ] = useCreateProjectMutation()
  const [ deleteProject ] = useDeleteProjectMutation()
  const [ updateProject ] = useUpdateProjectMutation()

  // API Call Functions
  const handleCreateProject = async () => {
    const res = await createProject({ name: newProjectName, userId: userInfo._id })
    dispatch(setActiveProject(res.data._id))
    console.log(res)
    setNewProjectName('')
  }

  const handleDeleteProject = async (projectId) => {
    await deleteProject(projectId)
    dispatch(removeActiveProject())
  }

  const handleUpdateProject = async (id) => {
    await updateProject({ projectId: id, name: editProjectName})
    setEditProjectName('')
    setEditProjectId('')
  }

  // USE EFFECT
  useEffect(() => {
    dispatch(defaultActiveProject(projects))
  })


  if ( isLoading ) return <p>Loading</p>
  if ( error ) return <div>{ error?.data?.message || error.error }</div>

  return (
    <div className="window">
      <div className="sidebar">
        <div className="project-section">
          <div className="project-section-header">
            <input 
              placeholder="New Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => {if (e.key === 'Enter') handleCreateProject()}}
            >
            </input>
            <button 
              className='add-project-btn'
              onClick={ handleCreateProject }
            >
              +
            </button>
          </div>
          <hr></hr>
          <p>Projects</p>
          <ul className='project-list'>
            {projects.map((project) => (
              <div key={project._id}>
                {project._id !== editProjectId ? (
                  <li
                    className={`project ${project._id === activeProjectId ? "active" : ""}`}
                    onClick={() => dispatch(setActiveProject(project._id))}
                    onMouseEnter={() => setIsHovering(project._id)}
                    onMouseLeave={() => setIsHovering(null)}
                  >
                    {project.name}
                    <div className={`project-btns ${isHovering === project._id ? "" : "hidden"}`}>
                      <BiEdit
                        className='project-btn'
                        onClick={() => setEditProjectId(project._id)}
                      >
                      </BiEdit>
                      <AiOutlineDelete
                        className='project-btn del-btn'
                        onClick={() => handleDeleteProject(project._id) }
                      >
                      </AiOutlineDelete>
                    </div>
                  </li>
                ) : (
                  <li className="edit-project-li">
                    <input
                      className="edit-project-input"
                      defaultValue={project.name}
                      onChange={(e) => setEditProjectName(e.target.value)}
                      onKeyDown={(e) => {if (e.key === 'Enter') handleUpdateProject(project._id)}}
                      onBlur={() => setEditProjectId('') && setEditProjectName('')}
                      autoFocus
                    >
                    </input>
                    <div className="project-btns">
                      <MdCheckCircleOutline 
                        className='project-btn update-btn'
                        onClick={() => handleUpdateProject(project._id)}
                        
                      />
                      <MdOutlineCancel 
                        className='project-btn cancel-edit-btn'
                        onClick={() => setEditProjectId('') && setEditProjectName('')}
                      />
                    </div>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>  
      <div className="content"></div>
    </div>
  )
}

export default Dashboard