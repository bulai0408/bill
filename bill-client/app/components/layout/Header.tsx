import { Box } from "@chakra-ui/react";

import GoBack from "~/components/route/GoBack";
import DarkController from "~/components/theme/DarkController";

const Header = () => {
  return (
    <Box className="flex justify-between items-center">
      <GoBack />
      <DarkController />
    </Box>
  );
};

export default Header;
