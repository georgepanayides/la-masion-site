import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-brand-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-brand-serif)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        cream: {
          DEFAULT: "#FAF8F5",
          50: "#FAF8F5",
        },
        stone: {
          DEFAULT: "#5C574E",
          600: "#5C574E",
          800: "#2C2823",
        },
        driftwood: {
          DEFAULT: "#A39666",
        },
      },
    },
  },
} satisfies Config;
