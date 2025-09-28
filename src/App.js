import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import UpdateProfile from './pages/UpdateProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
    </Routes>
  );
}

export default App;