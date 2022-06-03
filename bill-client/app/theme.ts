// theme.ts

// 1. import `extendTheme` function
import {
  ConfigColorMode,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  disableTransitionOnChange: false,
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
