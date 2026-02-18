import { useState } from "react";
import type { ReactNode } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
  isDark?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, isDark = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
      {isVisible && (
        <div
          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs font-medium rounded-lg shadow-lg whitespace-nowrap z-50 ${isDark ? "bg-gray-700 text-white" : "bg-gray-900 text-white"}`}>
          {text}
          <div
            className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${isDark ? "border-t-gray-700" : "border-t-gray-900"}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
