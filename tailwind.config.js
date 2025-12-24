/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./web/views/**/*.ejs",
    "./web/public/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors (Suraksha Cloud)
        suraksha: {
          red: "#8B1E2D",     // Nepali flag inspired
          blue: "#1E3A5F",    // Himalayan trust blue
          green: "#1F7A63",   // Secure success
          gray: "#6B7280",    // Professional text
          light: "#F7F9FC",   // Cloud white
        },
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        surakshaLight: {
          "primary": "#8B1E2D",     // Suraksha Red
          "secondary": "#1E3A5F",   // Himalayan Blue
          "accent": "#1F7A63",      // Safe Green
          "neutral": "#1F2937",     // Dark gray
          "base-100": "#F7F9FC",    // Background
          "base-200": "#EEF2F7",
          "base-300": "#E5E7EB",
          "info": "#0EA5E9",
          "success": "#1F7A63",
          "warning": "#F59E0B",
          "error": "#DC2626",
        },
      },
      {
        surakshaDark: {
          "primary": "#E14B5A",
          "secondary": "#3B82F6",
          "accent": "#34D399",
          "neutral": "#111827",
          "base-100": "#0F172A",
          "base-200": "#020617",
          "base-300": "#020617",
          "info": "#38BDF8",
          "success": "#22C55E",
          "warning": "#FBBF24",
          "error": "#F87171",
        },
      },
      "corporate", // fallback
    ],
  },
};
