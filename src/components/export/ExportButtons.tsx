import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface ExportButtonsProps {
  totalSales: number;
  totalOrders: number;
  totalProfit: number;
  salesData: any[];
  isDark?: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
  totalSales,
  totalOrders,
  totalProfit,
  salesData,
  isDark = false,
}) => {
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Analytics Dashboard Report", 20, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);

    doc.setFontSize(14);
    doc.text("Summary", 20, 45);
    doc.setFontSize(11);
    doc.text(`Total Sales: €${(totalSales / 1000).toFixed(1)}K`, 20, 55);
    doc.text(`Total Orders: ${totalOrders.toLocaleString()}`, 20, 62);
    doc.text(`Total Profit: €${(totalProfit / 1000).toFixed(1)}K`, 20, 69);

    doc.setFontSize(14);
    doc.text("Monthly Breakdown", 20, 85);
    doc.setFontSize(10);

    let yPos = 95;
    salesData.forEach((item) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(
        `${item.month}: Sales €${item.sales.toLocaleString()}, Orders ${item.orders}, Profit €${item.profit.toLocaleString()}`,
        20,
        yPos
      );
      yPos += 7;
    });

    doc.save("analytics-report.pdf");
  };

  const exportToExcel = () => {
    const summaryData = [
      ["Analytics Dashboard Report"],
      ["Generated:", new Date().toLocaleDateString()],
      [],
      ["Total Sales", `€${totalSales.toLocaleString()}`],
      ["Total Orders", totalOrders],
      ["Total Profit", `€${totalProfit.toLocaleString()}`],
    ];

    const monthlyData = [
      ["Month", "Sales (€)", "Orders", "Profit (€)"],
      ...salesData.map((item) => [item.month, item.sales, item.orders, item.profit]),
    ];

    const wb = XLSX.utils.book_new();

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    const wsMonthly = XLSX.utils.aoa_to_sheet(monthlyData);

    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
    XLSX.utils.book_append_sheet(wb, wsMonthly, "Monthly Data");

    XLSX.writeFile(wb, "analytics-report.xlsx");
  };

  return (
    <div className={`rounded-lg shadow p-4 mb-6 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        📥 Export Reports
      </h3>
      <div className="flex gap-4">
        <button
          onClick={exportToPDF}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <span>📄</span>
          Download PDF
        </button>
        <button
          onClick={exportToExcel}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <span>📊</span>
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default ExportButtons;
