import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './AuthPage.css';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: role },
      },
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert('Check your email for the confirmation link!');
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  const roleSelectionView = (
    <div className="role-selection">
      <h2>Are you a...</h2>
      <button onClick={() => setRole('student')}>Student</button>
      <button onClick={() => setRole('mentor')}>Mentor</button>
    </div>
  );

  const authFormView = (
    <form onSubmit={handleLogin}>
      <h2>Welcome, {role}!</h2>
      <p>Sign in or create an account to continue</p>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="auth-buttons">
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <button type="button" className="secondary-btn" onClick={handleSignup} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </div>
      <button type="button" className="link-button" onClick={() => setRole(null)}>
        Back to role selection
      </button>
    </form>
  );

  return (
    <div className="auth-container">
      <div className="auth-form">
        {!role ? roleSelectionView : authFormView}
      </div>
    </div>
  );
}