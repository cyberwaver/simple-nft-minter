import { theme } from "@chakra-ui/theme";
// Let's say you want to add custom colors
export const chakraCustomTheme = {
  ...theme,
  brandBlue: "linear-gradient(90deg, #6CB7FF 4.86%, #7985FF 96.67%)",
  colors: {
    ...theme.colors,
    primary: "#6CB7FF",
    secondary: "#7985FF",
    customBlue1: "#587EF4",
    bgprimary: "#E2E7ED",
    bgsecondary: "#F8F8FA",
    customGray1: "#EDEFF8",
    brand: {
      50: "#e3e8ff",
      100: "#b2b9ff",
      200: "#808bff",
      300: "#4e5cfe",
      400: "#1f2ffd",
      500: "#0a16e4",
      600: "#0311b2",
      700: "#000b80",
      800: "#00074f",
      900: "#00011f",
    },
  },
};
