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
    heading:
      '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
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
  shadows: {
    ...theme.shadows,
    cardHover: "0 0 12px -4px #6892d5;",
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
    linkedin: {
      path: (
        <path
          fill="currentColor"
          d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"
        ></path>
      ),
      viewBox: "0 0 500 500",
    },
    xing: {
      path: (
        <path d="M162.7 210c-1.8 3.3-25.2 44.4-70.1 123.5-4.9 8.3-10.8 12.5-17.7 12.5H9.8c-7.7 0-12.1-7.5-8.5-14.4l69-121.3c.2 0 .2-.1 0-.3l-43.9-75.6c-4.3-7.8.3-14.1 8.5-14.1H100c7.3 0 13.3 4.1 18 12.2l44.7 77.5zM382.6 46.1l-144 253v.3L330.2 466c3.9 7.1.2 14.1-8.5 14.1h-65.2c-7.6 0-13.6-4-18-12.2l-92.4-168.5c3.3-5.8 51.5-90.8 144.8-255.2 4.6-8.1 10.4-12.2 17.5-12.2h65.7c8 0 12.3 6.7 8.5 14.1z"></path>
      ),
      viewBox: "0 0 500 500",
    },
  },
};
