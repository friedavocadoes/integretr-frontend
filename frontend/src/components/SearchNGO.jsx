import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import routes from "../content/routes";

const SearchNGO = () => {
  const [searchType, setSearchType] = useState("name");
  const [query, setQuery] = useState("");
  const [locStatus, setLocStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Autofill the form from URL params when available (e.g. ?type=name&name=underprivileged)
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type) {
      if (type === "name") {
        const name = params.get("name") || "";
        setSearchType("name");
        setQuery(name);
      } else if (type === "location") {
        // For location searches the results page may contain lat/lng. If a city param exists, use it to fill the input.
        setSearchType("location");
        const city = params.get("city");
        if (city) setQuery(city);
      }
    }
    // run this effect whenever the location.search changes
  }, [location.search]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocStatus("Geolocation not supported by your browser.");
      return;
    }

    setLocStatus("Fetching location...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocStatus("Location fetched ✅");
        navigate(
          `${routes.ngo.find}?type=location&lat=${latitude}&lng=${longitude}`
        );
      },
      (err) => {
        console.error(err);
        setLocStatus("Failed to get location. Please allow access.");
      }
    );
  };

  const getCoordinatesFromCity = async (city) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          city
        )}&format=json&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      } else {
        alert("Couldn't find that city. Try a nearby one?");
        return null;
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("Error fetching city coordinates");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchType === "name") {
      navigate(
        `${routes.ngo.find}?type=name&name=${encodeURIComponent(query)}`
      );
    } else {
      if (!query.trim()) {
        alert("Enter a city or use current location.");
        return;
      }
      const coords = await getCoordinatesFromCity(query);
      if (coords)
        navigate(
          `${routes.ngo.find}?type=location&lat=${coords.lat}&lng=${coords.lon}`
        );
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-100 mt-10"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Find NGOs Near You
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Type */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="name">By Name</option>
          <option value="location">By Location</option>
        </select>

        {/* Input */}
        <input
          type="text"
          placeholder={
            searchType === "name" ? "Enter NGO name..." : "Enter city..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Location Button (for location mode only) */}
      {searchType === "location" && (
        <motion.button
          type="button"
          onClick={handleGetLocation}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2 transition-all"
        >
          <MapPin className="h-5 w-5 text-primary-600" />
          <span>Use Current Location</span>
        </motion.button>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-primary-600 text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-primary-700 transition-all flex items-center justify-center space-x-2"
      >
        <Search className="h-5 w-5" />
        <span>Search NGOs</span>
      </motion.button>

      {locStatus && (
        <p className="text-sm text-gray-600 text-center mt-3">{locStatus}</p>
      )}
    </motion.form>
  );
};

export default SearchNGO;
