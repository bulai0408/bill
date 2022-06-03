import { Box, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "@remix-run/react";

const GoBack = () => {
  const history = useNavigate();

  return (
    <Box
      className="cursor-pointer"
      onClick={() => {
        history(-1);
      }}
    >
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="xl"
        fontWeight="extrabold"
      >
        Go Back
      </Text>
    </Box>
  );
};
export default GoBack;
