import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FindNGOs from './pages/FindNGOs';
import Contact from './pages/Contact';
import NGOLogin from './pages/NGOLogin';
import VolunteerLogin from './pages/VolunteerLogin';
import NGODashboard from './pages/NGODashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, userType }) => {
  const { isAuthenticated, userType: currentUserType, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (userType && currentUserType !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, userType, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    if (userType === 'ngo') {
      return <Navigate to="/ngo-dashboard" replace />;
    } else if (userType === 'volunteer') {
      return <Navigate to="/volunteer-dashboard" replace />;
    }
  }
  
  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-ngos" element={<FindNGOs />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route 
            path="/ngo-login" 
            element={
              <PublicRoute>
                <NGOLogin />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/volunteer-login" 
            element={
              <PublicRoute>
                <VolunteerLogin />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/ngo-dashboard" 
            element={
              <ProtectedRoute userType="ngo">
                <NGODashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/volunteer-dashboard" 
            element={
              <ProtectedRoute userType="volunteer">
                <VolunteerDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;