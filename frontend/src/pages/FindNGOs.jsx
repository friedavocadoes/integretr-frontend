import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchNGO from "../components/SearchNGO";
import NGOGrid from "../components/NGOGrid";

const NGODisplayPage = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(false);
  const loc = useLocation();

  const fetchData = async (type, params) => {
    setLoading(true);
    try {
      let res;

      if (type === "name") {
        res = await fetch(
          `${import.meta.env.VITE_BACKEND}/api/ngos/search?name=${params.name}`
        );
      } else {
        // Round latitude and longitude to 4 decimal places to reduce URL length
        const round4 = (n) => {
          if (n === undefined || n === null || n === "") return n;
          const num = Number(n);
          if (Number.isNaN(num)) return n;
          return num.toFixed(4);
        };

        const lat = round4(params.lat);
        const lng = round4(params.lng);
        console.log(`lat = ${lat} long = ${lng}`);

        res = await fetch(
          `${
            import.meta.env.VITE_BACKEND
          }/api/ngos/nearby?lat=${lat}&lng=${lng}`
        );
      }
      const data = await res.json();
      setNgos(data);
    } catch (err) {
      console.error(err);
      setNgos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(loc.search);
    const type = query.get("type");
    if (type === "name") {
      fetchData("name", { name: query.get("name") });
    } else if (type === "location") {
      fetchData("location", {
        lat: query.get("lat"),
        lng: query.get("lng"),
      });
    }
  }, [loc.search]);

  return (
    <div className="p-6">
      <SearchNGO />

      {loading ? (
        <p className="mt-6 text-gray-600">Loading NGOs...</p>
      ) : (
        <NGOGrid ngos={ngos} />
      )}
    </div>
  );
};

export default NGODisplayPage;
