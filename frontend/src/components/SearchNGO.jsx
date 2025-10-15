import { useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../content/routes";

const SearchNGO = () => {
  const [searchType, setSearchType] = useState("name"); // "name" | "location"
  const [query, setQuery] = useState("");
  const [locStatus, setLocStatus] = useState("");
  const navigate = useNavigate();

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

        // redirect directly using lat/lon
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

  // Convert city name → coordinates
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 items-center"
    >
      {/* Search Type Switch */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="name">Search by Name</option>
        <option value="location">Search by Location</option>
      </select>

      {/* Input */}
      <input
        type="text"
        placeholder={
          searchType === "name" ? "Enter NGO name..." : "Enter city..."
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded px-3 py-2 w-64"
      />

      {/* Use current location */}
      {searchType === "location" && (
        <button
          type="button"
          onClick={handleGetLocation}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Use Current Location 📍
        </button>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
      >
        Search
      </button>

      {locStatus && (
        <p className="text-sm text-gray-600 mt-2 md:mt-0">{locStatus}</p>
      )}
    </form>
  );
};

export default SearchNGO;
