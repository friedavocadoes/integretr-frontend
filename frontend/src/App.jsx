import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FindNGOs from "./pages/FindNGOs";
import Contact from "./pages/Contact";
import NGOLogin from "./pages/NGOLogin";
import VolunteerLogin from "./pages/VolunteerLogin";
import NGODashboard from "./pages/NGODashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import routes from "./content/routes";

// Protected Route Component
const ProtectedRoute = ({ children, userType }) => {
  const { isAuthenticated, userType: currentUserType, loading } = useAuth();

  if (loading) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-gray-600 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading amazing experiences...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.home} replace />;
  }

  if (userType && currentUserType !== userType) {
    return <Navigate to={routes.home} replace />;
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
    if (userType === "ngo") {
      return <Navigate to={routes.ngo.dash} replace />;
    } else if (userType === "volunteer") {
      return <Navigate to={routes.ngo.dash} replace />;
    }
  }

  return children;
};

function AppContent() {
  const location = useLocation();
  
  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -20, scale: 1.02 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          className="flex-grow"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Routes location={location}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.ngo.find} element={<FindNGOs />} />
          <Route path={routes.contact} element={<Contact />} />

          <Route
            path={routes.ngo.login}
            element={
              <PublicRoute>
                <NGOLogin />
              </PublicRoute>
            }
          />

          <Route
            path={routes.volunteer.login}
            element={
              <PublicRoute>
                <VolunteerLogin />
              </PublicRoute>
            }
          />

          <Route
            path={routes.ngo.dash}
            element={
              <ProtectedRoute userType="ngo">
                <NGODashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path={routes.volunteer.dash}
            element={
              <ProtectedRoute userType="volunteer">
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to={routes.home} replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
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
