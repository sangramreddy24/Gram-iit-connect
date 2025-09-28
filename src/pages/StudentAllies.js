import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './StudentAllies.css'; // New CSS file for specific styles

// Mock data for demonstration until backend mapping and recommendations are ready
const mockMentor = {
  name: 'Anil Kumar',
  institute: 'IIT Bombay',
  branch: 'Computer Science',
  availableTimings: 'Tuesdays & Fridays, 7:00 PM - 8:30 PM IST',
};

const mockResources = [
  { subject: 'Physics', topic: 'Electromagnetism', type: 'YouTube', title: 'Capacitor Basics', link: 'https://youtube.com/example1' },
  { subject: 'Mathematics', topic: null, type: 'Textbook', title: 'RD Sharma Class 12', link: null },
  { subject: 'Chemistry', topic: 'Organic Reactions', type: 'Article', title: 'Advanced Substitution Mechanism', link: 'https://article.com/example2' },
  { subject: 'Physics', topic: 'Thermodynamics', type: 'YouTube', title: '1st Law Explained', link: 'https://youtube.com/example3' },
];

// Helper component to render a single resource
const ResourceItem = ({ item }) => (
  <div className="resource-item">
    <span className="resource-icon">{item.type === 'YouTube' ? '▶️' : item.type === 'Textbook' ? '📘' : '📰'}</span>
    <div className="resource-info">
      <p className="resource-title">{item.title}</p>
      <p className="resource-meta">
        **{item.subject}** {item.topic && ` / ${item.topic}`}
      </p>
      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="resource-link">
          View Resource
        </a>
      )}
    </div>
  </div>
);

export default function StudentAllies() {
  // Group resources by subject for topic-wise display
  const groupedResources = mockResources.reduce((acc, resource) => {
    acc[resource.subject] = acc[resource.subject] || [];
    acc[resource.subject].push(resource);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <div className="student-allies-container">
        <h1>My Allies Dashboard</h1>
        <p>Your one-stop place for mentorship, resources, and career guidance.</p>

        <div className="allies-grid">
          {/* Block 1: Recommended Resources */}
          <div className="ally-block resources-block">
            <h2>Recommended Resources 📚</h2>
            <div className="resource-list">
              {Object.entries(groupedResources).map(([subject, resources]) => (
                <div key={subject} className="subject-group">
                  <h4 className="subject-title">{subject}</h4>
                  {/* Resources are recently given, so simply display the list */}
                  {resources.map((item, index) => (
                    <ResourceItem key={index} item={item} />
                  ))}
                </div>
              ))}
              {mockResources.length === 0 && <p className="empty-state">Your mentor hasn't recommended any resources yet!</p>}
            </div>
          </div>
          
          {/* Block 2: My Mentor Information */}
          <div className="ally-block mentor-info-block">
            <h2>My Mentor 🧑‍🏫</h2>
            <p><strong>Name:</strong> {mockMentor.name}</p>
            <p><strong>Institute:</strong> {mockMentor.institute}</p>
            <p><strong>Branch:</strong> {mockMentor.branch}</p>
            <p className="mentor-time"><strong>Available Timings:</strong> {mockMentor.availableTimings}</p>
          </div>
          
          {/* Block 3: Chat with Mentor */}
          <div className="ally-block chat-block">
            <h2>Live Chat 💬</h2>
            <p>Connect instantly with your mentor for quick doubts or scheduling.</p>
            <button 
              className="chat-button" 
              onClick={() => alert('Starting chat with ' + mockMentor.name + '... (Feature coming soon)')}
            >
              Start Chat Now
            </button>
          </div>
          
          {/* Block 4: Career Path Recommendation */}
          <div className="ally-block career-path-block">
            <h2>Career Path Guide 💡</h2>
            <p>Explore opportunities after completing the MPC stream.</p>
            <div className="career-image-container">
              {/* Placeholder for the career path image/AI output */}
              <p style={{fontStyle: 'italic', color: '#666'}}>
                [Image/AI Career Recommendation Placeholder: Career Opportunities after MPC Stream]
              </p>
            </div>
            <button className="career-button">
              View AI Recommendation
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}