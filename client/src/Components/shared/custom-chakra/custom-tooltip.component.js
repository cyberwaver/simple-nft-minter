import { Tooltip, Icon } from "@chakra-ui/react";

export const CustomToolTip = (props) => (
  <Tooltip hasArrow aria-label="hint" label={props.label} placement="right" bg="brand.500" zIndex={5000} {...props}>
    {/* <Box as={BsQuestionCircle} color="#869FFD" /> */}
    <Icon name="question" fontSize="12px" color="#DCDFF1" bg="white" />
  </Tooltip>
);
