import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login-page">
      <h1>Select role to log in</h1>
      <button onClick={() => login('user1', 'user')}>Utilisateur</button>
      <button onClick={() => login('admin1', 'admin')}>Administrateur</button>
      <button onClick={() => login('supervisor1', 'supervisor')}>Superviseur</button>
    </div>
  );
};

export default Login;
