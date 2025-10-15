import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, CheckCircle, XCircle, Heart } from 'lucide-react';
import { volunteerAPI, ngoAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('nearby');
  const [volunteerData, setVolunteerData] = useState(null);
  const [nearbyNGOs, setNearbyNGOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    city: ''
  });

  const { user } = useAuth();

  const categories = [
    'Education', 'Health', 'Animal Welfare', 'Environment', 
    'Women Empowerment', 'Child Welfare', 'Disaster Relief', 'Poverty Alleviation'
  ];

  useEffect(() => {
    fetchDashboardData();
    fetchNearbyNGOs();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await volunteerAPI.getDashboard();
      setVolunteerData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyNGOs = async () => {
    try {
      const response = await ngoAPI.search(searchFilters);
      setNearbyNGOs(response.data);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
    }
  };

  const handleApply = async (ngoId, requirementId) => {
    try {
      await volunteerAPI.apply({ ngoId, requirementId });
      alert('Application submitted successfully!');
      fetchDashboardData();
    } catch (error) {
      console.error('Error applying:', error);
      alert(error.response?.data?.message || 'Failed to apply');
    }
  };

  const handleSearch = () => {
    fetchNearbyNGOs();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {volunteerData?.name}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {volunteerData?.applications?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {volunteerData?.applications?.filter(app => app.status === 'approved').length || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {volunteerData?.applications?.filter(app => app.status === 'pending').length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'nearby', label: 'Find NGOs' },
                  { id: 'applications', label: 'My Applications' },
                  { id: 'profile', label: 'Profile' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'nearby' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Find NGO Opportunities</h3>
                    
                    {/* Search Filters */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                          value={searchFilters.category}
                          onChange={(e) => setSearchFilters(prev => ({ ...prev, category: e.target.value }))}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">All Categories</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>

                        <input
                          type="text"
                          placeholder="Enter city"
                          value={searchFilters.city}
                          onChange={(e) => setSearchFilters(prev => ({ ...prev, city: e.target.value }))}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />

                        <button
                          onClick={handleSearch}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Search className="h-4 w-4" />
                          <span>Search</span>
                        </button>
                      </div>
                    </div>

                    {/* NGO Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {nearbyNGOs.map(ngo => (
                        <div key={ngo._id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-semibold text-gray-900">{ngo.name}</h4>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {ngo.category}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-4">{ngo.description}</p>

                          <div className="flex items-center text-gray-500 mb-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{ngo.location.city}, {ngo.location.state}</span>
                          </div>

                          {/* Requirements */}
                          {ngo.requirements && ngo.requirements.length > 0 && (
                            <div className="space-y-3">
                              <h5 className="font-medium text-gray-900">Current Opportunities:</h5>
                              {ngo.requirements.slice(0, 2).map((req, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <h6 className="font-medium text-gray-900">{req.title}</h6>
                                      <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                                      {req.skills && req.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                          {req.skills.slice(0, 3).map(skill => (
                                            <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                              {skill}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => handleApply(ngo._id, req._id)}
                                      className="ml-4 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                                    >
                                      Apply
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
                  
                  <div className="space-y-4">
                    {volunteerData?.applications?.map((app, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {app.ngoId?.name || 'NGO Name'}
                            </h4>
                            <p className="text-gray-600">{app.ngoId?.category}</p>
                            <p className="text-sm text-gray-500">
                              Applied on {new Date(app.appliedAt).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              app.status === 'approved' ? 'bg-green-100 text-green-800' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {app.status === 'approved' && <CheckCircle className="inline h-4 w-4 mr-1" />}
                              {app.status === 'rejected' && <XCircle className="inline h-4 w-4 mr-1" />}
                              {app.status === 'pending' && <Clock className="inline h-4 w-4 mr-1" />}
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {(!volunteerData?.applications || volunteerData.applications.length === 0) && (
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-500">Start applying to NGO opportunities to see them here</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{volunteerData?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{volunteerData?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{volunteerData?.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">
                        {volunteerData?.location?.city && volunteerData?.location?.state 
                          ? `${volunteerData.location.city}, ${volunteerData.location.state}`
                          : 'Not provided'
                        }
                      </p>
                    </div>
                  </div>

                  {volunteerData?.skills && volunteerData.skills.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {volunteerData.skills.map(skill => (
                          <span key={skill} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {volunteerData?.interests && volunteerData.interests.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {volunteerData.interests.map(interest => (
                          <span key={interest} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;