import { Box, Button } from "@chakra-ui/react";

export const SubmitButton = (props) => {
  return (
    <Box w="100%" textAlign="center">
      <Button mt="10px" maxW="400px" mx="auto" variantColor="brand" leftIcon="add" type="submit" {...props}>
        {props.children}
      </Button>
    </Box>
  );
};
