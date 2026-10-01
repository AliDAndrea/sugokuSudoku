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
        piedra: ["--font-piedra"],
        victorMono: ["--font-victor-mono"],
        intelOneMono: ["--font-intel-one-mono"],
        oxygenMono: ["--font-oxygen-mono"],
        libertinusMono: ["--font-libertinus-mono"],
        kodeMono: ["--font-kode-mono"],
        redHatMono: ["--font-red-hat-mono"],
        spaceMono: ["--font-space-mono"],
        syneMono: ["--font-syne-mono"],
        xanhMono: ["--font-xanh-mono"],
        cutiveMono: ["--font-cutive-mono"],
        lXGWWenKaiMonoTC: ["--font-lxgw-wenkai-mono-tc"],
        chivoMono: ["--font-chivo-mono"],
        inter: ["--font-inter"],
      },
    },
  },
  plugins: [],
} satisfies Config;