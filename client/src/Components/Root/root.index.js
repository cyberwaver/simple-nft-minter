import { Box, Flex } from "@chakra-ui/react";
import { Header } from "./Header";

export const RootIndexComp = ({ children }) => {
  return (
    <Box maxW="1000px" mx="auto" my="50px" px="20px">
      <Header />
      <Box pt="70px">{children}</Box>
    </Box>
  );
};
