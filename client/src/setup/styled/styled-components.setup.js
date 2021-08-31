import { chakraCustomTheme } from "@Setup/chakra-ui.setup";

export const styledComponentsCustomTheme = {
  colors: chakraCustomTheme.colors,
  boxShadow: {
    MD: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
  },
  screen: {
    xs: "30em",
    sm: "48em",
    md: "62em",
    lg: "80em",
  },
};
