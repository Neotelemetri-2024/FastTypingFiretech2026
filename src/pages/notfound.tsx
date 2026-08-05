import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/theme";
import ThemeSwitcher from "../components/themeswitcher";
import FiretechLogo from "../assets/firetech.webp";
import FiretechLogoBlack from "../assets/firetech1.webp";

const darkGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

const lightGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(248, 113, 113, 0.35) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.35) 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
};

export default function NotFound() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const logoSrc = darkMode ? FiretechLogoBlack : FiretechLogo;

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-500 ${
        darkMode ? "text-white" : "text-slate-900"
      }`}
      style={darkMode ? lightGradientStyle : darkGradientStyle}
    >
      {/* Theme Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Decorative floating Firetech logos */}
        <motion.img
          src={logoSrc}
          alt=""
          className="absolute top-16 left-8 h-20 w-20 object-contain opacity-15 sm:h-24 sm:w-24"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden
        />
        <motion.img
          src={logoSrc}
          alt=""
          className="absolute bottom-24 right-12 h-14 w-14 object-contain opacity-15 sm:h-16 sm:w-16"
          animate={{
            y: [0, 25, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden
        />
        <motion.img
          src={logoSrc}
          alt=""
          className="absolute top-1/3 right-8 h-10 w-10 object-contain opacity-15 sm:h-12 sm:w-12"
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />

        {/* 404 */}
        <div className="relative flex items-center gap-4 sm:gap-6">
          <motion.span
            className={`text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter select-none ${
              darkMode ? "text-blue-700" : "text-red-700"
            }`}
            style={{
              textShadow: darkMode ? "8px 8px 0 #dc2626" : "8px 8px 0 #1d4ed8",
            }}
            initial={{ x: -100, opacity: 0, rotate: -20 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.1,
            }}
          >
            4
          </motion.span>

          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.3,
            }}
          >
            <motion.span
              className={`text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter select-none ${
                darkMode ? "text-red-700" : "text-blue-700"
              }`}
              style={{
                textShadow: darkMode
                  ? "8px 8px 0 #2563eb"
                  : "8px 8px 0 #b91c1c",
              }}
              animate={{
                rotate: [0, 5, -5, 3, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              0
            </motion.span>
            <motion.span
              className={`absolute inset-0 text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter select-none opacity-40 ${
                darkMode ? "text-blue-700" : "text-red-700"
              }`}
              animate={{
                clipPath: [
                  "inset(0 0 80% 0)",
                  "inset(20% 0 60% 0)",
                  "inset(40% 0 40% 0)",
                  "inset(60% 0 20% 0)",
                  "inset(80% 0 0 0)",
                  "inset(0 0 80% 0)",
                ],
                x: [-4, 4, -2, 2, -4, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              0
            </motion.span>
          </motion.div>

          <motion.span
            className={`text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter select-none ${
              darkMode ? "text-blue-700" : "text-red-700"
            }`}
            style={{
              textShadow: darkMode ? "8px 8px 0 #dc2626" : "8px 8px 0 #1d4ed8",
            }}
            initial={{ x: 100, opacity: 0, rotate: 20 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.5,
            }}
          >
            4
          </motion.span>
        </div>

        {/* Message */}
        <motion.div
          className="mt-6 space-y-3"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p
            className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight ${
              darkMode ? "border-black text-black" : "border-white text-white"
            }`}
          >
            Oops! Page Not Found
          </p>
          <p
            className={`mx-auto max-w-md text-sm sm:text-base ${
              darkMode ? "border-black text-black" : "border-white text-white"
            }`}
          >
            Sorry, we couldn't find the page you're looking for. It may have
            been moved, deleted, or the URL might be incorrect.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.button
            onClick={() => navigate("/")}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border px-7 py-4 text-[15px] font-semibold tracking-wide backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl ${
              darkMode
                ? "border-black/20 bg-white/10 text-black"
                : "border-white/20 bg-white/5 text-white"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={`absolute inset-0 rounded-2xl ${
                darkMode
                  ? "bg-linear-to-r from-red-600/20 via-blue-600/20 to-red-600/20"
                  : "bg-linear-to-r from-red-400/15 via-blue-400/15 to-red-400/15"
              }`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <svg
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Firetech
            </span>
          </motion.button>
          <motion.button
            onClick={() => navigate("/dashboard")}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border px-7 py-3.5 text-[15px] font-semibold tracking-wide backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              darkMode
                ? "border-black/20 bg-black/5 text-black hover:bg-black hover:text-white"
                : "border-white/20 bg-white/10 text-white hover:bg-white hover:text-black"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                className="h-5 w-5 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Dashboard
            </span>
          </motion.button>
        </motion.div>

        {/* Decorative bottom dots */}
        <motion.div
          className="absolute bottom-10 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className={`h-2 w-2 rounded-full ${
                darkMode ? "bg-black" : "bg-white"
              }`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
