/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/components/auth/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            animation: {
                blob: "blob 8s infinite",
                scan: "scan 4s linear infinite",
                float: "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow-cyan 2s infinite",
            },
            keyframes: {
                blob: {
                    "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(40px, -60px) scale(1.15)" },
                    "66%": { transform: "translate(-30px, 30px) scale(0.9)" },
                },
                scan: {
                    "0%": { top: "-10%" },
                    "100%": { top: "110%" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-25px)" },
                },
                "pulse-glow-cyan": {
                    "0%, 100%": {
                        boxShadow: "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)",
                    },
                    "50%": {
                        boxShadow: "0 0 50px rgba(6, 182, 212, 0.9), 0 0 100px rgba(6, 182, 212, 0.5)",
                    },
                },
            },
        },
    },
    plugins: [],
};