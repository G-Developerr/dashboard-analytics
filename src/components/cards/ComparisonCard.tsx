import { useEffect, useState } from "react";

interface ComparisonCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  prefix?: string;
  suffix?: string;
  isDark?: boolean;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  currentValue,
  previousValue,
  prefix = "€",
  suffix = "",
  isDark = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const difference = currentValue - previousValue;
  const percentageChange = previousValue > 0 ? ((difference / previousValue) * 100).toFixed(1) : 0;
  const isPositive = difference >= 0;

  const formatValue = (value: number) => {
    if (prefix === "€") {
      return `€${(value / 1000).toFixed(1)}K`;
    }
    return `${prefix}${value.toLocaleString()}${suffix}`;
  };

  return (
    <div
      className={`rounded-lg shadow-lg p-6 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {title}
          </p>
          <h3 className={`text-3xl font-bold mt-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            {formatValue(currentValue)}
          </h3>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPositive
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
          }`}>
          {isPositive ? "↗" : "↘"} {Math.abs(Number(percentageChange))}%
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}>Last Year</p>
          <p className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {formatValue(previousValue)}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}>Change</p>
          <p
            className={`text-lg font-semibold ${
              isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}>
            {isPositive ? "+" : ""}
            {formatValue(Math.abs(difference))}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className={`h-2 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              isPositive ? "bg-green-500" : "bg-red-500"
            }`}
            style={{
              width: `${Math.min(Math.abs(Number(percentageChange)) * 2, 100)}%`,
            }}></div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;