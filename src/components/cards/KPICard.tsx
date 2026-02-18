import { useEffect, useState } from "react";
import Tooltip from "../ui/Tooltip";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  icon?: string;
  isDark?: boolean;
  tooltip?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  icon = "💰",
  isDark = false,
  tooltip,
}) => {
  const isPositive = change?.startsWith("+");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const card = (
    <div
      className={`rounded-lg shadow p-6 hover:shadow-xl transition-all duration-300 transform cursor-pointer ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {title}
          </p>
          <h3
            className={`text-3xl font-bold mt-2 transition-all duration-500 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
            {value}
          </h3>
          {change && (
            <p
              className={`text-sm mt-2 font-medium transition-colors duration-300 flex items-center gap-1 ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}>
              {isPositive ? "↗" : "↘"} {change}
            </p>
          )}
        </div>
        <div className="text-4xl opacity-80 transform transition-transform duration-300 hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip text={tooltip} isDark={isDark}>
        {card}
      </Tooltip>
    );
  }

  return card;
};

export default KPICard;
