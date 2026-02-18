import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface RegionData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface RegionChartProps {
  regions?: RegionData[];
  isDark?: boolean;
}

const RegionChart: React.FC<RegionChartProps> = ({ regions = [], isDark = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Default data αν δεν υπάρχουν regions
  const defaultRegions: RegionData[] = [
    { name: "North America", value: 40, color: "#3B82F6" },
    { name: "Europe", value: 30, color: "#10B981" },
    { name: "Asia", value: 20, color: "#F59E0B" },
    { name: "Other", value: 10, color: "#8B5CF6" },
  ];

  const data = regions.length > 0 ? regions : defaultRegions;

  const CustomTooltip = (props: unknown) => {
    const { active, payload } = props as {
      active?: boolean;
      payload?: Array<{ name: string; value: number }>;
    };

    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg shadow-lg border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
          <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {payload[0].name}
          </p>
          <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Market Share: <span className="font-semibold">{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (props: unknown) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props as {
      cx: number;
      cy: number;
      midAngle: number;
      innerRadius: number;
      outerRadius: number;
      percent: number;
    };

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Βρες την περιοχή με τη μεγαλύτερη αξία
  const largestRegion = data.reduce(
    (max, region) => (region.value > max.value ? region : max),
    data[0]
  );

  return (
    <div
      className={`rounded-lg shadow-lg p-6 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
      <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        🌍 Sales by Region
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            animationDuration={1500}
            animationBegin={300}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend
            wrapperStyle={{
              fontSize: "14px",
              paddingTop: "20px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <p>
          Total regions: <span className="font-semibold">{data.length}</span>
        </p>
        <p>
          Largest region: <span className="font-semibold">{largestRegion?.name || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default RegionChart;
