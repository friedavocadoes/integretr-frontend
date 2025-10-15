import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Users, CheckCircle, XCircle, Clock, Edit } from "lucide-react";
import { ngoAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const NGODashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [ngoData, setNgoData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showRequirementForm, setShowRequirementForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requirementForm, setRequirementForm] = useState({
    title: "",
    description: "",
    skills: [],
    category: "",
    location: "",
  });

  const { user } = useAuth();

  const categories = [
    "Education",
    "Health",
    "Animal Welfare",
    "Environment",
    "Women Empowerment",
    "Child Welfare",
    "Disaster Relief",
    "Poverty Alleviation",
  ];

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await ngoAPI.getDashboard();
      setNgoData(response.data.ngo);
      setApplications(response.data.applications);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await fetch(`${import.meta.env.VITE_BACKEND}/api/requirements/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 critical
        },
        body: JSON.stringify(requirementForm),
      });

      setShowRequirementForm(false);
      setRequirementForm({
        title: "",
        description: "",
        skills: [],
        category: "",
        location: "",
      });

      fetchDashboardData();
    } catch (error) {
      console.error("Error posting requirement:", error);
    }
  };

  const handleApplicationStatus = async (
    volunteerId,
    requirementId,
    status
  ) => {
    try {
      await ngoAPI.updateApplicationStatus(volunteerId, requirementId, status);
      fetchDashboardData();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleSkillToggle = (skill) => {
    setRequirementForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
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
            <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
            <p className="text-gray-600">Welcome back, {ngoData?.name}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.reduce(
                      (acc, app) => acc + app.applications.length,
                      0
                    )}
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
                    {applications.reduce(
                      (acc, app) =>
                        acc +
                        app.applications.filter((a) => a.status === "approved")
                          .length,
                      0
                    )}
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
                    {applications.reduce(
                      (acc, app) =>
                        acc +
                        app.applications.filter((a) => a.status === "pending")
                          .length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Edit className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Requirements</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ngoData?.requirements?.length || 0}
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
                  { id: "overview", label: "Overview" },
                  { id: "requirements", label: "Requirements" },
                  { id: "applications", label: "Applications" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      NGO Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">{ngoData?.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">
                          {ngoData?.location?.city}, {ngoData?.location?.state}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="font-medium">{ngoData?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "requirements" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Posted Requirements
                    </h3>
                    <button
                      onClick={() => setShowRequirementForm(true)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Post New Requirement</span>
                    </button>
                  </div>

                  {showRequirementForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 p-6 rounded-lg"
                    >
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Post New Requirement
                      </h4>
                      <form
                        onSubmit={handleRequirementSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={requirementForm.title}
                            onChange={(e) =>
                              setRequirementForm((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            placeholder="Requirement title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={requirementForm.description}
                            onChange={(e) =>
                              setRequirementForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            required
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            placeholder="Detailed description"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Category
                            </label>
                            <select
                              value={requirementForm.category}
                              onChange={(e) =>
                                setRequirementForm((prev) => ({
                                  ...prev,
                                  category: e.target.value,
                                }))
                              }
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="">Select Category</option>
                              {categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={requirementForm.location}
                              onChange={(e) =>
                                setRequirementForm((prev) => ({
                                  ...prev,
                                  location: e.target.value,
                                }))
                              }
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                              placeholder="Location for this requirement"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Required Skills
                          </label>
                          <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                            {skillOptions.map((skill) => (
                              <label
                                key={skill}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={requirementForm.skills.includes(
                                    skill
                                  )}
                                  onChange={() => handleSkillToggle(skill)}
                                  className="rounded text-primary-600"
                                />
                                <span>{skill}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <button
                            type="submit"
                            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            Post Requirement
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowRequirementForm(false)}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    {ngoData?.requirements?.map((req, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <h4 className="font-semibold text-gray-900">
                          {req.title}
                        </h4>
                        <p className="text-gray-600 mt-2">{req.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {req.skills?.map((skill) => (
                            <span
                              key={skill}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Posted on{" "}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "applications" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Volunteer Applications
                  </h3>

                  <div className="space-y-4">
                    {applications.map((volunteer) =>
                      volunteer.applications
                        .filter((app) => app.ngoId === user.id)
                        .map((app) => (
                          <div
                            key={`${volunteer._id}-${app.requirementId}`}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {volunteer.name}
                                </h4>
                                <p className="text-gray-600">
                                  {volunteer.email}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Applied on{" "}
                                  {new Date(app.appliedAt).toLocaleDateString()}
                                </p>
                                <div className="flex items-center mt-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      app.status === "approved"
                                        ? "bg-green-100 text-green-800"
                                        : app.status === "rejected"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {app.status.charAt(0).toUpperCase() +
                                      app.status.slice(1)}
                                  </span>
                                </div>
                              </div>

                              {app.status === "pending" && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      handleApplicationStatus(
                                        volunteer._id,
                                        app.requirementId,
                                        "approved"
                                      )
                                    }
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Approve</span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleApplicationStatus(
                                        volunteer._id,
                                        app.requirementId,
                                        "rejected"
                                      )
                                    }
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors flex items-center space-x-1"
                                  >
                                    <XCircle className="h-4 w-4" />
                                    <span>Reject</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NGODashboard;
