import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import UpdateProfile from './pages/UpdateProfile';
import MyAllies from './pages/MyAllies'; // Mentor Allies page
// New Import
import StudentAllies from './pages/StudentAllies';
import RecommendResource from './pages/RecommendResource';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      
      {/* Mentor Routes */}
      <Route path="/my-allies" element={<MyAllies />} /> 
      <Route path="/recommend-resource/:allyId" element={<RecommendResource />} />

      {/* New Student Route */}
      <Route path="/student/my-allies" element={<StudentAllies />} />
    </Routes>
  );
}

export default App;