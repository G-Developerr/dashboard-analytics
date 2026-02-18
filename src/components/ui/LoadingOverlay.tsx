interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-gray-700 font-medium">Loading Dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
