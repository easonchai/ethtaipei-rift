import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Trebuchet MS", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        cover: 'url("/assets/background.png")',
      },
      colors: {
        rift: {
          yellow: {
            1: "#FFF7CC",
            2: "#FED0A2",
            3: "#FFAB9D",
          },
          purple: {
            1: "#FFE4F4",
            2: "#F5ACFE",
            3: "#C69FFF",
          },
          grey: {
            500: "#DFDFDF",
            700: "#848484",
            900: "#141400",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
