import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Mail, Lock, Eye, EyeOff, Heart, Sparkles } from "lucide-react";
import { authAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import routes from "../content/routes";

const VolunteerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: { city: "", state: "" },
    skills: [],
    interests: [],
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const skillOptions = [
    "Teaching",
    "Healthcare",
    "Technology",
    "Marketing",
    "Finance",
    "Legal",
    "Event Management",
    "Social Media",
    "Writing",
    "Photography",
    "Design",
    "Fundraising",
  ];

  const interestOptions = [
    "Education",
    "Health",
    "Animal Welfare",
    "Environment",
    "Women Empowerment",
    "Child Welfare",
    "Disaster Relief",
    "Poverty Alleviation",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await authAPI.volunteerLogin({
          email: formData.email,
          password: formData.password,
        });
        login(response.data.volunteer, response.data.token, "volunteer");
      } else {
        response = await authAPI.volunteerRegister(formData);
        login(response.data.volunteer, response.data.token, "volunteer");
      }
      navigate("/volunteer-dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
      alert(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-green-200 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-green-300"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            <Heart className="h-4 w-4" />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center min-h-screen py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Floating Elements Inside Card */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-100 rounded-full"
                animate={{
                  y: [-10, -20, -10],
                  x: [0, 5, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 80}%`,
                }}
              />
            ))}
          </div>
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
              className="relative inline-block"
            >
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </motion.div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl font-bold text-gray-900"
            >
              {isLogin ? "Volunteer Login" : "Join as Volunteer"}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-600 mt-2"
            >
              {isLogin ? "Welcome back!" : "Start making a difference today"}
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="register-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#10b981" }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                    placeholder="Your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#10b981" }}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                    placeholder="Your phone number"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02, borderColor: "#10b981" }}
                      type="text"
                      name="location.city"
                      value={formData.location.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02, borderColor: "#10b981" }}
                      type="text"
                      name="location.state"
                      value={formData.location.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                      placeholder="State"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (Select multiple)
                  </label>
                  <motion.div 
                    className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2"
                    whileHover={{ borderColor: "#10b981" }}
                  >
                    {skillOptions.map((skill, index) => (
                      <motion.label
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 text-sm cursor-pointer p-1 rounded hover:bg-green-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleMultiSelect("skills", skill)}
                          className="rounded text-green-600"
                        />
                        <span>{skill}</span>
                      </motion.label>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests (Select multiple)
                  </label>
                  <motion.div 
                    className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2"
                    whileHover={{ borderColor: "#10b981" }}
                  >
                    {interestOptions.map((interest, index) => (
                      <motion.label
                        key={interest}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 text-sm cursor-pointer p-1 rounded hover:bg-green-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() =>
                            handleMultiSelect("interests", interest)
                          }
                          className="rounded text-green-600"
                        />
                        <span>{interest}</span>
                      </motion.label>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: isLogin ? 0.1 : 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </motion.div>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: "#10b981" }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="volunteer@example.com"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: isLogin ? 0.2 : 0.8 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </motion.div>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: "#10b981" }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="••••••••"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: isLogin ? 0.3 : 0.9 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 font-semibold"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              isLogin ? "Sign In" : "Join as Volunteer"
            )}
          </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="mt-6 text-center relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              {isLogin
                ? "Don't have an account? Register here"
                : "Already have an account? Sign in"}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="mt-4 text-center relative z-10"
          >
            <Link
              to={routes.ngo.login}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Are you an NGO? Click here
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VolunteerLogin;
