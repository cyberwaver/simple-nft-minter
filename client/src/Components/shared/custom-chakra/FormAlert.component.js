import { RenderIf } from "../render-if.component";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

export const FormAlert = ({ onTrue, alert = {} }) => {
  return (
    <RenderIf onTrue={onTrue}>
      <Alert status={alert.type}>
        <AlertIcon />
        <AlertDescription>{alert.message}</AlertDescription>
      </Alert>
    </RenderIf>
  );
};
