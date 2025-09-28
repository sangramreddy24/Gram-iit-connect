import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import './Onboarding.css';

export default function UpdateProfile() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  
  // New state for the success message
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [locationStatus, setLocationStatus] = useState('Get My Location');

  useEffect(() => {
    let isMounted = true;
    async function getProfile() {
      // ... (rest of the useEffect is the same)
      if (!session) return;
      try {
        setLoading(true);
        const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (isMounted) {
          if (error) throw error;
          if (data) {
            setProfile(data);
            setFullName(data.full_name || '');
            setPhoneNumber(data.phone_number || '');
            setStudentClass(data.class || '');
            setUniversityName(data.university_name || '');
            if (data.latitude) {
              setLocation({ lat: data.latitude, lon: data.longitude });
              setLocationStatus('Location Saved');
            }
          }
        }
      } catch (error) {
        alert(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    getProfile();
    return () => { isMounted = false; };
  }, [session]);

  const handleLocation = () => {
    // ... (this function is the same)
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported');
      return;
    }
    setLocationStatus('Fetching...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('Location Fetched!');
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      () => {
        setLocationStatus('Permission denied');
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous message
    const updates = {
      id: session.user.id,
      full_name: fullName,
      phone_number: phoneNumber,
      class: studentClass,
      university_name: universityName,
      latitude: location.lat,
      longitude: location.lon,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) {
      setSuccessMessage('Error updating profile: ' + error.message);
    } else {
      // Set the success message instead of alerting
      setSuccessMessage('Profile updated successfully!');
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Could not find user profile.</div>;

  return (
    <div className="onboarding-container">
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <h2>Update Your Profile</h2>
        
        {/* All form fields are the same */}
        <label>Email</label>
        <input type="email" value={session.user.email} disabled />
        <label>Your Role</label>
        <input type="text" value={profile.role} disabled style={{ textTransform: 'capitalize' }} />
        <label>Full Name</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <label>Mobile Number</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        {profile.role === 'student' && (
          <>
            <label>Class</label>
            <input type="text" placeholder="e.g., 12th" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required />
          </>
        )}
        {profile.role === 'mentor' && (
          <>
            <label>University Name</label>
            <input type="text" placeholder="e.g., IIT Bombay" value={universityName} onChange={(e) => setUniversityName(e.target.value)} required />
          </>
        )}
        <label>Location</label>
        <button type="button" onClick={handleLocation} className="location-btn">{locationStatus}</button>
        {location.lat && <p className="location-coords">Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}</p>}
        
        <button type="submit">Update Profile</button>

        {/* New: Conditionally render the success message and back button */}
        {successMessage && (
          <div className="success-container">
            <p className="success-message">{successMessage}</p>
            <Link to="/" className="back-button">Back to Home</Link>
          </div>
        )}
      </form>
    </div>
  );
}