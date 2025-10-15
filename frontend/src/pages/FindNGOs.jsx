import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Heart, ExternalLink } from 'lucide-react';
import { ngoAPI } from '../utils/api';

const FindNGOs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    useLocation: false
  });

  const categories = [
    'Education', 'Health', 'Animal Welfare', 'Environment', 
    'Women Empowerment', 'Child Welfare', 'Disaster Relief', 'Poverty Alleviation'
  ];

  useEffect(() => {
    searchNGOs();
  }, []);

  const searchNGOs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.city) params.city = filters.city;
      
      if (filters.useLocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          params.lat = position.coords.latitude;
          params.lng = position.coords.longitude;
          const response = await ngoAPI.search(params);
          setNgos(response.data);
          setLoading(false);
        });
      } else {
        const response = await ngoAPI.search(params);
        setNgos(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error searching NGOs:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchNGOs();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find NGOs</h1>

          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Enter city"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.useLocation}
                    onChange={(e) => setFilters(prev => ({ ...prev, useLocation: e.target.checked }))}
                    className="rounded text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Use my location</span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>{loading ? 'Searching...' : 'Search'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ngos.map((ngo, index) => (
              <motion.div
                key={ngo._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{ngo.name}</h3>
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {ngo.category}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">{ngo.description}</p>

                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{ngo.location.city}, {ngo.location.state}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => window.open(`/ngo/${ngo._id}`, '_blank')}
                      className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                    >
                      <span>View Details</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    
                    {ngo.contact?.website && (
                      <a
                        href={ngo.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {ngos.length === 0 && !loading && (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No NGOs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FindNGOs;