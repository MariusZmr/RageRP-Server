/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/web/index.html",
    "./src/web/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Reddit Sans"', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000", // Absolute black for OLED feel
        foreground: "#ffffff",
        
        // Design System Colors
        surface: {
          100: "#09090b", // Zinc 950 - Main Card Bg
          200: "#18181b", // Zinc 900 - Input Bg
          300: "#27272a", // Zinc 800 - Secondary Elements
          400: "#3f3f46", // Zinc 700 - Hover states
        },
        primary: {
          DEFAULT: "#ef4444", // Red-500 (Apple Red / Error Red but used as Primary Brand)
          hover: "#dc2626",   // Red-600
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#86868b", // Apple Grey Text
          foreground: "#ffffff",
        },
        
        // Shadcn Defaults (mapped or kept for compatibility)
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#27272a",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#27272a",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#09090b",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#09090b",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}