import React from 'react';
import SuccessStoryCard from './SuccessStoryCard';
import './SuccessStoriesSection.css';

// Dummy data - later, you will fetch this from Supabase
const stories = [
  {
    title: "From My Village to IIT Bombay",
    author: "Priya Sharma",
    snippet: "I never thought it was possible, but with the right mentorship and resources, I cracked JEE Advanced...",
    image: "https://i.pravatar.cc/150?img=1" // Placeholder image
  },
  {
    title: "Cracking NEET on the First Attempt",
    author: "Amit Kumar",
    snippet: "The curated notes and weekly tests were a game-changer for my biology preparation. Today, I'm studying at AIIMS.",
    image: "https://i.pravatar.cc/150?img=2" // Placeholder image
  },
  {
    title: "How I Overcame My Fear of Physics",
    author: "Rohan Das",
    snippet: "My mentor helped me build a strong foundation. I went from failing my class tests to scoring 98 percentile.",
    image: "https://i.pravatar.cc/150?img=3" // Placeholder image
  }
];

function SuccessStoriesSection() {
  return (
    <section className="stories-section">
      <div className="container">
        <h2>Inspiring Journeys from Our Community</h2>
        <p className="subtitle">Read about students just like you who achieved their dreams.</p>
        <div className="stories-grid">
          {stories.map((story, index) => (
            <SuccessStoryCard
              key={index}
              title={story.title}
              author={story.author}
              snippet={story.snippet}
              image={story.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStoriesSection;