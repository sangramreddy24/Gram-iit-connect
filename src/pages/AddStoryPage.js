import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient'; // Ensure this path is correct

function AddStoryPage() {
  const { session, profile } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and story content cannot be empty.');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const { error: insertError } = await supabase
        .from('success_stories')
        .insert({
          title: title,
          content: content,
          mentor_id: session.user.id,
          author_name: profile.full_name,
          author_avatar_url: profile.avatar_url,
        });

      if (insertError) {
        throw insertError;
      }

      setMessage('Success story submitted! Redirecting...');
      setTimeout(() => {
        navigate('/success-stories');
      }, 2000);

    } catch (error) {
      setError(`Submission failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Security check: Only render the form for mentors.
  if (!profile || profile.role !== 'mentor') {
    return (
      <>
        <Header />
        <div style={{ padding: '4rem 1rem', textAlign: 'center', minHeight: 'calc(100vh - 160px)' }}>
          <h1>Access Denied</h1>
          <p>You must be logged in as a mentor to add a success story.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h1>Share an Inspiring Story</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Your journey can motivate the next generation of students. Share the challenges, the hard work, and the success.</p>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>Story Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                placeholder="e.g., How I Cracked JEE from a Rural Village"
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>Your Story</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="12"
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #d1d5db', resize: 'vertical' }}
                placeholder="Share the details of your journey, the obstacles you faced, and the strategies that helped you succeed."
                required
              ></textarea>
            </div>

            {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
            {message && <p style={{ color: '#10b981', marginBottom: '1rem' }}>{message}</p>}

            <button type="submit" className="header-button" disabled={loading} style={{ width: '100%', padding: '0.75rem', fontSize: '1.1rem' }}>
              {loading ? 'Submitting...' : 'Submit My Story'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddStoryPage;