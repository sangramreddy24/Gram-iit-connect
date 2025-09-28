import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './MyAllies.css'; // Assuming you create a dedicated CSS file

export default function MyAllies() {
  // Placeholder data for students
  const allies = [
    { id: 1, name: 'Student A' },
    { id: 2, name: 'Student B' },
    { id: 3, name: 'Student C' },
  ];

  // Placeholder for the ally list, since mapping is not ready
  const AllyCard = ({ name, id }) => (
    <div className="ally-card">
      <h3>{name}</h3>
      <div className="ally-actions">
        {/* The link to the new recommendation page */}
        <Link to={`/recommend-resource/${id}`} className="action-button recommend-btn">
          Recommend Resources
        </Link>
        {/* Placeholder for the chat functionality */}
        <button className="action-button chat-btn" onClick={() => alert(`Chat feature coming soon for ${name}!`)}>
          Chat 💬
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="my-allies-container">
        <div className="my-allies-header">
          <h1>My Allies (Students)</h1>
          <p>Connect with your mentees and provide valuable resources to help them succeed.</p>
        </div>
        
        <div className="ally-list">
          {allies.map(ally => (
            <AllyCard key={ally.id} name={ally.name} id={ally.id} />
          ))}
          
          {/* Default/Empty State Card */}
          <div className="ally-card default-ally-card">
            <h3>Find Your Next Ally</h3>
            <p>Your current student list is small. Look for students in your region to mentor!</p>
            <button className="action-button recommend-btn">Find Students</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}