import React from 'react';

function SuccessStoriesPage() {
  return (
    <div>
      {/* You'll need to add your Navbar here */}
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>All Success Stories</h1>
        <p>This page will display a full gallery of all success stories from mentors.</p>
        {/* You can reuse the <SuccessStoryCard /> component here to list all stories */}
      </div>
    </div>
  );
}

export default SuccessStoriesPage;