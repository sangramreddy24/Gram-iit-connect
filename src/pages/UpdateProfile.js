import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import './Onboarding.css'; // Shared styles are fine

export default function UpdateProfile() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form state for editable fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [universityName, setUniversityName] = useState('');
  // New state for manual address input
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [town, setTown] = useState('');
  const [village, setVillage] = useState('');

  // Effect to fetch the profile data on load
  useEffect(() => {
    let isMounted = true;
    async function getProfile() {
      if (!session) return;
      try {
        setLoading(true);
        const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (isMounted) {
          if (error) throw error;
          if (data) {
            setProfile(data);
            // Initialize form state with fetched data
            setFullName(data.full_name || '');
            setPhoneNumber(data.phone_number || '');
            setStudentClass(data.class || '');
            setUniversityName(data.university_name || '');
            // Initialize new address fields
            setState(data.state || '');
            setDistrict(data.district || '');
            setTown(data.nearby_town || '');
            setVillage(data.village || '');
          }
        }
      } catch (error) {
        alert('Error fetching profile: ' + error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    getProfile();
    return () => { isMounted = false; };
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setLoading(true);

    const updates = {
      id: session.user.id,
      full_name: fullName,
      phone_number: phoneNumber,
      class: profile.role === 'student' ? studentClass : null,
      university_name: profile.role === 'mentor' ? universityName : null,
      // Add new address fields to the update object
      state: state,
      district: district,
      nearby_town: town,
      village: village,
      updated_at: new Date(),
    };

    const { data: updatedData, error } = await supabase.from('profiles').upsert(updates).select().single();
    
    setLoading(false);
    
    if (error) {
      setSuccessMessage('Error updating profile: ' + error.message);
    } else {
      setSuccessMessage('Profile updated successfully!');
      setProfile(updatedData);
      setIsEditing(false); 
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (loading) return (
    <div className="onboarding-container"><div className="onboarding-form"><h2>Loading Profile...</h2></div></div>
  );
  if (!profile) return (
    <div className="onboarding-container"><div className="onboarding-form"><h2>Profile Not Found</h2><Link to="/" className="back-button">Back to Home</Link></div></div>
  );

  // --- Profile View Mode ---
  const profileView = (
    <div className="onboarding-container">
      <div className="onboarding-form">
        <h2>Your Profile Details</h2>
        
        <div className="profile-detail"><label>Email</label><p>{session.user.email}</p></div>
        <div className="profile-detail"><label>Your Role</label><p style={{ textTransform: 'capitalize' }}>{profile.role}</p></div>
        <div className="profile-detail"><label>Full Name</label><p>{profile.full_name || 'N/A'}</p></div>
        <div className="profile-detail"><label>Mobile Number</label><p>{profile.phone_number || 'N/A'}</p></div>

        {profile.role === 'student' && (<div className="profile-detail"><label>Class</label><p>{profile.class || 'N/A'}</p></div>)}
        {profile.role === 'mentor' && (<div className="profile-detail"><label>University Name</label><p>{profile.university_name || 'N/A'}</p></div>)}
        
        <div className="profile-detail">
          <label>Address</label>
          {profile.village ? (
            <p>{`${profile.village}, ${profile.nearby_town}, ${profile.district}, ${profile.state}`}</p>
          ) : (
            <p>Address not saved.</p>
          )}
        </div>
        
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="button" onClick={() => setIsEditing(true)}>Update Profile</button>
        <Link to="/" className="back-button" style={{ marginTop: '1rem' }}>Back to Home</Link>
      </div>
    </div>
  );

  // --- Profile Edit/Update Form ---
  const profileEditForm = (
    <div className="onboarding-container">
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <h2>Update Your Profile</h2>
        
        <label>Email</label>
        <input type="email" value={session.user.email} disabled />
        <label>Your Role</label>
        <input type="text" value={profile.role} disabled style={{ textTransform: 'capitalize' }} />

        <label>Full Name</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <label>Mobile Number</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        
        {profile.role === 'student' && (
          <><label>Class</label><input type="text" placeholder="e.g., 12th" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required /></>
        )}
        
        {profile.role === 'mentor' && (
          <><label>University Name</label><input type="text" placeholder="e.g., IIT Bombay" value={universityName} onChange={(e) => setUniversityName(e.target.value)} required /></>
        )}
        
        <label>State</label>
        <input type="text" placeholder="e.g., Telangana" value={state} onChange={(e) => setState(e.target.value)} />
        <label>District</label>
        <input type="text" placeholder="e.g., Warangal" value={district} onChange={(e) => setDistrict(e.target.value)} />
        <label>Nearby Town</label>
        <input type="text" placeholder="e.g., Hanamkonda" value={town} onChange={(e) => setTown(e.target.value)} />
        <label>Village</label>
        <input type="text" placeholder="e.g., Fathimapur" value={village} onChange={(e) => setVillage(e.target.value)} />

        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
        <button type="button" className="link-button" onClick={() => setIsEditing(false)} style={{ marginTop: '1rem' }}>Cancel Update</button>
      </form>
    </div>
  );

  return !isEditing ? profileView : profileEditForm;
}