export interface SalesData {
  month: string;
  sales: number;
  orders: number;
  profit: number;
}

export interface ProductData {
  name: string;
  sales: number;
  units: number;
  category: string;
}

export interface RegionData {
  region: string;
  sales: number;
  percentage: number;
}

export const monthlySales: SalesData[] = [
  { month: "Jan", sales: 45000, orders: 120, profit: 12000 },
  { month: "Feb", sales: 52000, orders: 145, profit: 15000 },
  { month: "Mar", sales: 48000, orders: 135, profit: 13500 },
  { month: "Apr", sales: 55000, orders: 160, profit: 16000 },
  { month: "May", sales: 62000, orders: 175, profit: 18500 },
  { month: "Jun", sales: 58000, orders: 165, profit: 17000 },
  { month: "Jul", sales: 70000, orders: 195, profit: 21000 },
  { month: "Aug", sales: 68000, orders: 185, profit: 19500 },
  { month: "Sep", sales: 65000, orders: 180, profit: 18000 },
  { month: "Oct", sales: 72000, orders: 200, profit: 22000 },
  { month: "Nov", sales: 78000, orders: 210, profit: 24000 },
  { month: "Dec", sales: 85000, orders: 230, profit: 26500 },
];

export const topProducts: ProductData[] = [
  { name: "Laptop Pro 15", sales: 125000, units: 250, category: "Electronics" },
  { name: "Wireless Mouse", sales: 18500, units: 850, category: "Accessories" },
  { name: "Mechanical Keyboard", sales: 42000, units: 320, category: "Accessories" },
  { name: "4K Monitor", sales: 95000, units: 180, category: "Electronics" },
  { name: "USB-C Hub", sales: 15000, units: 600, category: "Accessories" },
  { name: "Laptop Stand", sales: 12000, units: 450, category: "Accessories" },
  { name: "Webcam HD", sales: 28000, units: 280, category: "Electronics" },
  { name: "Headphones Pro", sales: 55000, units: 420, category: "Electronics" },
];

export const regionSales: RegionData[] = [
  { region: "Athens", sales: 180000, percentage: 35 },
  { region: "Thessaloniki", sales: 120000, percentage: 23 },
  { region: "Patras", sales: 85000, percentage: 17 },
  { region: "Heraklion", sales: 65000, percentage: 13 },
  { region: "Other", sales: 62000, percentage: 12 },
];

export const totalSales = monthlySales.reduce((sum, item) => sum + item.sales, 0);
export const totalOrders = monthlySales.reduce((sum, item) => sum + item.orders, 0);
export const totalProfit = monthlySales.reduce((sum, item) => sum + item.profit, 0);
