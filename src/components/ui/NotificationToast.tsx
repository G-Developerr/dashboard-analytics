import { useEffect } from "react";

interface NotificationToastProps {
  message: string;
  onClose: () => void;
  isDark?: boolean;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  onClose,
  isDark = false,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`rounded-xl shadow-2xl p-5 flex items-center gap-4 max-w-[380px] w-full border-l-4 backdrop-blur-sm animate-slide-in-right ${
        isDark
          ? "bg-gray-800/95 text-white border-l-blue-500 shadow-blue-500/20"
          : "bg-white/95 text-gray-900 border-l-green-500 shadow-green-500/20"
      }`}
      style={{
        boxShadow: isDark
          ? "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
          : "0 20px 25px -5px rgba(34, 197, 94, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      }}>
      <div className="text-3xl flex-shrink-0 animate-bounce">🎉</div>
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-base truncate ${isDark ? "text-white" : "text-gray-900"}`}>
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className={`text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all hover:rotate-90 ${
          isDark
            ? "text-gray-400 hover:bg-gray-700 hover:text-white"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        }`}>
        ✕
      </button>
    </div>
  );
};

export default NotificationToast;
