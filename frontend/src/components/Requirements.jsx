import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequirementsList = () => {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/requirements`
      );

      const data = await res.json();
      setRequirements(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!requirements || requirements.length === 0) {
    return <p className="text-gray-600 mt-4">No current requirements 💤</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mx-auto">
      {requirements.map((req) => (
        <div
          key={req._id}
          className="border rounded-lg p-4 shadow hover:shadow-md cursor-pointer transition"
          onClick={() => navigate(`/requirements/${req._id}`)}
        >
          <h2 className="text-lg font-semibold text-primary-700">
            {req.title}
          </h2>
          <p className="text-gray-700 mt-1 line-clamp-2">{req.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Posted by: <span className="font-medium">{req.ngo?.name}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(req.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RequirementsList;
