import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <nav>
        <Link to="/">Home</Link>
        {user && <Link to="/tickets">Tickets</Link>}
        {user && <Link to="/create">Create</Link>}
      </nav>
      {user && (
        <div className="user-info">
          <span>{user.username} ({user.role})</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
