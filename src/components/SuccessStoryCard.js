import React from 'react';
import './SuccessStoryCard.css'; // We will create this CSS file next

function SuccessStoryCard({ title, author, snippet, image }) {
  return (
    <div className="success-story-card">
      <div className="author-info">
        <img src={image} alt={author} className="author-image" />
        <span className="author-name">{author}</span>
      </div>
      <h3>{title}</h3>
      <p className="snippet">{snippet}</p>
      <a href="SuccessStoriesPage.js" className="read-more-btn">Read More &rarr;</a>
    </div>
  );
}

export default SuccessStoryCard;