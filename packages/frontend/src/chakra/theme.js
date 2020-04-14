import { theme } from "@chakra-ui/core";

// define your custom breakpoints
const breakpoints = ["0", "960px", "1300px"];

// add an alias for object responsive prop
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];

// Let's say you want to add custom colors
export const customTheme = {
  ...theme,
  breakpoints,
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    ...theme.colors,
    gray: {
      50: "#f9f9fb",
      100: "#ededf0",
      200: "#e0e0e3",
      300: "#d3d3d5",
      400: "#c4c4c6",
      500: "#b3b3b5",
      600: "#a0a0a2",
      700: "#89898b",
      800: "#202021",
      900: "#111112",
    },
    blue: {
      50: "#E1F1FF",
      100: "#EFFBFF",
      200: "#CCF6FF",
      300: "#CCF6FF",
      400: "#CCF6FF",
      500: "#6892d5",
      600: "#4573B4",
      700: "#1D5693",
      800: "#003B74",
      900: "#002256",
    },
    green: {
      50: "#E6FFFA",
      100: "#E6FFFA",
      200: "#c9fdd7",
      300: "#c9fdd7",
      400: "#c9fdd7",
      500: "#79d1c3",
      600: "#4DA699",
      700: "#1C7D71",
      800: "#00554B",
      900: "#003128",
    },
  },
  icons: {
    ...theme.icons,
    euro: {
      path: (
        <path
          fill="currentColor"
          d="M1360 1307l35 159q3 12-3 23t-17 14l-5 1-10 4-16 4-22 6q-12 4-25 5t-30 5-34 4-36 3-39 1q-234 0-409-130t-238-352h-95q-13 0-22-9t-10-23V909q0-13 10-22t22-10h66q-2-57 1-105h-67q-14 0-23-9t-9-23V626q0-14 9-23t23-9h98q67-210 244-338t400-128q102 0 194 23 11 3 20 15 6 11 3 24l-43 159q-3 13-14 20t-24 2l-4-1-11-2-18-4-22-3-26-3-29-3-30-1q-126 0-226 64T778 594h468q16 0 25 12 10 12 7 26l-24 114q-5 26-32 26H734q-3 37 0 105h459q15 0 25 12 9 12 6 27l-24 112q-2 11-11 19t-20 7H782q48 117 150 186t228 68l36-1q18-1 34-4t29-4 25-5 18-5l12-3 5-2q13-5 26 2 12 7 15 21z"
        />
      ),
      viewBox: "0 0 1792 1792",
    },
    shipping: {
      path: (
        <path
          fill="currentColor"
          d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
        ></path>
      ),
    },
  },
};

console.log({ theme });
