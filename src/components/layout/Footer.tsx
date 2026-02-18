interface FooterProps {
  isDark?: boolean;
  githubUrl?: string;
}

const Footer: React.FC<FooterProps> = ({
  isDark = false,
  githubUrl = "https://github.com/G-Developerr",
}) => {
  return (
    <footer
      className={`mt-12 py-6 border-t transition-colors ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            © 2026 Analytics Dashboard. Built with React, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm hover:underline ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
              My GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
