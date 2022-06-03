import { Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <Heading>Welcome To Money </Heading>
      <Text>
        <ChakraLink as={Link} color="teal.500" to="/list">
          See
        </ChakraLink>{" "}
        your record list
      </Text>
    </main>
  );
}
