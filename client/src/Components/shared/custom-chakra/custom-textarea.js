import { Textarea } from "@chakra-ui/react";

export const CustomTextarea = (props) => {
  return <Textarea _focus={{ borderColor: "brand" }} {...props} />;
};
