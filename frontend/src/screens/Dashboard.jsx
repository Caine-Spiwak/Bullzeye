import './Dashboard.css'
import ProjectSection from '../features/projects/components/ProjectSection.jsx';

const Dashboard = () => {

  return (
    <div className="window">
      <div className="sidebar">
        <ProjectSection />
      </div>  
      <div className="content"></div>
    </div>
  )
}

export default Dashboard