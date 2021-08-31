// import "../public/global-styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { chakraCustomTheme } from "@Setup/chakra-ui.setup";
import { styledComponentsCustomTheme } from "@Setup/styled/styled-components.setup";
import { AuthProvider } from "@Store/contexts/authentication";
import { AlertProvider } from "@Store/contexts/alert";
import { RootIndexComp } from "@Components/Root/root.index";

function MyApp({ Component, pageProps }) {
  return (
    <StyledComponentsThemeProvider theme={styledComponentsCustomTheme}>
      <ChakraProvider theme={chakraCustomTheme}>
        <AuthProvider>
          <AlertProvider>
            <RootIndexComp>
              <Component {...pageProps} />
            </RootIndexComp>
          </AlertProvider>
        </AuthProvider>
      </ChakraProvider>
    </StyledComponentsThemeProvider>
  );
}

export default MyApp;
