/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

const tailwindConfig = {
  content: [
    "../web/src/**/*.{js,jsx,ts,tsx}",
    "../chrome-extension/src/**/*.{js,jsx,ts,tsx}",
    "../shared/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-bg": "var(--theme-bg)",
        "theme-text": "var(--theme-text)",
        "theme-text-error": "var(--theme-text-error)",
        "theme-accent": "var(--theme-accent)",
        "theme-accent-hover": "var(--theme-accent-hover)",
        "theme-button-bg": "var(--theme-button-bg)",
        "theme-button-text": "var(--theme-button-text)",
        "theme-card-bg": "var(--theme-card-bg)",
        "theme-border": "var(--theme-border)",
        "theme-input-bg": "var(--theme-input-bg)",
        "theme-input-text": "var(--theme-input-text)",
        "theme-error": "var(--theme-error)",
        "theme-success": "var(--theme-success)",
      },
      borderRadius: {
        "theme-card": "var(--theme-card-radius)",
        "theme-button": "var(--theme-button-radius)",
        "theme-input": "var(--theme-input-radius)",
      },
      boxShadow: {
        "theme-card": "var(--theme-card-shadow)",
        "theme-button": "var(--theme-button-shadow)",
        "theme-input": "var(--theme-input-shadow)",
      },
      spacing: {
        "theme-padding": "var(--theme-padding)",
        "theme-margin": "var(--theme-margin)",
      },
      fontSize: {
        "theme-base": "var(--theme-font-size-base)",
        "theme-lg": "var(--theme-font-size-lg)",
        "theme-xl": "var(--theme-font-size-xl)",
        "theme-2xl": "var(--theme-font-size-2xl)",
      },
      fontFamily: {
        theme: ["var(--theme-font-family)", ...fontFamily.sans],
      },
      transitionProperty: {
        "theme-colors": "background-color, border-color, color, fill, stroke",
        "theme-opacity": "opacity",
        "theme-shadow": "box-shadow",
        "theme-transform": "transform",
      },
      animation: {
        "theme-spin": "spin 1s linear infinite",
        "theme-ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        "theme-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "theme-bounce": "bounce 1s infinite",
      },
    },
  },

  darkMode: "class", // or 'media' or 'class
  plugins: [],
};

export default tailwindConfig;
