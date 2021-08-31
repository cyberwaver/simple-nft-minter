import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  FormControl,
  FormLabel,
  Flex,
  IconButton,
  Image,
  Box,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import shortId from "shortid";
import { RenderIf } from "./render-if.component";
import { IoIosCloudUpload } from "react-icons/io";
import { SecondaryButton } from "./custom-chakra/custom-buttons";

const Layout = styled.section`
  width: 100%;
  height: 100%;
  .inputfile {
    /* visibility: hidden etc. wont work */
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .inputfile:focus + label {
    /* keyboard navigation */
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
  .inputfile + label * {
    pointer-events: none;
  }
`;

export const FileUploadComp = ({
  type,
  currentFile,
  onFileRemoved,
  onFileSelected,
  error,
  onFocus,
}) => {
  const [compToShow, setCompToShow] = useState(() =>
    currentFile ? { current: "VIEW" } : { current: "ADD" }
  );
  const [file, setFile] = useState();
  const [fileURL, setFileURL] = useState();
  const fileInputRef = useRef();

  const fileSelectedHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setCompToShow({ current: "VIEW" });
  };

  const removeImageHandler = () => {
    setFile(undefined);
    setCompToShow({ current: "ADD" });
    onFileRemoved();
  };

  useEffect(() => {
    onFileSelected(file);
    if (type === "IMAGE") {
      let reader = new FileReader();
      reader.onloadend = () => {
        console.log("NEW URL DONE: ", reader.result);
        setFileURL(reader.result);
      };
      try {
        reader.readAsDataURL(file);
      } catch (e) {}
      return () => reader.removeEventListener("loadend", (e) => e.loaded);
    }
  }, [file]);

  useEffect(() => {
    if (typeof currentFile === "object") setFile(currentFile);
    if (typeof currentFile === "string") setFileURL(currentFile);
  }, []);

  return (
    <Layout>
      <RenderIf onTrue={compToShow.current === "VIEW"}>
        <FileViewer
          type={type}
          fileURL={fileURL}
          onRemoveFile={removeImageHandler}
        />
      </RenderIf>
      <RenderIf onTrue={compToShow.current === "ADD"}>
        <AddFile
          ref={fileInputRef}
          onChange={fileSelectedHandler}
          onFocus={onFocus}
          error={error}
        />
      </RenderIf>
    </Layout>
  );
};

const FileViewer = ({ type, fileURL, onRemoveFile }) => {
  return (
    <Box d="block" pos="relative" w="100%" h="100%">
      <Box pos="relative" w="100%" h="100%">
        <Image
          src={type === "IMAGE" ? fileURL : "/images/audio-placeholder.png"}
          w="100%"
          h="100%"
          objectFit="contain"
          objectPosition="center"
        />
      </Box>
      <Box pos="absolute" top="0" left="0" right="0" textAlign="right">
        <IconButton
          aria-label="delete"
          icon={<DeleteIcon />}
          variant="outline"
          variantColor="brand"
          onClick={onRemoveFile}
          fontSize="12px"
          size="xs"
        />
      </Box>
    </Box>
  );
};

const AddFile = React.forwardRef(({ onChange, onFocus, error }, ref) => {
  const id = shortId.generate();
  return (
    <Box
      pos="relative"
      h="100%"
      w="100%"
      border={error && "1px solid red"}
      borderColor="red"
    >
      <FormControl isRequired={false} h="100%" w="100%">
        <input
          ref={ref}
          type="file"
          id={id}
          className="inputfile"
          onChange={onChange}
          onFocus={onFocus}
        />
        <FormLabel htmlFor={id} p="0" cursor="pointer" h="100%" w="100%">
          <Flex
            direction="column"
            align="center"
            justify="space-around"
            backgroundColor="bgsecondary"
            h="100%"
            w="100%"
          >
            <Stack justify="center" align="center">
              <IconButton
                aria-label="upload"
                icon={<IoIosCloudUpload />}
                size="xs"
                variant="unstyled"
                fontSize="30px"
                mb="10px"
              />
              {/* <Box fontSize="13px">Upload file</Box> */}
            </Stack>
            <Box>
              <SecondaryButton
                ref={null}
                py="2px"
                px="20px"
                h="20px"
                color="gray.500"
              >
                select file
              </SecondaryButton>
            </Box>
          </Flex>
        </FormLabel>
      </FormControl>
    </Box>
  );
});
