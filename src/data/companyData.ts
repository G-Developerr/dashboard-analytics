export interface CompanyStats {
  id: number;
  companyName: string;
  email: string;
  password: string;
  industry: string;
  description: string;
  monthlySales: Array<{
    month: string;
    sales: number;
    orders: number;
    profit: number;
    region: string;
  }>;
  products: Array<{ name: string; sales: number; percentage: number }>;
  regions: Array<{ name: string; value: number; color: string }>;
  additionalStats: {
    customerSatisfaction: number;
    employeeCount: number;
    foundedYear: number;
    website: string;
  };
}

export const companyAccounts: CompanyStats[] = [
  {
    id: 1,
    companyName: "TECHNOVA CORP",
    email: "admin@technova.com",
    password: "tech2024",
    industry: "Technology",
    description: "Leading provider of enterprise software solutions and cloud services",
    monthlySales: [
      { month: "Jan", sales: 125000, orders: 420, profit: 55000, region: "Global" },
      { month: "Feb", sales: 142000, orders: 480, profit: 62000, region: "Global" },
      { month: "Mar", sales: 138000, orders: 460, profit: 60000, region: "Global" },
      { month: "Apr", sales: 156000, orders: 520, profit: 68000, region: "Global" },
      { month: "May", sales: 162000, orders: 540, profit: 72000, region: "Global" },
      { month: "Jun", sales: 148000, orders: 500, profit: 65000, region: "Global" },
      { month: "Jul", sales: 172000, orders: 580, profit: 78000, region: "Global" },
      { month: "Aug", sales: 185000, orders: 620, profit: 85000, region: "Global" },
      { month: "Sep", sales: 192000, orders: 640, profit: 92000, region: "Global" },
      { month: "Oct", sales: 205000, orders: 680, profit: 98000, region: "Global" },
      { month: "Nov", sales: 218000, orders: 720, profit: 105000, region: "Global" },
      { month: "Dec", sales: 235000, orders: 780, profit: 115000, region: "Global" },
    ],
    products: [
      { name: "Enterprise Suite", sales: 850000, percentage: 35 },
      { name: "Cloud Storage", sales: 620000, percentage: 25 },
      { name: "Security Software", sales: 480000, percentage: 20 },
      { name: "AI Analytics", sales: 320000, percentage: 13 },
      { name: "Mobile Apps", sales: 180000, percentage: 7 },
    ],
    regions: [
      { name: "North America", value: 45, color: "#3B82F6" },
      { name: "Europe", value: 30, color: "#10B981" },
      { name: "Asia", value: 15, color: "#F59E0B" },
      { name: "Other", value: 10, color: "#8B5CF6" },
    ],
    additionalStats: {
      customerSatisfaction: 4.8,
      employeeCount: 1250,
      foundedYear: 2015,
      website: "https://technova.com"
    }
  },
  {
    id: 2,
    companyName: "GREENENERGY SOLUTIONS",
    email: "info@greenenergy.com",
    password: "green2024",
    industry: "Renewable Energy",
    description: "Solar and wind energy solutions for residential and commercial use",
    monthlySales: [
      { month: "Jan", sales: 88000, orders: 220, profit: 38000, region: "Europe" },
      { month: "Feb", sales: 92000, orders: 240, profit: 42000, region: "Europe" },
      { month: "Mar", sales: 105000, orders: 280, profit: 48000, region: "Europe" },
      { month: "Apr", sales: 118000, orders: 320, profit: 55000, region: "Europe" },
      { month: "May", sales: 132000, orders: 360, profit: 62000, region: "Europe" },
      { month: "Jun", sales: 155000, orders: 420, profit: 72000, region: "Europe" },
      { month: "Jul", sales: 168000, orders: 460, profit: 78000, region: "Europe" },
      { month: "Aug", sales: 142000, orders: 380, profit: 65000, region: "Europe" },
      { month: "Sep", sales: 125000, orders: 340, profit: 58000, region: "Europe" },
      { month: "Oct", sales: 112000, orders: 300, profit: 52000, region: "Europe" },
      { month: "Nov", sales: 98000, orders: 260, profit: 45000, region: "Europe" },
      { month: "Dec", sales: 85000, orders: 220, profit: 39000, region: "Europe" },
    ],
    products: [
      { name: "Solar Panels", sales: 680000, percentage: 40 },
      { name: "Wind Turbines", sales: 420000, percentage: 25 },
      { name: "Energy Storage", sales: 340000, percentage: 20 },
      { name: "Installation", sales: 170000, percentage: 10 },
      { name: "Maintenance", sales: 85000, percentage: 5 },
    ],
    regions: [
      { name: "Germany", value: 35, color: "#10B981" },
      { name: "France", value: 25, color: "#3B82F6" },
      { name: "UK", value: 20, color: "#F59E0B" },
      { name: "Other EU", value: 20, color: "#8B5CF6" },
    ],
    additionalStats: {
      customerSatisfaction: 4.9,
      employeeCount: 450,
      foundedYear: 2010,
      website: "https://greenenergy.com"
    }
  },
  {
    id: 3,
    companyName: "HEALTHPHARMA LTD",
    email: "admin@healthpharma.com",
    password: "health2024",
    industry: "Pharmaceutical",
    description: "Research and development of innovative healthcare solutions",
    monthlySales: [
      { month: "Jan", sales: 95000, orders: 180, profit: 42000, region: "Global" },
      { month: "Feb", sales: 105000, orders: 200, profit: 48000, region: "Global" },
      { month: "Mar", sales: 112000, orders: 220, profit: 52000, region: "Global" },
      { month: "Apr", sales: 108000, orders: 210, profit: 50000, region: "Global" },
      { month: "May", sales: 115000, orders: 230, profit: 54000, region: "Global" },
      { month: "Jun", sales: 125000, orders: 250, profit: 58000, region: "Global" },
      { month: "Jul", sales: 132000, orders: 260, profit: 62000, region: "Global" },
      { month: "Aug", sales: 128000, orders: 255, profit: 60000, region: "Global" },
      { month: "Sep", sales: 135000, orders: 270, profit: 64000, region: "Global" },
      { month: "Oct", sales: 142000, orders: 280, profit: 68000, region: "Global" },
      { month: "Nov", sales: 155000, orders: 300, profit: 75000, region: "Global" },
      { month: "Dec", sales: 168000, orders: 320, profit: 82000, region: "Global" },
    ],
    products: [
      { name: "Prescription Drugs", sales: 720000, percentage: 45 },
      { name: "Vaccines", sales: 400000, percentage: 25 },
      { name: "Medical Devices", sales: 320000, percentage: 20 },
      { name: "OTC Products", sales: 160000, percentage: 10 },
    ],
    regions: [
      { name: "North America", value: 50, color: "#3B82F6" },
      { name: "Europe", value: 30, color: "#10B981" },
      { name: "Asia", value: 15, color: "#F59E0B" },
      { name: "Other", value: 5, color: "#8B5CF6" },
    ],
    additionalStats: {
      customerSatisfaction: 4.7,
      employeeCount: 3200,
      foundedYear: 1998,
      website: "https://healthpharma.com"
    }
  },
  {
    id: 4,
    companyName: "URBANSTYLE FASHION",
    email: "sales@urbanstyle.com",
    password: "fashion2024",
    industry: "Fashion & Retail",
    description: "Trendy urban clothing and accessories for modern lifestyle",
    monthlySales: [
      { month: "Jan", sales: 72000, orders: 1500, profit: 28000, region: "Global" },
      { month: "Feb", sales: 68000, orders: 1400, profit: 25000, region: "Global" },
      { month: "Mar", sales: 82000, orders: 1700, profit: 32000, region: "Global" },
      { month: "Apr", sales: 78000, orders: 1600, profit: 30000, region: "Global" },
      { month: "May", sales: 92000, orders: 1900, profit: 38000, region: "Global" },
      { month: "Jun", sales: 105000, orders: 2200, profit: 45000, region: "Global" },
      { month: "Jul", sales: 98000, orders: 2100, profit: 42000, region: "Global" },
      { month: "Aug", sales: 88000, orders: 1800, profit: 35000, region: "Global" },
      { month: "Sep", sales: 112000, orders: 2400, profit: 48000, region: "Global" },
      { month: "Oct", sales: 125000, orders: 2600, profit: 52000, region: "Global" },
      { month: "Nov", sales: 142000, orders: 3000, profit: 62000, region: "Global" },
      { month: "Dec", sales: 185000, orders: 3800, profit: 82000, region: "Global" },
    ],
    products: [
      { name: "Casual Wear", sales: 550000, percentage: 40 },
      { name: "Footwear", sales: 330000, percentage: 24 },
      { name: "Accessories", sales: 275000, percentage: 20 },
      { name: "Premium Line", sales: 165000, percentage: 12 },
      { name: "Kids Collection", sales: 55000, percentage: 4 },
    ],
    regions: [
      { name: "USA", value: 40, color: "#3B82F6" },
      { name: "EU", value: 35, color: "#10B981" },
      { name: "Japan/Korea", value: 15, color: "#F59E0B" },
      { name: "Other", value: 10, color: "#8B5CF6" },
    ],
    additionalStats: {
      customerSatisfaction: 4.6,
      employeeCount: 280,
      foundedYear: 2018,
      website: "https://urbanstyle.com"
    }
  }
];