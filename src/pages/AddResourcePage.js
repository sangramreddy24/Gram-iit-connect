import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AddResourcePage.css';

export default function AddResourcePage() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: 'Physics', // Default value
    language: 'English', // Default value
    target_class: '11th', // Default value
    difficulty: 'Beginner', // Default value
    url: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('resources').insert([formData]);
      if (error) throw error;
      setMessage('Resource added successfully!');
      setTimeout(() => navigate('/resources'), 1500); // Redirect to resources page after success
    } catch (error) {
      setMessage('Error adding resource: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Prevent non-mentors from accessing this page
  if (profile?.role !== 'mentor') {
    return (
      <div className="add-resource-page">
        <h1>Access Denied</h1>
        <p>Only mentors can add new resources.</p>
      </div>
    );
  }

  return (
    <div className="add-resource-page">
      <form className="add-resource-form" onSubmit={handleSubmit}>
        <h2>Add a New Resource</h2>
        
        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Author</label>
        <input name="author" value={formData.author} onChange={handleChange} required />

        <label>URL</label>
        <input name="url" type="url" value={formData.url} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <div className="select-grid">
          <div>
            <label>Subject</label>
            <select name="subject" value={formData.subject} onChange={handleChange}>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Math</option>
            </select>
          </div>
          <div>
            <label>Language</label>
            <select name="language" value={formData.language} onChange={handleChange}>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <div>
            <label>Target Class</label>
            <select name="target_class" value={formData.target_class} onChange={handleChange}>
              <option>11th</option>
              <option>12th</option>
              <option>Dropper</option>
            </select>
          </div>
          <div>
            <label>Difficulty</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Resource'}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}