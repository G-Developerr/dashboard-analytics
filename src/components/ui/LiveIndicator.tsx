interface LiveIndicatorProps {
  isLive: boolean;
  isDark?: boolean;
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ isLive, isDark = false }) => {
  if (!isLive) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      </div>
      <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        LIVE
      </span>
    </div>
  );
};

export default LiveIndicator;
