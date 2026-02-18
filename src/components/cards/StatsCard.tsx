interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  isDark?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, isDark = false }) => {
  return (
    <div className={`rounded-lg shadow p-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <p
        className={`text-xs font-medium uppercase tracking-wider ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}>
        {title}
      </p>
      <p className={`text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>
        {value}
      </p>
      {subtitle && (
        <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}>{subtitle}</p>
      )}
    </div>
  );
};

export default StatsCard;
