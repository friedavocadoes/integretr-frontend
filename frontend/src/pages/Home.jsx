import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Heart, Users, Globe, ArrowRight } from 'lucide-react';

const Home = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Education', 'Health', 'Animal Welfare', 'Environment', 
    'Women Empowerment', 'Child Welfare', 'Disaster Relief', 'Poverty Alleviation'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCategory) params.append('category', searchCategory);
    if (searchCity) params.append('city', searchCity);
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Cause. Change Lives. Start Today
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Local NGOs. Real needs. Your skills. Perfect match
            </p>

            {/* Search Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSearch}
              className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <input
                  type="text"
                  placeholder="Enter city or location"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How NGOConnect Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Making an impact has never been this easy
            </p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a powerful network of volunteers and NGOs driving meaningful change.
            </p>
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