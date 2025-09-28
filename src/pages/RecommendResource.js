import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';
import './Onboarding.css'; // Reusing the onboarding form styles

export default function RecommendResource() {
  const { allyId } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [articleLink, setArticleLink] = useState('');
  const [textbookName, setTextbookName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // --- Validation: Ensure at least one resource is provided ---
    if (!youtubeLink && !articleLink && !textbookName) {
      setMessage('Please provide at least one resource (YouTube, Article, or Textbook).');
      return;
    }

    setLoading(true);

    // Placeholder function to simulate saving the recommendation
    // NOTE: You will need to create a 'recommendations' table in Supabase
    const { error } = await supabase
      .from('recommendations')
      .insert({
        student_id: allyId, // The ID of the student/ally
        mentor_id: supabase.auth.user().id, // Assuming you get mentor ID from session
        subject,
        topic: topic || null,
        youtube_link: youtubeLink || null,
        article_link: articleLink || null,
        textbook_name: textbookName || null,
        // You might also add fields for 'created_at', etc.
      });
      
    setLoading(false);

    if (error) {
      setMessage('Error submitting recommendation: ' + error.message);
    } else {
      setMessage('Recommendation submitted successfully! Redirecting...');
      setTimeout(() => {
        navigate('/my-allies'); // Go back to the allies list
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      <div className="onboarding-container">
        <form className="onboarding-form" onSubmit={handleSubmit}>
          <h2>Recommend Resource to Ally {allyId}</h2>
          <p>Provide helpful material for your mentee.</p>

          <label>Subject Name*</label>
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
            disabled={loading}
          />

          <label>Topic (Optional)</label>
          <input 
            type="text" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
            disabled={loading}
          />

          <p style={{ marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            Provide at least one resource:
          </p>

          <label>YouTube Link/Reference (Optional)</label>
          <input 
            type="url" 
            placeholder="e.g., https://youtube.com/..."
            value={youtubeLink} 
            onChange={(e) => setYoutubeLink(e.target.value)} 
            disabled={loading}
          />

          <label>Free Article/Website Link (Optional)</label>
          <input 
            type="url" 
            placeholder="e.g., https://example.com/..."
            value={articleLink} 
            onChange={(e) => setArticleLink(e.target.value)} 
            disabled={loading}
          />

          <label>Textbook Name (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g., NCERT Class 12 Physics"
            value={textbookName} 
            onChange={(e) => setTextbookName(e.target.value)} 
            disabled={loading}
          />

          {message && <p style={{ color: message.includes('success') ? '#10b981' : 'red', margin: '1rem 0' }}>{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Send Recommendation'}
          </button>
          
          <button type="button" className="link-button" onClick={() => navigate('/my-allies')} style={{marginTop: '1rem'}}>
             Cancel
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}