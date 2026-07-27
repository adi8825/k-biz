import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14081a",
        accent: {
          cyan: "#8bdef8",
          pink: "#ff4680",
          purple: "#c97dff",
          green: "#7de66a",
        },
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
