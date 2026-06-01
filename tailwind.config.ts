import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Baby pink luxury palette
        blush: {
          50: "#FFF8FA",
          100: "#FDEEF1",
          200: "#FADCE2",
          300: "#F6C7D1",
          400: "#F2B0BF",
          500: "#EC97AB",
        },
        rose: {
          gold: "#B76E79",
          deep: "#9C5662",
          soft: "#D8A7B1",
        },
        champagne: {
          DEFAULT: "#C9A86A",
          light: "#E6D3A8",
          dark: "#A88944",
        },
        ink: {
          DEFAULT: "#2B2024",
          soft: "#6B5B61",
          faint: "#9C8B91",
        },
        cream: "#FFFCFA",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.25em",
        wide2: "0.18em",
      },
      maxWidth: {
        content: "1280px",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
