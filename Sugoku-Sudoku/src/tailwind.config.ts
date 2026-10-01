import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        piedra: ["var(--font-piedra)"],
        victorMono: ["var(--font-victor-mono)"],
        intelOneMono: ["var(--font-intel-one-mono)"],
        oxygenMono: ["var(--font-oxygen-mono)"],
        libertinusMono: ["var(--font-libertinus-mono)"],
        kodeMono: ["var(--font-kode-mono)"],
        redHatMono: ["var(--font-red-hat-mono)"],
        spaceMono: ["var(--font-space-mono)"],
        syneMono: ["var(--font-syne-mono)"],
        xanhMono: ["var(--font-xanh-mono)"],
        cutiveMono: ["var(--font-cutive-mono)"],
        chivoMono: ["var(--font-chivo-mono)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
} satisfies Config;