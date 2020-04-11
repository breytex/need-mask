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
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    blue: {
      50: "#EFFBFF",
      100: "#EFFBFF",
      200: "#CCF6FF",
      300: "#CCF6FF",
      400: "#CCF6FF",
      500: "#5fb4e4",
      600: "#308FBD",
      700: "#006B97",
      800: "#004A73",
      900: "#002B50",
    },
  },
};
