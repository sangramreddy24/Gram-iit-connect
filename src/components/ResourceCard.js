import React from 'react';
import './ResourceCard.css'; // We will create this CSS file

function ResourceCard({ resource }) {
  return (
    <div className="resource-card">
      <div className={`subject-tag ${resource.subject.toLowerCase()}`}>
        {resource.subject}
      </div>
      <h3>{resource.title}</h3>
      <p className="author">by {resource.author}</p>
      <p className="description">{resource.description}</p>
      <div className="details-grid">
        <span><strong>Class:</strong> {resource.target_class}</span>
        <span><strong>Level:</strong> {resource.difficulty}</span>
      </div>
      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="view-button">
        View Resource
      </a>
    </div>
  );
}

export default ResourceCard;