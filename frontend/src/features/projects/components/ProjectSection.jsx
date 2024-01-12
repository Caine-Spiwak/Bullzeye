import '../../projects/ProjectSection.css'
import { useGetProjectsQuery, useCreateProjectMutation } from '../../../slices/projectsApiSlice'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { defaultActiveProject, setActiveProject } from '../../../slices/activeProjectSlice';
import Project from '../components/Project';
import ProjectEdit from '../components/ProjectEdit';



const ProjectSection = () => {
	const dispatch = useDispatch()
  // State
  const [newProjectName, setNewProjectName] = useState('')
  const [editProjectId, setEditProjectId] = useState('')
  const { userInfo } = useSelector((state) => state.auth)

  // Query & Mutations
  const { data: projects, isLoading, error } = useGetProjectsQuery(userInfo._id);
  const [ createProject ] = useCreateProjectMutation()

  // API Call Functions
  const handleCreateProject = async () => {
    const res = await createProject({ name: newProjectName, userId: userInfo._id })
    dispatch(setActiveProject(res.data._id))
    console.log(res)
    setNewProjectName('')
  }

  // USE EFFECT
  useEffect(() => {
    dispatch(defaultActiveProject(projects))
  })



  if ( isLoading ) return <p>Loading</p>
  if ( error ) return <div>{ error?.data?.message || error.error }</div>
  return (
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
					<li key={project._id}>
						{project._id !== editProjectId ? (
							<Project project={project} setEditProjectId={setEditProjectId}/>
						) : (
							<ProjectEdit project={project} setEditProjectId={setEditProjectId}/>
						)}
					</li>
				))}
			</ul>
		</div>
  )
}

export default ProjectSection