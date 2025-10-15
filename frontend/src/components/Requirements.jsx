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
    return <></>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 flex flex-col mb-10">
      <h1 className="text-2xl md:text-3xl mx-auto font-bold text-gray-800 mb-6 border-b-2 border-primary-500 inline-block pb-1">
        Listed Requirements
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {requirements.map((req) => (
          <div
            key={req._id}
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all bg-white hover:scale-[1.01] cursor-pointer"
            onClick={() => navigate(`/requirements/${req._id}`)}
          >
            <h2 className="text-xl font-semibold text-primary-700 mb-1">
              {req.title}
            </h2>

            <p className="text-gray-700 text-sm line-clamp-3 mb-3">
              {req.description}
            </p>

            <div className="text-sm text-gray-500 flex justify-between items-center">
              <p>
                Posted by:{" "}
                <span className="font-medium text-gray-700">
                  {req.ngo?.name || "Unknown NGO"}
                </span>
              </p>
              <span className="text-xs text-gray-400">
                {new Date(req.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequirementsList;
