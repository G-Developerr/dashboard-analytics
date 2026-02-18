import { useEffect, useState, useMemo } from "react";

interface Insight {
  id: string;
  type: "success" | "warning" | "info" | "trend";
  title: string;
  description: string;
  icon: string;
}

interface InsightsPanelProps {
  salesData: {
    month: string;
    sales: number;
    orders: number;
    profit: number;
  }[];
  isDark?: boolean;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ salesData, isDark = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Χρησιμοποίησε useMemo αντί για useEffect με setState
  const insights = useMemo(() => {
    const generatedInsights: Insight[] = [];

    if (salesData.length >= 2) {
      // Sales trend
      const lastMonth = salesData[salesData.length - 1];
      const prevMonth = salesData[salesData.length - 2];
      const salesChange = ((lastMonth.sales - prevMonth.sales) / prevMonth.sales) * 100;

      if (salesChange > 10) {
        generatedInsights.push({
          id: "sales-up",
          type: "success",
          title: "Strong Sales Growth! 🚀",
          description: `Sales increased by ${salesChange.toFixed(1)}% compared to last month. Keep up the momentum!`,
          icon: "📈",
        });
      } else if (salesChange < -5) {
        generatedInsights.push({
          id: "sales-down",
          type: "warning",
          title: "Sales Decline Alert ⚠️",
          description: `Sales dropped by ${Math.abs(salesChange).toFixed(1)}% from last month. Consider promotional campaigns.`,
          icon: "📉",
        });
      }

      // Profit margin analysis
      const avgProfitMargin =
        (salesData.reduce((sum, item) => sum + item.profit, 0) /
          salesData.reduce((sum, item) => sum + item.sales, 0)) *
        100;

      if (avgProfitMargin > 28) {
        generatedInsights.push({
          id: "profit-high",
          type: "success",
          title: "Excellent Profit Margins! 💎",
          description: `Average profit margin is ${avgProfitMargin.toFixed(1)}%, exceeding the healthy 25% benchmark.`,
          icon: "💰",
        });
      } else if (avgProfitMargin < 20) {
        generatedInsights.push({
          id: "profit-low",
          type: "warning",
          title: "Low Profit Margins ⚠️",
          description: `Profit margin is ${avgProfitMargin.toFixed(1)}%. Review pricing strategy and cost optimization.`,
          icon: "⚠️",
        });
      }

      // Best performing month
      const bestMonth = salesData.reduce((max, item) => (item.sales > max.sales ? item : max));
      generatedInsights.push({
        id: "best-month",
        type: "info",
        title: `${bestMonth.month} Was Your Best Month! 🏆`,
        description: `Achieved €${bestMonth.sales.toLocaleString()} in sales with ${bestMonth.orders} orders.`,
        icon: "🌟",
      });

      // Orders trend
      const avgOrders = salesData.reduce((sum, item) => sum + item.orders, 0) / salesData.length;
      const lastMonthOrders = lastMonth.orders;

      if (lastMonthOrders > avgOrders * 1.2) {
        generatedInsights.push({
          id: "orders-trend",
          type: "trend",
          title: "Order Volume Surging! 📦",
          description: `Last month's orders (${lastMonthOrders}) exceeded the average by ${(((lastMonthOrders - avgOrders) / avgOrders) * 100).toFixed(1)}%.`,
          icon: "📊",
        });
      }

      // Consistency check
      const salesValues = salesData.map((d) => d.sales);
      const mean = salesValues.reduce((a, b) => a + b, 0) / salesValues.length;
      const stdDev = Math.sqrt(
        salesValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / salesValues.length
      );
      const cvPercent = (stdDev / mean) * 100;

      if (cvPercent < 15) {
        generatedInsights.push({
          id: "consistency",
          type: "success",
          title: "Consistent Performance 🎯",
          description:
            "Your sales show great consistency with low volatility. Predictable revenue stream!",
          icon: "✅",
        });
      }
    }

    return generatedInsights;
  }, [salesData]);

  const getInsightStyles = (type: "success" | "warning" | "info" | "trend") => {
    const styleMap = {
      success: {
        border: "border-l-green-500",
        bg: isDark ? "bg-green-900/20" : "bg-green-50",
        icon: "text-green-500",
      },
      warning: {
        border: "border-l-orange-500",
        bg: isDark ? "bg-orange-900/20" : "bg-orange-50",
        icon: "text-orange-500",
      },
      info: {
        border: "border-l-blue-500",
        bg: isDark ? "bg-blue-900/20" : "bg-blue-50",
        icon: "text-blue-500",
      },
      trend: {
        border: "border-l-purple-500",
        bg: isDark ? "bg-purple-900/20" : "bg-purple-50",
        icon: "text-purple-500",
      },
    };
    return styleMap[type];
  };

  return (
    <div
      className={`rounded-lg shadow-lg p-6 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          💡 AI Insights
        </h2>
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            isDark ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-800"
          }`}>
          {insights.length} Insights
        </span>
      </div>

      <div className="space-y-4">
        {insights.length === 0 ? (
          <div className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            <p className="text-4xl mb-2">🤖</p>
            <p className="text-sm">Analyzing your data...</p>
          </div>
        ) : (
          insights.map((insight, index) => {
            const styles = getInsightStyles(insight.type);
            return (
              <div
                key={insight.id}
                className={`border-l-4 ${styles.border} ${styles.bg} p-4 rounded-r-lg transition-all duration-300 hover:shadow-md`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideInRight 0.5s ease-out",
                }}>
                <div className="flex items-start gap-3">
                  <span className={`text-2xl ${styles.icon}`}>{insight.icon}</span>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {insight.title}
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick actions */}
      {insights.length > 0 && (
        <div className={`mt-6 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <p className={`text-xs font-medium mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            RECOMMENDED ACTIONS
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              📊 View Full Report
            </button>
            <button
              className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              📈 Set New Goals
            </button>
            <button
              className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              💡 Get Suggestions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;
