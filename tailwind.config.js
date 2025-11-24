/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4C9AFF",
        background: "#F9FAFB",
        success: "#34D399",
        attention: "#F59E0B",
        error: "#EF4444",
        text: "#1F2937",
        violet: "#8B5CF6",
        borders: "#E5E7EB",
        disabled: "#6b6b6b",

        /* 🌙 Dark Mode Colors */
        dark: {
          primary: "#1E3A8A", // deep blue
          background: "#0A0F1C", // almost-black blue
          surface: "#111827", // slate-900
          text: "#fff", // gray-200
          borders: "#1F2937", // dark borders
        },
      },
    },
  },
  plugins: [],
};
