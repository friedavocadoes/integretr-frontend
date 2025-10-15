import { MapPin, ExternalLink, Heart } from "lucide-react";
import { motion } from "framer-motion";

/**
 * NGOGrid - displays a grid of NGOs
 * @param {Object[]} ngos - array of NGO objects
 * @param {boolean} loading - optional, show loading state
 */
const NGOGrid = ({ ngos = [], loading = false }) => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ngos.map((ngo, index) => (
        <motion.div
          key={ngo._id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {ngo.name}
              </h3>
              <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                {ngo.category}
              </span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">{ngo.description}</p>

            <div className="flex items-center text-gray-500 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{ngo.address}</span>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => window.open(`/ngo/${ngo._id}`, "_blank")}
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

      {ngos.length === 0 && !loading && (
        <div className="col-span-full text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No NGOs found
          </h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default NGOGrid;
