import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { session, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // This will log the profile object every time the header updates
  console.log("Current user profile:", profile);

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
            <Link to="/resources">Resources</Link>
            {profile?.role === 'mentor' && (
              <Link to="/add-resource">Add Resource</Link>
            )}
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