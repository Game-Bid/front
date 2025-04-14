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

        borderPrimary: "var(--primary-300)",
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
      spacing: {
        4: "0.25rem",
        8: "0.5rem",
        12: "0.75rem",
        14: "0.875rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        24: "1.5rem",
        28: "1.75rem",
        32: "2rem",
        36: "2.25rem",
        40: "2.5rem",
        48: "3rem",
        64: "4rem",
        80: "5rem",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        max: "100px",
      },
    },
  },
} satisfies Config;
