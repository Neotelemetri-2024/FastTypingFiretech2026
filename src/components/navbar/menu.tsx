import { motion } from "framer-motion";

interface NavItem {
  label: string;
  path: string;
}

interface DesktopNavMenuProps {
  navItems: NavItem[];
  darkMode: boolean;
  activeSection: string;
  onNavClick: (item: NavItem) => void;
}

export default function DesktopNavMenu({
  navItems,
  darkMode,
  activeSection,
  onNavClick,
}: DesktopNavMenuProps) {
  return (
    <ul className="hidden md:flex flex-1 items-center justify-center gap-1">
      {navItems.map((item) => {
        const isItemActive = activeSection === item.path;

        return (
          <li key={item.path} className="relative">
            <button
              onClick={() => onNavClick(item)}
              className={`cursor-pointer relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                isItemActive
                  ? darkMode
                    ? "text-blue-600"
                    : "text-red-600"
                  : darkMode
                    ? "text-black hover:text-slate-900"
                    : "text-white hover:text-white"
              }`}
            >
              {item.label}
            </button>

            {isItemActive && (
              <motion.div
                layoutId="desktop-nav-active-pill"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`absolute inset-0 rounded-full ${
                  darkMode
                    ? "bg-blue-50 ring-1 ring-blue-600/20"
                    : "bg-red-600/15 ring-1 ring-red-500/30"
                }`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
