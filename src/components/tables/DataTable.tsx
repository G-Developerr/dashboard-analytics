import { useState, useMemo } from "react";

interface DataTableProps {
  data: {
    month: string;
    sales: number;
    orders: number;
    profit: number;
  }[];
  isDark?: boolean;
}

type SortKey = "month" | "sales" | "orders" | "profit";
type SortOrder = "asc" | "desc";

const DataTable: React.FC<DataTableProps> = ({ data, isDark = false }) => {
  const [sortKey, setSortKey] = useState<SortKey>("month");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }

      return sortOrder === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    // Filter by search
    if (searchTerm) {
      return sorted.filter((item) => item.month.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return sorted;
  }, [data, sortKey, sortOrder, searchTerm]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return "⇅";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className={`rounded-lg shadow p-6 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          📋 Monthly Data
        </h2>
        <input
          type="text"
          placeholder="Search month..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDark
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
            <tr>
              <th
                onClick={() => handleSort("month")}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                  isDark ? "text-gray-300 hover:bg-gray-600" : "text-gray-500 hover:bg-gray-100"
                }`}>
                Month {getSortIcon("month")}
              </th>
              <th
                onClick={() => handleSort("sales")}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                  isDark ? "text-gray-300 hover:bg-gray-600" : "text-gray-500 hover:bg-gray-100"
                }`}>
                Sales (€) {getSortIcon("sales")}
              </th>
              <th
                onClick={() => handleSort("orders")}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                  isDark ? "text-gray-300 hover:bg-gray-600" : "text-gray-500 hover:bg-gray-100"
                }`}>
                Orders {getSortIcon("orders")}
              </th>
              <th
                onClick={() => handleSort("profit")}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
                  isDark ? "text-gray-300 hover:bg-gray-600" : "text-gray-500 hover:bg-gray-100"
                }`}>
                Profit (€) {getSortIcon("profit")}
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-gray-300" : "text-gray-500"
                }`}>
                Profit Margin
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
            {sortedData.map((item, index) => {
              const margin = ((item.profit / item.sales) * 100).toFixed(1);
              return (
                <tr
                  key={index}
                  className={`transition-colors ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                    {item.month}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                    €{item.sales.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                    {item.orders.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                    €{item.profit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        parseFloat(margin) > 25
                          ? "bg-green-100 text-green-800"
                          : parseFloat(margin) > 20
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                      {margin}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          No data found
        </div>
      )}
    </div>
  );
};

export default DataTable;
