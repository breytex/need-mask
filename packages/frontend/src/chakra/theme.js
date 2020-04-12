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
};
