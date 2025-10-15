import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Heart, LogOut, User } from "lucide-react";
import routes from "../content/routes";

const Navbar = () => {
  const { user, userType, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={routes.home} className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
                NGOConnect
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to={routes.home}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to={routes.ngo.find}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Find NGOs
            </Link>
            <Link
              to={routes.contact}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={
                    userType === "ngo" ? routes.ngo.dash : routes.volunteer.dash
                  }
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to={routes.ngo.login}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  NGO Login
                </Link>
                <Link
                  to={routes.volunteer.login}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Volunteer Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
