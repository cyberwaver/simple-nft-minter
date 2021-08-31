import * as NextLink from "next/link";
import styled, { DefaultTheme } from "styled-components";

const Span = styled.span`
  color: ${({ theme, color }) => color || theme.colors.primary};
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
  text-decoration: ${({ underline }) => (underline ? "underline" : "normal")};
`;

export const TextLink = (props) => (
  <NextLink.default {...props}>
    <a>
      <Span color={props.color} underline={props.underline || false} fontWeight={props.fontWeight}>
        {props.children}
      </Span>
    </a>
  </NextLink.default>
);

export const Link = (props) => (
  <NextLink.default {...props}>
    <a>{props.children}</a>
  </NextLink.default>
);
