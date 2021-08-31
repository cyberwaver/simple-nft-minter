import { Input, InputProps } from "@chakra-ui/react";

export const CustomInput = (props) => {
  return <Input h="44px" {...props} _focus={{ borderColor: "brand" }} />;
};
