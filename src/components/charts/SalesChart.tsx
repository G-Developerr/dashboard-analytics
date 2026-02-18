import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesChartProps {
  data: {
    month: string;
    sales: number;
    orders: number;
    profit: number;
  }[];
  isDark?: boolean;
  companyName?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ data, isDark = false, companyName }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const getIndustryColors = (companyName?: string) => {
    if (!companyName) return { sales: "#3b82f6", profit: "#10b981" };

    if (companyName.includes("TECHNOVA")) return { sales: "#6366f1", profit: "#8b5cf6" }; // Purple/Indigo
    if (companyName.includes("GREENENERGY")) return { sales: "#10b981", profit: "#059669" }; // Green
    if (companyName.includes("HEALTHPHARMA")) return { sales: "#ef4444", profit: "#dc2626" }; // Red
    if (companyName.includes("URBANSTYLE")) return { sales: "#f59e0b", profit: "#d97706" }; // Amber

    return { sales: "#3b82f6", profit: "#10b981" }; // Default blue/green
  };

  const colors = getIndustryColors(companyName);
  const chartTitle = companyName ? `${companyName} Sales Overview` : "Sales Overview";

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`;
    return `€${value}`;
  };

  const CustomTooltip = (props: unknown) => {
    const { active, payload, label } = props as {
      active?: boolean;
      payload?: Array<{ value: number }>;
      label?: string;
    };

    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg shadow-lg border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
          <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{label}</p>
          <p className={`flex items-center gap-2 ${isDark ? "text-blue-300" : "text-blue-600"}`}>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Sales: <span className="font-semibold">{formatCurrency(payload[0].value)}</span>
          </p>
          <p className={`flex items-center gap-2 ${isDark ? "text-green-300" : "text-green-600"}`}>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Profit: <span className="font-semibold">{formatCurrency(payload[1].value)}</span>
          </p>
          {payload[2] && (
            <p className={`flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <span className="w-2 h-2 rounded-full bg-gray-500"></span>
              Orders: <span className="font-semibold">{payload[2].value.toLocaleString()}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`rounded-lg shadow-lg p-6 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          📈 {chartTitle}
        </h2>
        <div
          className={`text-sm px-3 py-1 rounded-full ${
            isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
          }`}>
          {data.length} months data
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#e5e7eb"}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
          />
          <YAxis
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: isDark ? "#4b5563" : "#d1d5db" }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={CustomTooltip} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px",
            }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke={colors.sales}
            strokeWidth={3}
            name="Sales (€)"
            dot={{
              fill: colors.sales,
              r: 4,
              strokeWidth: 2,
              stroke: isDark ? "#1f2937" : "#ffffff",
            }}
            activeDot={{
              r: 6,
              stroke: colors.sales,
              strokeWidth: 2,
              fill: isDark ? "#1f2937" : "#ffffff",
            }}
            animationDuration={1500}
            animationBegin={200}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke={colors.profit}
            strokeWidth={3}
            name="Profit (€)"
            dot={{
              fill: colors.profit,
              r: 4,
              strokeWidth: 2,
              stroke: isDark ? "#1f2937" : "#ffffff",
            }}
            activeDot={{
              r: 6,
              stroke: colors.profit,
              strokeWidth: 2,
              fill: isDark ? "#1f2937" : "#ffffff",
            }}
            animationDuration={1500}
            animationBegin={400}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Orders"
            dot={false}
            animationDuration={1500}
            animationBegin={600}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <p>
          Total period sales:{" "}
          <span className="font-semibold">
            {formatCurrency(data.reduce((sum, item) => sum + item.sales, 0))}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SalesChart;
