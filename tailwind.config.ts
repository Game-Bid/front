import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeOut: "fadeOut 0.5s ease-in-out 2.5s forwards",
        spin: "spin 0.5s cubic-bezier(0.42, 0, 0.58, 1)",
      },
      colors: {
        fgPrimaryDefault: "var(--gray-0)",
        fgPrimaryHovered: "var(--gray-0)",
        fgPrimaryFocused: "var(--gray-200)",
        fgPrimaryPressed: "var(--gray-200)",
        fgPrimaryDisabled: "var(--gray-200)",
        fgPrimaryAccent: "var(--primary-100)",

        fgGrayDefault: "var(--gray-50)",
        fgGrayHovered: "var(--gray-0)",
        fgGrayFocused: "var(--gray-0)",
        fgGrayEntered: "var(--gray-0)",
        fgGrayPressed: "var(--gray-300)",
        fgGrayDisabled: "var(--gray-300)",
        fgGrayPlaceholder: "var(--gray-300)",

        bgGrayDepth1: "var(--gray-800)",
        bgGrayDepth2: "var(--gray-700)",
        bgGrayDepth3: "var(--gray-600)",

        borderDefault: "var(--gray-300)",
        borderFocused: "var(--gray-200)",
        borderDivider: "var(--gray-600)",

        fillPrimaryDefault: "var(--primary-300)",
        fillPrimaryHovered: "var(--primary-400)",
        fillPrimaryFocused: "var(--primary-400)",
        fillPrimaryPressed: "var(--primary-500)",
        fillPrimaryDisabled: "var(--primary-500)",

        fillGrayDefault: "var(--gray-500)",
        fillGrayHovered: "var(--gray-400)",
        fillGrayFocused: "var(--gray-400)",
        fillGrayPressed: "var(--gray-600)",
        fillGrayDisabled: "var(--gray-600)",
      },
    },
  },
} satisfies Config;
