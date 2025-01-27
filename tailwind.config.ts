import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        vilvBlue: "#32329f",
        vilvLightBlue: "rgba(50, 50, 159, 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
