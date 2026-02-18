import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

// Generate particles outside component - runs only once when module loads
const generateParticles = () => {
  const particles = [];
  for (let i = 0; i < 15; i++) {
    particles.push({
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      top: Math.random() * 100,
      left: Math.random() * 100,
    });
  }
  return particles;
};

const PARTICLES = generateParticles();

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Aggressive Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Matrix-like grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}></div>
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 animate-scan"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute bg-cyan-400 rounded-full opacity-10"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `float ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full relative z-10">
        {/* Professional Dark Card */}
        <div className="backdrop-blur-2xl bg-black/40 rounded-2xl shadow-2xl p-10 border border-cyan-500/30 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer-dark pointer-events-none"></div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

          <div className="text-center mb-10 relative">
            {/* Professional Icon Container */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-cyan-500 rounded-lg blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-lg bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 shadow-2xl">
                <Shield className="w-10 h-10 text-cyan-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
            </div>

            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
              ANALYTICS <span className="text-cyan-400">PORTAL</span>
            </h2>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              Authorized Access Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-900/30 border border-red-500/50 text-red-400 text-sm font-medium backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <label className="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wide">
                Company Email
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition duration-300 ${
                    emailFocused ? "opacity-40" : ""
                  }`}></div>
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                      emailFocused ? "text-cyan-400 scale-110" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="input-glow-pro w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-800 bg-black/50 backdrop-blur-sm text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-all duration-300 font-medium"
                    placeholder="admin@company.com"
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wide">
                Password
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition duration-300 ${
                    passwordFocused ? "opacity-40" : ""
                  }`}></div>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                      passwordFocused ? "text-emerald-400 scale-110" : "text-gray-500"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="input-glow-pro w-full pl-12 pr-14 py-4 rounded-lg border-2 border-gray-800 bg-black/50 backdrop-blur-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-all duration-300 font-medium"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full py-4 px-6 rounded-lg font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-emerald-600 to-teal-600 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-300">
                <div className="absolute inset-0 bg-white"></div>
              </div>
              <span className="relative flex items-center justify-center gap-3 text-lg tracking-wide uppercase">
                <Shield className="w-5 h-5" />
                Secure Login
              </span>
            </button>

            {/* Footer */}
            <div className="text-center pt-6 border-t border-gray-800/50">
              <p className="text-sm text-gray-500 font-medium">
                Lost Access?{" "}
                <button
                  type="button"
                  className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors duration-300">
                  Contact Admin
                </button>
              </p>
            </div>
          </form>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30"></div>
        </div>

        {/* Bottom glow */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-10 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-2xl"></div>
      </div>
    </div>
  );
};

export default LoginForm;
