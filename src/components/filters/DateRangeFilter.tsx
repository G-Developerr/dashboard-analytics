interface DateRangeFilterProps {
  startMonth: number;
  endMonth: number;
  onStartChange: (month: number) => void;
  onEndChange: (month: number) => void;
  isDark?: boolean;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startMonth,
  endMonth,
  onStartChange,
  onEndChange,
  isDark = false,
}) => {
  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  return (
    <div className={`rounded-lg shadow p-4 mb-6 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        📅 Filter by Date Range
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            From:
          </label>
          <select
            value={startMonth}
            onChange={(e) => onStartChange(Number(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            To:
          </label>
          <select
            value={endMonth}
            onChange={(e) => onEndChange(Number(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
