import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ProductData {
  name: string;
  sales: number;
  percentage: number;
}

interface ProductsChartProps {
  products?: ProductData[];
  isDark?: boolean;
}

const ProductsChart: React.FC<ProductsChartProps> = ({ products = [], isDark = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Default data αν δεν υπάρχουν products
  const defaultProducts: ProductData[] = [
    { name: "Product A", sales: 4000, percentage: 25 },
    { name: "Product B", sales: 3000, percentage: 19 },
    { name: "Product C", sales: 2000, percentage: 12 },
    { name: "Product D", sales: 2780, percentage: 17 },
    { name: "Product E", sales: 1890, percentage: 11 },
  ];

  const data = products.length > 0 ? products : defaultProducts;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`;
    return `€${value}`;
  };

  const colors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#8B5CF6", // Purple
    "#EF4444", // Red
    "#EC4899", // Pink
    "#06B6D4", // Cyan
  ];

  const CustomTooltip = (props: unknown) => {
    const { active, payload, label } = props as {
      active?: boolean;
      payload?: Array<{
        value: number;
        payload: ProductData;
      }>;
      label?: string;
    };

    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg shadow-lg border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
          <p className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{label}</p>
          <p className={`${isDark ? "text-blue-300" : "text-blue-600"}`}>
            Sales: <span className="font-semibold">{formatCurrency(payload[0].value)}</span>
          </p>
          <p className={`${isDark ? "text-green-300" : "text-green-600"}`}>
            Market Share: <span className="font-semibold">{payload[0].payload.percentage}%</span>
          </p>
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
      <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        📦 Top Products
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#e5e7eb"}
            vertical={false}
          />
          <XAxis
            dataKey="name"
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
          <Legend />
          <Bar
            dataKey="sales"
            name="Sales (€)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationBegin={300}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <p>
          Total products: <span className="font-semibold">{data.length}</span>
        </p>
        <p>
          Top product: <span className="font-semibold">{data[0]?.name || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductsChart;
