import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Heart, LogOut, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import routes from "../content/routes";

const Navbar = () => {
  const { user, userType, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(routes.home);
  };

  return (
    <motion.nav
      className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-primary-100"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Floating Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-2 left-1/4 w-2 h-2 bg-primary-300 rounded-full opacity-40"
          animate={{
            x: [0, 200, 400, 600],
            y: [0, -8, 0, 8],
            opacity: [0, 0.4, 0.6, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-3 right-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50"
          animate={{
            x: [600, 400, 200, 0],
            y: [0, 6, 0, -6],
            opacity: [0, 0.5, 0.7, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1 left-1/2 w-1 h-1 bg-green-300 rounded-full opacity-60"
          animate={{
            x: [0, -100, -200, -300],
            y: [0, 4, 0, -4],
            opacity: [0, 0.6, 0.8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          {/* Enhanced Logo Section */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <Link to={routes.home} className="flex items-center space-x-3">
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="h-8 w-8 text-primary-600" />
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
                />
              </motion.div>

              <div className="flex flex-col">
                <motion.span
                  className="text-xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"
                  whileHover={{
                    backgroundImage:
                      "linear-gradient(to right, #7c3aed, #2563eb, #059669)",
                    transition: { duration: 0.3 },
                  }}
                >
                  NGOConnect
                </motion.span>

                {/* Animated Tagline */}
                <motion.div
                  className="flex text-xs text-gray-500 font-medium"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {"Making Impact Together".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      animate={{
                        y: [0, -3, 0],
                        color: ["#6b7280", "#2563eb", "#059669", "#6b7280"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: index * 0.08,
                        repeatDelay: 4,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Enhanced Navigation Links */}
            {[
              { to: routes.home, label: "Home" },
              { to: routes.ngo.find, label: "Find NGOs" },
              { to: routes.ngo.contact, label: "Contact" },
            ].map((link, index) => (
              <motion.div
                key={link.to}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={link.to}
                  className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative"
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-blue-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            {/* Enhanced Auth Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={
                      userType === "ngo"
                        ? routes.ngo.dash
                        : routes.volunteer.dash
                    }
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors bg-gray-50 px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                </motion.div>

                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors bg-gray-50 px-3 py-2 rounded-lg hover:bg-red-50"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/ngo-login"
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    NGO Login
                  </Link>
                </motion.div>

                <motion.div
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/volunteer-login"
                    className="relative bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.span
                      className="relative z-10"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(255,255,255,0)",
                          "0 0 8px rgba(255,255,255,0.3)",
                          "0 0 0px rgba(255,255,255,0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      Join as Volunteer ✨
                    </motion.span>

                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 180, opacity: 1 }}
                    exit={{ rotate: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-200 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-b-lg"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {[
                  { to: "/", label: "🏠 Home" },
                  { to: "/find-ngos", label: "🔍 Find NGOs" },
                  { to: "/contact", label: "📞 Contact" },
                ].map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      to={link.to}
                      className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {isAuthenticated ? (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        to={
                          userType === "ngo"
                            ? "/ngo-dashboard"
                            : "/volunteer-dashboard"
                        }
                        className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        📊 Dashboard
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        🚪 Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        to="/ngo-login"
                        className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        🏢 NGO Login
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        to="/volunteer-login"
                        className="block px-3 py-2 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-lg hover:from-primary-700 hover:to-blue-700 transition-all mx-3 text-center font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        ✨ Join as Volunteer
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
