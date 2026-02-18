import { useState, useMemo, useEffect } from "react";
import KPICard from "./components/cards/KPICard";
import SalesChart from "./components/charts/SalesChart";
import ProductsChart from "./components/charts/ProductsChart";
import RegionChart from "./components/charts/RegionChart";
import DateRangeFilter from "./components/filters/DateRangeFilter";
import ExportButtons from "./components/export/ExportButtons";
import DataTable from "./components/tables/DataTable";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import DarkModeToggle from "./components/ui/DarkModeToggle";
import NotificationToast from "./components/ui/NotificationToast";
import LiveIndicator from "./components/ui/LiveIndicator";
import Footer from "./components/layout/Footer";
import StatsCard from "./components/cards/StatsCard";
import LoginForm from "./components/auth/LoginForm";
import DataUpload from "./components/admin/DataUpload";
import { companyAccounts } from "./data/companyData";
import type { CompanyStats } from "./data/companyData";

interface Notification {
  id: number;
  message: string;
}

interface User {
  email: string;
  companyName: string;
}

interface UploadedData {
  sales: number;
  orders: number;
  profit: number;
  timestamp: string;
}

function App() {
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(11);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveBoost, setLiveBoost] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [companyData, setCompanyData] = useState<CompanyStats | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadTheme = () => {
      const savedTheme = localStorage.getItem("darkMode");
      if (savedTheme === "true") {
        setIsDark(true);
      }
    };

    const loadAuth = () => {
      const savedUser = localStorage.getItem("dashboard_user");
      const savedCompanyId = localStorage.getItem("company_data");

      if (savedUser && savedCompanyId) {
        try {
          const userData = JSON.parse(savedUser);
          const companyId = parseInt(savedCompanyId);
          const company = companyAccounts.find((c) => c.id === companyId);

          if (company) {
            setUser(userData);
            setCompanyData(company);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };

    loadTheme();
    loadAuth();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  const toggleLiveMode = () => {
    setIsLiveMode(!isLiveMode);
    if (!isLiveMode) {
      showNotification("Live mode activated! 🚀");
    } else {
      setLiveBoost(0);
      showNotification("Live mode deactivated");
    }
  };

  const showNotification = (message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      const randomSale = Math.floor(Math.random() * 2000) + 500;
      setLiveBoost((prev) => prev + randomSale);

      const products = [
        "Laptop Pro 15",
        "Wireless Mouse",
        "4K Monitor",
        "Mechanical Keyboard",
        "Headphones Pro",
      ];
      const randomProduct = products[Math.floor(Math.random() * products.length)];

      showNotification(`New sale: ${randomProduct} - €${randomSale.toLocaleString()}`);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const handleLogin = (email: string, password: string) => {
    const foundCompany = companyAccounts.find(
      (company) => company.email === email && company.password === password
    );

    if (foundCompany) {
      const userData = {
        email: foundCompany.email,
        companyName: foundCompany.companyName,
      };

      setUser(userData);
      setCompanyData(foundCompany);
      setIsAuthenticated(true);
      localStorage.setItem("dashboard_user", JSON.stringify(userData));
      localStorage.setItem("company_data", JSON.stringify(foundCompany.id));
      showNotification(`Welcome to ${foundCompany.companyName}! 👋`);
    } else {
      showNotification("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCompanyData(null);
    setShowAdminPanel(false);
    localStorage.removeItem("dashboard_user");
    localStorage.removeItem("company_data");
    showNotification("Logged out successfully");
  };

  const handleDataUpload = (newData: UploadedData) => {
    if (!companyData) return;

    const newMonthData = {
      month: `Custom ${new Date().toLocaleDateString("en-GB")}`,
      sales: newData.sales || 15000,
      orders: newData.orders || 150,
      profit: newData.profit || 8000,
      region: "Custom Upload",
    };

    const updatedCompany = {
      ...companyData,
      monthlySales: [...companyData.monthlySales, newMonthData],
    };

    setCompanyData(updatedCompany);
    showNotification("Company data uploaded successfully! 📈");
  };

  const filteredData = useMemo(() => {
    if (!companyData) return [];
    return companyData.monthlySales.filter((_, index) => index >= startMonth && index <= endMonth);
  }, [startMonth, endMonth, companyData]);

  const totalSales = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.sales, 0) + liveBoost,
    [filteredData, liveBoost]
  );

  const totalOrders = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.orders, 0) + Math.floor(liveBoost / 800),
    [filteredData, liveBoost]
  );

  const totalProfit = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.profit, 0) + Math.floor(liveBoost * 0.28),
    [filteredData, liveBoost]
  );

  const formatCurrency = (num: number) => `€${(num / 1000).toFixed(1)}K`;
  const formatNumber = (num: number) => num.toLocaleString();

  // --- ΑΠΛΗ ΛΟΓΙΚΗ ΧΩΡΙΣ LOCALSTORAGE ΓΙΑ ΤΕΣΤ ---
  // Αν θες να δεις ΜΟΝΟ το login form, σβήσε όλα τα παραπάνω και άφησε μόνο:
  // return <LoginForm onLogin={handleLogin} />;

  // Η σωστή λογική με authentication:
  if (!isAuthenticated) {
    // ΠΕΡΝΑΜΕ ΣΩΣΤΑ ΤΟ onLogin PROP
    return <LoginForm onLogin={handleLogin} />;
  }

  // Render Admin Panel if toggled
  if (showAdminPanel) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <LoadingOverlay isLoading={isLoading} />

        <div className="fixed top-32 sm:top-36 right-0 z-50 space-y-2 flex flex-col items-end pr-4">
          {notifications.map((notif) => (
            <NotificationToast
              key={notif.id}
              message={notif.message}
              onClose={() => removeNotification(notif.id)}
              isDark={isDark}
            />
          ))}
        </div>

        <header
          className={`shadow-sm transition-colors duration-300 sticky top-0 z-40 ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div>
                  <h1
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    ⚙️ Company Admin Panel
                  </h1>
                  <p
                    className={`mt-1 text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Manage your analytics data and settings
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div
                  className={`hidden sm:block text-right ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  <p className="text-sm font-medium truncate max-w-[120px]">{user?.companyName}</p>
                  <p className="text-xs opacity-75 truncate max-w-[120px]">{user?.email}</p>
                </div>

                <button
                  onClick={() => setShowAdminPanel(false)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}>
                  📊 View Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    isDark
                      ? "bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300"
                      : "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700"
                  }`}>
                  Logout
                </button>

                <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <DataUpload isDark={isDark} onDataUpload={handleDataUpload} />
            </div>

            <div
              className={`rounded-xl p-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                Company Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Data Refresh Interval
                  </label>
                  <select
                    className={`w-full rounded-lg border px-3 py-2 ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}>
                    <option>5 minutes</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Export Format
                  </label>
                  <select
                    className={`w-full rounded-lg border px-3 py-2 ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}>
                    <option>CSV</option>
                    <option>Excel</option>
                    <option>PDF</option>
                    <option>JSON</option>
                  </select>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors mt-4 ${isDark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
                  Save Settings
                </button>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Recent Data Uploads
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                    <th
                      className={`text-left py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Date
                    </th>
                    <th
                      className={`text-left py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Type
                    </th>
                    <th
                      className={`text-left py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Records
                    </th>
                    <th
                      className={`text-left py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${isDark ? "border-gray-700/50" : "border-gray-200"}`}>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Today, 10:30 AM
                    </td>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      CSV Import
                    </td>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      1,248 records
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className={`border-b ${isDark ? "border-gray-700/50" : "border-gray-200"}`}>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Yesterday, 3:15 PM
                    </td>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Manual Entry
                    </td>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      12 records
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Dec 12, 9:45 AM
                    </td>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      API Sync
                    </td>
                    <td className={`py-3 px-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      5,672 records
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/10 text-blue-500">
                        Processing
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer isDark={isDark} githubUrl="https://github.com/G-Developerr" />
      </div>
    );
  }

  // Render Main Dashboard
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <LoadingOverlay isLoading={isLoading} />

      <div className="fixed top-32 sm:top-36 right-0 z-50 space-y-2 flex flex-col items-end pr-4">
        {notifications.map((notif) => (
          <NotificationToast
            key={notif.id}
            message={notif.message}
            onClose={() => removeNotification(notif.id)}
            isDark={isDark}
          />
        ))}
      </div>

      <header
        className={`shadow-sm transition-colors duration-300 sticky top-0 z-40 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div>
                <h1
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  📊 {companyData?.companyName || "Analytics Dashboard"}
                </h1>
                <p
                  className={`mt-1 text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {companyData?.description || "Sales performance overview for 2024"}
                </p>
              </div>
              <LiveIndicator isLive={isLiveMode} isDark={isDark} />
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div
                className={`hidden sm:block text-right ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <p className="text-sm font-medium truncate max-w-[120px]">{user?.companyName}</p>
                <p className="text-xs opacity-75 truncate max-w-[120px]">{user?.email}</p>
              </div>

              <button
                onClick={() => setShowAdminPanel(true)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  isDark
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}>
                ⚙️ Upload Data
              </button>

              <button
                onClick={toggleLiveMode}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  isLiveMode
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : isDark
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                }`}>
                {isLiveMode ? "⏸️ Stop Live" : "▶️ Start Live"}
              </button>

              <button
                onClick={handleLogout}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  isDark
                    ? "bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300"
                    : "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700"
                }`}>
                Logout
              </button>

              <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <DateRangeFilter
            startMonth={startMonth}
            endMonth={endMonth}
            onStartChange={setStartMonth}
            onEndChange={setEndMonth}
            isDark={isDark}
          />

          <ExportButtons
            totalSales={totalSales}
            totalOrders={totalOrders}
            totalProfit={totalProfit}
            salesData={filteredData}
            isDark={isDark}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <StatsCard
            title="Avg Order Value"
            value={totalOrders > 0 ? `€${Math.round(totalSales / totalOrders)}` : "€0"}
            subtitle="Per transaction"
            isDark={isDark}
          />
          <StatsCard
            title="Profit Margin"
            value={totalSales > 0 ? `${((totalProfit / totalSales) * 100).toFixed(1)}%` : "0%"}
            subtitle="Overall margin"
            isDark={isDark}
          />
          <StatsCard
            title="Industry"
            value={companyData?.industry || "N/A"}
            subtitle="Sector"
            isDark={isDark}
          />
          <StatsCard
            title="Best Month"
            value={
              filteredData.length > 0
                ? filteredData.reduce((max, item) => (item.sales > max.sales ? item : max)).month
                : "N/A"
            }
            subtitle="Highest sales"
            isDark={isDark}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <KPICard
            title="Total Sales"
            value={formatCurrency(totalSales)}
            change="+15.3%"
            icon="💰"
            tooltip="Total revenue from all sales"
            isDark={isDark}
          />
          <KPICard
            title="Total Orders"
            value={formatNumber(totalOrders)}
            change="+8.2%"
            icon="📦"
            tooltip="Number of completed orders"
            isDark={isDark}
          />
          <KPICard
            title="Total Profit"
            value={formatCurrency(totalProfit)}
            change="+12.5%"
            icon="💎"
            tooltip="Net profit after costs"
            isDark={isDark}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="xl:col-span-2">
            <SalesChart
              data={filteredData}
              isDark={isDark}
              companyName={companyData?.companyName}
            />
          </div>
          <ProductsChart products={companyData?.products} isDark={isDark} />
          <RegionChart regions={companyData?.regions} isDark={isDark} />
        </div>

        <div className="overflow-x-auto rounded-lg border shadow-sm mt-6">
          <DataTable data={filteredData} isDark={isDark} />
        </div>
      </main>

      <Footer isDark={isDark} githubUrl="https://github.com/G-Developerr" />
    </div>
  );
}

export default App;
