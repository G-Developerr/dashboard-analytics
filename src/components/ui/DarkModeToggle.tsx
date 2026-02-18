interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-10 w-20 rounded-full transition-colors duration-300 focus:outline-none ${
        isDark ? "bg-blue-600" : "bg-gray-300"
      }`}
      aria-label="Toggle dark mode"
      type="button">
      <span
        className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
          isDark ? "translate-x-11" : "translate-x-1"
        } flex items-center justify-center text-lg`}>
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default DarkModeToggle;
