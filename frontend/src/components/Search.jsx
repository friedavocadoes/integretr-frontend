import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchNGO = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [locStatus, setLocStatus] = useState("");
  const navigate = useNavigate();

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

  // handle current location fetch
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocStatus("Geolocation is not supported by your browser.");
      return;
    }

    setLocStatus("Fetching location...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
        setLocStatus("Location fetched successfully ✅");
      },
      (err) => {
        console.error(err);
        setLocStatus("Failed to get location. Please allow access.");
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (city) params.append("city", city);
    if (category) params.append("category", category);
    if (location.lat && location.lon) {
      params.append("lat", location.lat);
      params.append("lon", location.lon);
    }

    navigate(`/results?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-3 mb-6"
    >
      {/* City Search */}
      <input
        type="text"
        placeholder="Search by city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border rounded px-3 py-2 w-64"
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2 w-64"
      >
        <option value="">Select Category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Current Location Button */}
      <button
        type="button"
        onClick={handleGetLocation}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
      >
        Use Current Location 📍
      </button>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
      >
        Search
      </button>

      {/* Status */}
      {locStatus && (
        <p className="text-sm text-gray-600 mt-2 md:mt-0">{locStatus}</p>
      )}
    </form>
  );
};

export default SearchNGO;
