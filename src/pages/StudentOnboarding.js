import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import './Onboarding.css'; // Shared CSS file

export default function StudentOnboarding() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [locationStatus, setLocationStatus] = useState('Get My Location');

  const handleLocation = () => {
    setLocationStatus('Fetching...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationStatus('Location Fetched!');
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => setLocationStatus('Permission denied. Please enable.')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        phone_number: phoneNumber,
        class: studentClass,
        latitude: location.lat,
        longitude: location.lon,
      })
      .eq('id', session.user.id);

    if (error) alert(error.message);
    else window.location.reload(); // Reload to clear onboarding
    setLoading(false);
  };

  return (
    <div className="onboarding-container">
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <h2>Complete Your Student Profile</h2>
        <label>Full Name</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <label>Mobile Number</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <label>Class</label>
        <input type="text" placeholder="e.g., 12th, B.Tech 1st Year" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required />
        <label>Location</label>
        <button type="button" onClick={handleLocation} className="location-btn">{locationStatus}</button>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</button>
      </form>
    </div>
  );
}