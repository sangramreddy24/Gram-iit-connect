import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { session, signOut } = useAuth();
  
  // --- MOCK ROLE LOGIC ---
  // In a real app, this should come from session.user.user_metadata.role
  const mockUserRole = session ? (session.user?.user_metadata?.role || 'student') : null;
  const isMentor = mockUserRole === 'mentor';
  const isStudent = mockUserRole === 'student';
  // ------------------------

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">RuralEdu</Link>
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        {session ? (
          <>
            {/* Conditional Allies Link based on role */}
            {isMentor && <Link to="/my-allies">My Allies (M)</Link>}
            {isStudent && <Link to="/student/my-allies">My Allies (S)</Link>}
            
            <Link to="/update-profile">My Profile</Link>
            <a href="#!" onClick={signOut}>Sign Out</a>
          </>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </nav>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
    </header>
  );
}

export default Header;