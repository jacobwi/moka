import { Link } from "react-router-dom";

export const NavIcon = ({ icon, label, isSpecial = false, to = "" }) => (
  <Link
    to={to}
    className={`flex flex-col items-center transition-colors duration-150 ease-in-out hover:scale-110 ${
      isSpecial
        ? "text-theme-accent hover:text-theme-accent-hover"
        : "text-theme-text hover:text-theme-accent"
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);
