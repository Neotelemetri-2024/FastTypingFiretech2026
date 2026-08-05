import { useTheme } from "../context/theme";

export default function ThemeSwitcher() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className={`group relative ml-4 h-10 w-10 rounded-full border cursor-pointer p-2 shadow-md transition-all duration-300 hover:-translate-y-0.5 md:ml-6 ${
        darkMode
          ? "bg-white border-hover:bg-slate-800 text-black"
          : "bg-black border-white/80 text-white"
      }`}
      aria-label="Toggle theme"
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12h-1m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 5a7 7 0 100 14 7 7 0 000-14z"
          />
        </svg>
      )}
    </button>
  );
}
