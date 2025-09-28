import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import UpdateProfile from './pages/UpdateProfile';
import ResourcesPage from './pages/ResourcesPage';
import AddResourcePage from './pages/AddResourcePage'; // Import the new page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/add-resource" element={<AddResourcePage />} /> {/* Add the new route */}
    </Routes>
  );
}

export default App;