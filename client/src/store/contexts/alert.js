import { createContext, useContext, useState, useMemo, useEffect, useRef } from "react";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Button,
} from "@chakra-ui/react";
import { RenderIf } from "@Components/shared/render-if.component";

const AlertContext = createContext(() => {});
export const AlertProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState({});
  const cancelRef = useRef();
  const alert = ({ title, content, onCancel, onProceed, cancelText = "Cancel", proceedText = "proceed" }) => {
    setState({ title, content, onProceed, cancelText, proceedText, onCancel });
    onOpen();
  };

  const handleClose = () => {
    onClose();
    if (typeof state.onCancel === "function") return state.onCancel();
  };

  return (
    <AlertContext.Provider value={alert}>
      <>
        {children}
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={handleClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>{state.title}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>{state.content || "Are you sure you want to proceed?"}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose}>
                {state.cancelText}
              </Button>
              <RenderIf onTrue={state.onProceed}>
                <Button colorScheme="red" ml={3} onClick={state.onProceed}>
                  {state.proceedText}
                </Button>
              </RenderIf>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
