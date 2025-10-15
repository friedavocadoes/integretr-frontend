import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Heart,
  Users,
  Globe,
  ArrowRight,
  Sparkles,
  Star,
  MapPin,
  CheckCircle,
  Target,
  Zap,
} from "lucide-react";
import RequirementsList from "../components/Requirements";
import SearchNGO from "../components/SearchNGO";

const Home = () => {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [useLocation, setUseLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
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

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(
            `${position.coords.latitude}, ${position.coords.longitude}`
          );
          setUseLocation(true);
          setSearchCity("");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enter city manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCategory) params.append("category", searchCategory);
    if (useLocation && currentLocation) {
      params.append("location", currentLocation);
      params.append("useLocation", "true");
    } else if (searchCity) {
      params.append("city", searchCity);
    }
    navigate(`/find-ngos?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {"Find NGOs That Match Your ".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.05,
                    delay: 0.3 + index * 0.03,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span
                className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 },
                }}
              >
                Passion
              </motion.span>
              <motion.div
                className="inline-block ml-2"
                initial={{ opacity: 0, rotate: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  rotate: 360,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 1.5,
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <Sparkles className="h-8 w-8 text-yellow-500" />
              </motion.div>
            </motion.h1>
            <motion.div
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {["Connect.", "Volunteer.", "Create Impact."].map(
                (word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2 font-semibold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      color: [
                        "#6b7280",
                        index === 0
                          ? "#2563eb"
                          : index === 1
                          ? "#7c3aed"
                          : "#059669",
                        "#6b7280",
                      ],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.2,
                      color: {
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        delay: index * 0.5,
                      },
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {word}
                  </motion.span>
                )
              )}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Join thousands of volunteers making a difference in communities
                worldwide.
              </motion.span>
            </motion.div>

            <SearchNGO />
          </motion.div>
        </div>
      </section>
      <div className="flex mx-20">
        <RequirementsList />
      </div>
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-primary-100 rounded-full"
              animate={{
                y: [-20, -40, -20],
                x: [0, 20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {"How NGOConnect Works".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.05,
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -3,
                    color: "#2563eb",
                    transition: { duration: 0.2 },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{
                  color: ["#6b7280", "#2563eb", "#6b7280"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                Simple steps
              </motion.span>
              {" to start making a difference in your community"}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Discover NGOs",
                description:
                  "Search for NGOs by category, location, or cause that matters to you",
                color: "from-blue-500 to-purple-600",
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600",
                features: [
                  "Filter by category",
                  "Location-based search",
                  "Cause matching",
                ],
              },
              {
                icon: Heart,
                title: "Apply to Volunteer",
                description:
                  "Apply to opportunities that match your skills and interests",
                color: "from-pink-500 to-red-600",
                bgColor: "bg-pink-50",
                iconColor: "text-pink-600",
                features: [
                  "Skill matching",
                  "Easy application",
                  "Track status",
                ],
              },
              {
                icon: Users,
                title: "Make Impact",
                description:
                  "Work with NGOs to create meaningful change in communities",
                color: "from-green-500 to-teal-600",
                bgColor: "bg-green-50",
                iconColor: "text-green-600",
                features: [
                  "Real impact",
                  "Community work",
                  "Meaningful change",
                ],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  bounce: 0.3,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="relative group cursor-pointer"
                viewport={{ once: true }}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                />

                {/* Main Card */}
                <div
                  className={`relative ${feature.bgColor} rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden`}
                >
                  {/* Floating Elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        animate={{
                          y: [-10, -20, -10],
                          x: [0, 5, 0],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.5 + index * 0.2,
                        }}
                        style={{
                          left: `${20 + i * 25}%`,
                          top: `${10 + (i % 2) * 70}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Icon with Animation */}
                  <motion.div
                    className="relative mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2 + 0.4,
                      type: "spring",
                      bounce: 0.5,
                    }}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}
                  >
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>

                    {/* Sparkle Effect */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      <Sparkles className="h-5 w-5 text-yellow-400" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center relative z-10">
                    <motion.h3
                      className="text-2xl font-bold text-gray-900 mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-600 mb-6 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                    >
                      {feature.description}
                    </motion.p>

                    {/* Feature List */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                    >
                      {feature.features.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.2 + 0.9 + i * 0.1,
                          }}
                          className="flex items-center justify-center space-x-2 text-sm text-gray-700"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Number Badge */}
                  <motion.div
                    className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {"Ready to Make a ".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.05,
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -3,
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 },
                }}
              >
                Difference?
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Star className="h-6 w-6 text-yellow-300" />
                </motion.div>
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 10px rgba(255,255,255,0.3)",
                    "0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                Join our community
              </motion.span>
              {" of volunteers and NGOs working together for "}
              <motion.span
                className="font-semibold"
                animate={{
                  color: ["#dbeafe", "#fbbf24", "#10b981", "#dbeafe"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                positive change
              </motion.span>
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/volunteer-login")}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Join as Volunteer</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,1)",
                  color: "#2563eb",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/ngo-login")}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all shadow-lg"
              >
                Register Your NGO
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
