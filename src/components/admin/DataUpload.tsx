import { useState } from "react";

interface UploadData {
  sales: number;
  orders: number;
  profit: number;
  timestamp: string;
}

interface DataUploadProps {
  isDark: boolean;
  onDataUpload: (data: UploadData) => void;
}

const DataUpload: React.FC<DataUploadProps> = ({ isDark, onDataUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        const mockData: UploadData = {
          sales: Math.floor(Math.random() * 10000) + 5000,
          orders: Math.floor(Math.random() * 1000) + 100,
          profit: Math.floor(Math.random() * 5000) + 2000,
          timestamp: new Date().toISOString(),
        };

        onDataUpload(mockData);
        setUploadStatus("success");
      } catch {
        setUploadStatus("error");
      } finally {
        setUploading(false);
      }
    }, 1500);
  };

  const handleManualEntry = () => {
    const salesInput = prompt("Enter total sales:");
    const ordersInput = prompt("Enter number of orders:");
    const profitInput = prompt("Enter total profit:");

    if (salesInput && ordersInput && profitInput) {
      const uploadData: UploadData = {
        sales: parseInt(salesInput) || 0,
        orders: parseInt(ordersInput) || 0,
        profit: parseInt(profitInput) || 0,
        timestamp: new Date().toISOString(),
      };

      onDataUpload(uploadData);
      setUploadStatus("success");
    }
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border`}>
      <h3
        className={`text-xl font-bold mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
        <span className="text-2xl">📤</span>
        Upload Company Data
      </h3>

      <div className="space-y-4">
        {/* File Upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDark
              ? "border-gray-600 hover:border-blue-500 bg-gray-700/50"
              : "border-gray-300 hover:border-blue-400 bg-gray-50"
          }`}>
          <div className={`text-4xl mx-auto mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            📄
          </div>

          <p className={`mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Drag & drop your CSV/Excel file here
          </p>
          <p className={`text-sm mb-4 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Supports .csv, .xlsx, .xls (Max 10MB)
          </p>

          <input
            type="file"
            id="file-upload"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className={`inline-block px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}>
            Choose File
          </label>

          {file && (
            <p className={`mt-3 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        {/* Status Indicator */}
        {uploadStatus !== "idle" && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${
              uploadStatus === "success"
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}>
            {uploadStatus === "success" ? (
              <span className="text-lg">✅</span>
            ) : (
              <span className="text-lg">❌</span>
            )}
            <span>
              {uploadStatus === "success"
                ? "Data uploaded successfully!"
                : "Error uploading data. Please try again."}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              !file || uploading
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
            }`}>
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </span>
            ) : (
              "Upload & Process"
            )}
          </button>

          <button
            onClick={handleManualEntry}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}>
            Manual Entry
          </button>
        </div>

        <div
          className={`text-xs mt-4 p-3 rounded-lg ${
            isDark ? "bg-gray-700/50 text-gray-400" : "bg-gray-100 text-gray-600"
          }`}>
          <p className="font-medium mb-1">Supported formats:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>CSV with columns: Month, Sales, Orders, Profit, Region</li>
            <li>Excel files with similar structure</li>
            <li>JSON API export from your systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;
