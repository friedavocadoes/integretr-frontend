import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Heart, Users, Globe, ArrowRight, Sparkles, Star, MapPin } from 'lucide-react';

const Home = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Education', 'Health', 'Animal Welfare', 'Environment', 
    'Women Empowerment', 'Child Welfare', 'Disaster Relief', 'Poverty Alleviation'
  ];

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          setUseLocation(true);
          setSearchCity('');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter city manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCategory) params.append('category', searchCategory);
    if (useLocation && currentLocation) {
      params.append('location', currentLocation);
      params.append('useLocation', 'true');
    } else if (searchCity) {
      params.append('city', searchCity);
    }
    navigate(`/find-ngos?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {"Find NGOs That Match Your ".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.05, 
                    delay: 0.3 + index * 0.03,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span 
                className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.2,
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
              >
                Passion
              </motion.span>
              <motion.div
                className="inline-block ml-2"
                initial={{ opacity: 0, rotate: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  rotate: 360, 
                  scale: 1
                }}
                transition={{ 
                  duration: 1, 
                  delay: 1.5,
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <Sparkles className="h-8 w-8 text-yellow-500" />
              </motion.div>
            </motion.h1>
            <motion.div 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {["Connect.", "Volunteer.", "Create Impact."].map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-2 font-semibold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    color: [
                      "#6b7280", 
                      index === 0 ? "#2563eb" : index === 1 ? "#7c3aed" : "#059669",
                      "#6b7280"
                    ]
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + index * 0.2,
                    color: {
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: index * 0.5
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Join thousands of volunteers making a difference in communities worldwide.
              </motion.span>
            </motion.div>

            {/* Search Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSearch}
              className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                {!useLocation ? (
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <div className="px-4 py-3 border border-green-300 rounded-lg bg-green-50 flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 text-sm">Using your location</span>
                  </div>
                )}
                
                <motion.button
                  type="button"
                  onClick={getLocation}
                  className={`px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    useLocation 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin className="h-4 w-4" />
                  <span>{useLocation ? 'Located!' : 'Use Location'}</span>
                </motion.button>
                
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Explore NGOs</span>
                </button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {"How NGOConnect Works".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.05, 
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -3,
                    color: "#2563eb",
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{ 
                  color: ["#6b7280", "#2563eb", "#6b7280"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                Simple steps
              </motion.span>
              {" to start making a difference in your community"}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Discover NGOs',
                description: 'Search for NGOs by category, location, or cause that matters to you'
              },
              {
                icon: Heart,
                title: 'Apply to Volunteer',
                description: 'Apply to opportunities that match your skills and interests'
              },
              {
                icon: Users,
                title: 'Make Impact',
                description: 'Work with NGOs to create meaningful change in communities'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-6"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {"Ready to Make a ".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.05, 
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -3,
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
              >
                Difference?
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Star className="h-6 w-6 text-yellow-300" />
                </motion.div>
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 10px rgba(255,255,255,0.3)",
                    "0 0 0px rgba(255,255,255,0)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                Join our community
              </motion.span>
              {" of volunteers and NGOs working together for "}
              <motion.span
                className="font-semibold"
                animate={{ 
                  color: ["#dbeafe", "#fbbf24", "#10b981", "#dbeafe"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                positive change
              </motion.span>
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/volunteer-login')}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Join as Volunteer</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/ngo-login')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Register Your NGO
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;