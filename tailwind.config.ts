import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#08090a",        // near-pure black ground
        panel: "#0e1011",       // raised surface
        "panel-2": "#14171a",   // higher surface
        line: "#1e2225",        // border
        "line-bright": "#2c3338", // brighter border
        dim: "#5e655f",         // dim text (raised for legibility)
        muted: "#8a918b",       // muted text (raised for legibility)
        fg: "#e8eae8",          // primary off-white
        tac: "#6ee85f",         // tactical green accent
        "tac-dim": "#3a7a31",   // dimmed green
        alert: "#e0673c",       // rare warning
      },
      fontFamily: {
        head: ["var(--font-chakra)", "ui-monospace", "monospace"],
        mono: ["var(--font-jbmono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: { tightest: "-0.03em", wide2: "0.2em", wide3: "0.3em" },
    },
  },
  plugins: [],
};
export default config;
