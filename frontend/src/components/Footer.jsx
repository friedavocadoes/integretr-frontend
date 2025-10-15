import { Heart, Mail, Phone, MapPin, ArrowUp, Sparkles, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import routes from "../content/routes";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
            animate={{
              y: [-20, -40, -20],
              x: [0, 15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Heart className="h-8 w-8 text-primary-500" />
              </motion.div>
              <motion.span 
                className="text-xl font-bold"
                whileHover={{ 
                  scale: 1.05,
                  color: "#3b82f6",
                  transition: { duration: 0.2 }
                }}
              >
                NGOConnect
              </motion.span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 mb-6 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.span
                animate={{ 
                  color: ["#d1d5db", "#60a5fa", "#d1d5db"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                Connecting passionate volunteers
              </motion.span>
              {" with meaningful NGO opportunities. Together, we create lasting impact in communities worldwide."}
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Globe, number: '50+', label: 'Countries' },
                { icon: Users, number: '10K+', label: 'Volunteers' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <stat.icon className="h-5 w-5 text-primary-400" />
                  </motion.div>
                  <div>
                    <div className="text-white font-bold">{stat.number}</div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                { path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
                { path: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    backgroundColor: "rgba(59, 130, 246, 0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-lg font-semibold mb-4 relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Quick Links
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.h3>
            <ul className="space-y-3">
              {[
                { to: routes.home, label: 'Home' },
                { to: routes.ngo.find, label: 'Find NGOs' },
                { to: routes.contact, label: 'Contact' },
                { to: routes.ngo.login, label: 'NGO Login' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <motion.span
                      className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      whileHover={{ x: 5, color: "#60a5fa" }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-lg font-semibold mb-4 relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Contact Info
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "70%" }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              />
            </motion.h3>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: 'info@ngoconnect.com', color: 'text-blue-400' },
                { icon: Phone, text: '+1 (555) 123-4567', color: 'text-green-400' },
                { icon: MapPin, text: 'Global Platform', color: 'text-purple-400' }
              ].map((contact, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center space-x-3 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`p-2 rounded-full bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <contact.icon className={`h-4 w-4 ${contact.color}`} />
                  </motion.div>
                  <motion.span 
                    className="text-gray-300 group-hover:text-white transition-colors"
                    whileHover={{ color: contact.color.replace('text-', '#') }}
                  >
                    {contact.text}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-400 mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              © 2024 NGOConnect. All rights reserved. Built with 
              <motion.span
                className="inline-block mx-1"
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ["#ef4444", "#f97316", "#ef4444"]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                ❤️
              </motion.span>
              for social impact.
            </motion.p>
            
            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUp className="h-5 w-5 group-hover:text-yellow-300 transition-colors" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        viewport={{ once: true }}
      />
    </footer>
  );
};

export default Footer;
