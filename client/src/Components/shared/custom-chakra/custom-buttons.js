import React from "react";
import {
  ButtonProps,
  Button,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import styled from "styled-components";

const ButtonComp = styled(Button)`
  background: ${({ theme }) =>
    `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`};
`;

export const CustomButton = (props) => (
  <ButtonComp {...props} color="white">
    {props.children}
  </ButtonComp>
);

const PrimaryButtonLayout = styled(Button)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.colors.primary} 4.86%, ${theme.colors.secondary} 96.67%)`};
  /* box-shadow: 0px 5px 15px -5px #9677ef; */
  color: white;
`;

export const PrimaryButton = React.forwardRef((props, ref) => (
  <PrimaryButtonLayout
    ref={ref}
    rounded="15px"
    fontWeight="100"
    boxShadow="md"
    {...props}
  >
    {props.children}
  </PrimaryButtonLayout>
));

export const SecondaryButton = React.forwardRef((props, ref) => (
  <Button
    ref={ref}
    border="1px solid"
    rounded="15px"
    bg="white"
    fontWeight="100"
    {...props}
  >
    {props.children}
  </Button>
));

const PrimaryIconButtonLayout = styled(IconButton)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.colors.primary} 4.86%, ${theme.colors.secondary} 96.67%)`};
  box-shadow: 0px 5px 15px -5px #9677ef;
  color: white;
`;

export const PrimaryIconButton = (props) => (
  <PrimaryIconButtonLayout {...props} />
);
