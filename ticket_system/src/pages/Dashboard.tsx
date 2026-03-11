import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Unauthorized</p>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.username} ({user.role})</h1>
      <nav>
        <ul>
          <li>
            <Link to="/tickets">View tickets</Link>
          </li>
          <li>
            <Link to="/create">Create a ticket</Link>
          </li>
        </ul>
      </nav>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
