import { useEffect, useState } from "react";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: string;
  color: string;
}

interface GoalsTrackerProps {
  goals: Goal[];
  isDark?: boolean;
}

const GoalsTracker: React.FC<GoalsTrackerProps> = ({ goals, isDark = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate progress bars
    const timers = goals.map((goal) => {
      return setTimeout(() => {
        const progress = Math.min((goal.current / goal.target) * 100, 100);
        setAnimatedProgress((prev) => ({ ...prev, [goal.id]: progress }));
      }, 500);
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [goals]);

  const getColorClasses = (color: string, isDark: boolean) => {
    const colorMap: { [key: string]: { bg: string; text: string; progressBg: string } } = {
      blue: {
        bg: isDark ? "bg-blue-900/50" : "bg-blue-100",
        text: isDark ? "text-blue-300" : "text-blue-800",
        progressBg: "bg-blue-500",
      },
      green: {
        bg: isDark ? "bg-green-900/50" : "bg-green-100",
        text: isDark ? "text-green-300" : "text-green-800",
        progressBg: "bg-green-500",
      },
      purple: {
        bg: isDark ? "bg-purple-900/50" : "bg-purple-100",
        text: isDark ? "text-purple-300" : "text-purple-800",
        progressBg: "bg-purple-500",
      },
      orange: {
        bg: isDark ? "bg-orange-900/50" : "bg-orange-100",
        text: isDark ? "text-orange-300" : "text-orange-800",
        progressBg: "bg-orange-500",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div
      className={`rounded-lg shadow-lg p-6 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          🎯 Goals Tracker
        </h2>
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            isDark ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-800"
          }`}>
          {goals.filter((g) => g.current >= g.target).length} / {goals.length} Completed
        </span>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => {
          const progress = animatedProgress[goal.id] || 0;
          const isCompleted = goal.current >= goal.target;
          const colors = getColorClasses(goal.color, isDark);

          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {goal.name}
                    </p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      €{goal.current.toLocaleString()} / €{goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${colors.text}`}>{progress.toFixed(0)}%</p>
                  {isCompleted && <span className="text-xs text-green-500">✓ Complete</span>}
                </div>
              </div>

              <div className={`h-3 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${colors.progressBg}`}
                  style={{ width: `${progress}%` }}>
                  {isCompleted && (
                    <div className="h-full flex items-center justify-end pr-2">
                      <span className="text-white text-xs font-bold">🎉</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Remaining amount */}
              {!isCompleted && (
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  €{(goal.target - goal.current).toLocaleString()} remaining
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall progress */}
      <div
        className={`mt-6 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Overall Progress
          </span>
          <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {(
              (goals.reduce((sum, g) => sum + g.current, 0) /
                goals.reduce((sum, g) => sum + g.target, 0)) *
              100
            ).toFixed(1)}
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalsTracker;