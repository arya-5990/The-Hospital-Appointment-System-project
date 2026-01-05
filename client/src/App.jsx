import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // Or a spinner
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointments"
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <footer style={{ background: 'white', padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
            <div className="container">
              &copy; {new Date().getFullYear()} MediCare Hospital System. All rights reserved.
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
