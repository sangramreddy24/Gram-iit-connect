import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './AuthPage.css';

export default function AuthPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const [isLogin, setIsLogin] = useState(true); // Toggles between Login and Signup form mode
    const [message, setMessage] = useState(''); // User feedback message
    const navigate = useNavigate();

    // Utility function to set the role and switch to the form view
    const selectRole = (selectedRole) => {
        setRole(selectedRole);
        setMessage('');
        setIsLogin(true); // Default to login when entering the form
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        let error = null;

        if (isLogin) {
            // LOGIN
            const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
            error = loginError;
        } else {
            // SIGNUP
            const { error: signupError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { role: role },
                },
            });
            error = signupError;
        }

        if (error) {
            setMessage(error.message || 'An unexpected error occurred during authentication.');
        } else {
            if (isLogin) {
                // Successful login handled by AuthContext, navigate manually to ensure flow
                navigate('/'); 
            } else {
                setMessage('Success! Check your email for the confirmation link to activate your account.');
                // Switch to login view after successful registration prompt
                setIsLogin(true);
            }
        }
        setLoading(false);
    };

    // THIS IS THE UPDATED ROLE SELECTION VIEW
    const roleSelectionView = (
        <div className="role-selection">
            {/* Using the standard arrow icon here to maintain consistency */}
            <div className="auth-header-icon">{'➡️'}</div>
            <h2>Are you joining as a...</h2>
            
            <div className="role-selection-grid">
                {/* Student Card */}
                <button className="role-card" onClick={() => selectRole('student')}>
                    <span className="role-icon">🎓</span>
                    Student
                </button>
                
                {/* Mentor Card */}
                <button className="role-card" onClick={() => selectRole('mentor')}>
                    <span className="role-icon">🧑‍🏫</span>
                    Mentor
                </button>
            </div>
        </div>
    );

    const authFormView = (
        <form onSubmit={handleAuth}>
            <div className="auth-header-icon">{'➡️'}</div>
            <h2>{isLogin ? `Sign in as ${role}` : `Register as ${role}`}</h2>
            <p>
                {isLogin 
                    ? 'Welcome back! Enter your credentials to continue.' 
                    : 'Create your account to start your journey.'
                }
            </p>

            <div className="input-group">
                <span className="input-icon">{'📧'}</span>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
            </div>
            
            <div className="input-group">
                <span className="input-icon">{'🔒'}</span>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
            </div>

            {/* Forgot password link is typically a link to a separate page */}
            {isLogin && (
                <a href="#!" className="forgot-password-link">Forgot password?</a>
            )}

            {message && <p style={{ color: message.includes('Success') ? 'green' : 'red', marginTop: '1rem', fontWeight: 500 }}>{message}</p>}

            <div className="auth-buttons">
                <button type="submit" disabled={loading}>
                    {loading ? (isLogin ? 'Signing In...' : 'Registering...') : 'Get Started'}
                </button>
            </div>
            
            <div className="separator">
                {isLogin ? 'Or sign up with' : 'Or sign in with'}
            </div>

            <div className="social-buttons">
                 {/* This button serves as the dedicated Sign Up button */}
                <button 
                    type="button" 
                    onClick={() => setIsLogin(!isLogin)}
                    disabled={loading}
                >
                    {isLogin ? 'Create Account' : 'Back to Sign In'}
                </button>
            </div>
            
            <button type="button" className="link-button" onClick={() => setRole(null)} disabled={loading}>
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