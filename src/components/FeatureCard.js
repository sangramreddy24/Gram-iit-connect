import React from 'react';

// A simple map of titles to emoji icons
const iconMap = {
  'Relatable Mentorship': '🤝',
  'Curated Resources': '📚',
  'Opportunity Awareness': '💡',
};

function FeatureCard({ title, description }) {
  return (
    <div className="feature-card">
      <div className="icon">{iconMap[title] || '⭐'}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;