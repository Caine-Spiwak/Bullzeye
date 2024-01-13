import './Dashboard.css'
import ProjectSection from '../features/projects/components/ProjectSection.jsx';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  return (
    <div className="window">
      <div className="sidebar">
        <ProjectSection />
        <div className='profile-section'>
          <Link to='/profile'>Profile</Link>
        </div>
      </div>  
      <div className="content"></div>
    </div>
  )
}

export default Dashboard