import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, useColorMode } from "@chakra-ui/react";

const DarkController = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggleTheme = () => {
    toggleColorMode();
  };

  return (
    <Box onClick={handleToggleTheme} className="cursor-pointer">
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Box>
  );
};

export default DarkController;
