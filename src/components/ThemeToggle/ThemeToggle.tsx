import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContextProvider";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 transition-colors duration-200 "
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
