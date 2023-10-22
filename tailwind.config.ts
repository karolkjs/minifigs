import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sky-blue": "#3F8BE5",
        "pastel-red": "#E35050",
        orange: "#F0964B",
      },
      dropShadow: {
        lg: "0 10px 10px rgba(0, 0, 0, 0.55)",
      },
    },
  },
  plugins: [],
} satisfies Config;
