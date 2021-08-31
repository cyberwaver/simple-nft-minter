import { FormLabel } from "@chakra-ui/react";

export const CustomFormLabel = (props) => (
  <FormLabel fontWeight="600" fontSize="13px" color="gray.600" {...props}>
    {props.children}
  </FormLabel>
);
