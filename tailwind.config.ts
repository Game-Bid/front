import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        laptop: { max: "1280px" },
        tablet: { max: "768px" },
        mobile: { max: "480px" },
      },
      keyframes: {
        expandWidth: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      boxShadow: {
        "button-primary-shadow": "0px 2px 100px 0px rgba(88, 101, 242, 0.4)",
      },
      animation: {
        fadeOut: "fadeOut 0.5s ease-in-out 2.5s forwards",
        spin: "spin 0.5s cubic-bezier(0.42, 0, 0.58, 1)",
        expandWidth: "expandWidth 1s ease-in-out forwards",
      },
      colors: {
        fgPrimaryDefault: "var(--gray-00)",
        fgPrimaryHovered: "var(--gray-0)",
        fgPrimaryFocused: "var(--gray-0)",
        fgPrimaryPressed: "var(--gray-0)",
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

        borderPrimary: "var(--primary-100)",
        borderDefault: "var(--gray-300)",
        borderFocused: "var(--gray-200)",
        borderDivider: "var(--gray-500)",

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

        systemFailed: "var(--system-failed)",
      },
      spacing: {
        "0.25": "4px",
        "0.5": "8px",
        "0.75": "12px",
        "0.875": "14px",
        "1": "16px",
        "1.125": "18px",
        "1.25": "20px",
        "1.5": "24px",
        "1.75": "28px",
        "2": "32px",
        "2.25": "36px",
        "2.5": "40px",
        "3": "48px",
        "4": "64px",
        "5": "80px",
        "6": "96px",
        // 레이아웃 스페이싱
        "l-0.25": "4px",
        "l-0.5": "8px",
        "l-0.75": "12px",
        "l-0.875": "14px",
        "l-1": "16px",
        "l-1.125": "18px",
        "l-1.25": "20px",
        "l-1.5": "24px",
        "l-1.75": "28px",
        "l-2": "32px",
        "l-2.25": "36px",
        "l-2.5": "40px",
        "l-3": "48px",
        "l-4": "64px",
        "l-5": "80px",
        "l-6": "96px",
        "l-6.25": "100px",
        "l-7.5": "120px",
        "l-10": "160px",
        "l-15": "240px",
        "l-20": "320px",
      },
      fontSize: {
        "0.75": "12px",
        "0.875": "14px",
        "1": "16px",
        "1.125": "18px",
        "1.25": "20px",
        "1.5": "24px",
        "1.75": "28px",
        "2": "32px",
        "2.25": "36px",
        "2.5": "40px",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        max: "100px",
      },
    },
  },
  plugins: [
    function ({ addComponents }: PluginAPI) {
      const mediaQuery = "@media (max-width: 768px)";
      const responsiveUtilities: Record<
        string,
        Record<string, Record<string, string>>
      > = { [mediaQuery]: {} };

      const componentMobileSpacing = {
        "0.25": "4px",
        "0.5": "6px",
        "0.75": "8px",
        "0.875": "12px",
        "1": "14px",
        "1.125": "16px",
        "1.25": "18px",
        "1.5": "20px",
        "1.75": "24px",
        "2": "28px",
        "2.25": "32px",
        "2.5": "36px",
        "3": "40px",
        "4": "48px",
        "5": "64px",
        "6": "80px",
      };

      const layoutMobileSpacing = {
        "0.25": "2px",
        "0.5": "4px",
        "0.75": "6px",
        "0.875": "7px",
        "1": "8px",
        "1.125": "9px",
        "1.25": "10px",
        "1.5": "12px",
        "1.75": "14px",
        "2": "16px",
        "2.25": "18px",
        "2.5": "20px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
        "6.25": "50px",
        "7.5": "60px",
        "10": "80px",
        "15": "120px",
        "20": "160px",
      };

      const fontSizeMobile = {
        "0.75": "10px",
        "0.875": "12px",
        "1": "14px",
        "1.125": "16px",
        "1.25": "18px",
        "1.5": "20px",
        "1.75": "24px",
        "2": "28px",
        "2.25": "32px",
        "2.5": "36px",
      };

      // Radius 모바일 값
      const radiusMobile = {
        sm: "6px",
        md: "10px",
        lg: "14px",
        max: "100px",
      };

      const escapeKey = (key: string) => key.replace(/\./g, "\\.");

      Object.entries(componentMobileSpacing).forEach(([key, value]) => {
        generateSpacingClasses(
          responsiveUtilities[mediaQuery],
          escapeKey(key),
          value
        );
      });

      Object.entries(layoutMobileSpacing).forEach(([key, value]) => {
        generateSpacingClasses(
          responsiveUtilities[mediaQuery],
          `l-${escapeKey(key)}`,
          value
        );
      });

      Object.entries(fontSizeMobile).forEach(([key, value]) => {
        responsiveUtilities[mediaQuery][`.text-${escapeKey(key)}`] = {
          "font-size": `${value} !important`,
        };
      });

      // Border Radius 유틸리티
      Object.entries(radiusMobile).forEach(([key, value]) => {
        responsiveUtilities[mediaQuery][`.rounded-${key}`] = {
          "border-radius": `${value} !important`,
        };
      });

      addComponents(responsiveUtilities);

      function generateSpacingClasses(
        utilities: Record<string, Record<string, string>>,
        key: string,
        value: string
      ) {
        // 패딩 클래스
        utilities[`.p-${key}`] = { padding: `${value} !important` };
        utilities[`.px-${key}`] = {
          "padding-left": `${value} !important`,
          "padding-right": `${value} !important`,
        };
        utilities[`.py-${key}`] = {
          "padding-top": `${value} !important`,
          "padding-bottom": `${value} !important`,
        };
        utilities[`.pt-${key}`] = { "padding-top": `${value} !important` };
        utilities[`.pr-${key}`] = { "padding-right": `${value} !important` };
        utilities[`.pb-${key}`] = { "padding-bottom": `${value} !important` };
        utilities[`.pl-${key}`] = { "padding-left": `${value} !important` };

        // 마진 클래스
        utilities[`.m-${key}`] = { margin: `${value} !important` };
        utilities[`.mx-${key}`] = {
          "margin-left": `${value} !important`,
          "margin-right": `${value} !important`,
        };
        utilities[`.my-${key}`] = {
          "margin-top": `${value} !important`,
          "margin-bottom": `${value} !important`,
        };
        utilities[`.mt-${key}`] = { "margin-top": `${value} !important` };
        utilities[`.mr-${key}`] = { "margin-right": `${value} !important` };
        utilities[`.mb-${key}`] = { "margin-bottom": `${value} !important` };
        utilities[`.ml-${key}`] = { "margin-left": `${value} !important` };

        // 갭 클래스
        utilities[`.gap-${key}`] = { gap: `${value} !important` };
      }
    },
  ],
} satisfies Config;
