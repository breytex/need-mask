import { theme } from "@chakra-ui/core";

// define your custom breakpoints
const breakpoints = ["0px", "960px", "1300px"];

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
  },
};
