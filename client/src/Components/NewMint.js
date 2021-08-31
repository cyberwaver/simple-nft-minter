import React from "react";
import { useFormik } from "formik";
import { useAuth } from "@Store/contexts/authentication";
import {
  Stack,
  Text,
  FormControl,
  SimpleGrid,
  Flex,
  Box,
  HStack,
  Textarea,
  FormErrorMessage,
  AlertIcon,
  AlertDescription,
  Alert,
} from "@chakra-ui/react";
import { CustomToolTip } from "@Components/shared/custom-chakra/custom-tooltip.component";
import { FileUploadComp } from "@Components/shared/FileUpload.component";
import { CustomFormLabel } from "@Components/shared/custom-chakra/custom-label";
import { CustomInput } from "@Components/shared/custom-chakra/custom-input";
import { CustomTextarea } from "@Components/shared/custom-chakra/custom-textarea";
import {
  SecondaryButton,
  PrimaryButton,
} from "@Components/shared/custom-chakra/custom-buttons";
import { uploadMediaFilesToIPFS } from "../utils/uploadMediaFilesToIPFS";
import { minterContractService } from "../services/mintContractService";
import { RenderIf } from "./shared/render-if.component";
import { TextLink } from "@Components/shared/link.component";

export const NewMint = () => {
  const [{ minterContract, account }] = useAuth();
  const minterService = minterContractService(minterContract, account);

  const handleMintNFT = async (values, formikHelper) => {
    const [image] = await uploadMediaFilesToIPFS([values.image]);
    try {
      const { tokenId } = await minterService.mintNewNFT({ ...values, image });
      formikHelper.setStatus({ status: "SUCCESS", data: { tokenId } });
    } catch (err) {
      console.log("ERROR:: ", err);
      formikHelper.setStatus({
        status: "FAILED",
        message: "Could not mint new NFT",
      });
    }
  };

  const formik = useFormik({
    onSubmit: handleMintNFT,
    initialValues: {
      image: "",
      name: "",
      description: "",
    },
    validate: ({ image }) => {
      if (!image) formik.setFieldError("image", "An Image is required");
    },
  });

  return (
    <Flex flexDir="column" minH="100%" align="center" justify="center">
      <RenderIf onTrue={!!formik.status}>
        <Alert
          status={formik.status?.status === "SUCCESS" ? "success" : "error"}
          w="auto"
          justifySelf="center"
          my="20px"
        >
          <AlertIcon />
          <RenderIf onTrue={formik.status?.status === "SUCCESS"}>
            <AlertDescription>
              <HStack spacing="2">
                <Text>NFT has been successfully minted.</Text>
                <TextLink
                  href={`/nfts/${formik.status?.data?.tokenId}`}
                  fontWeight="600"
                  color="inherit"
                >
                  View NFT
                </TextLink>
              </HStack>
            </AlertDescription>
          </RenderIf>
          <RenderIf onTrue={formik.status?.status !== "SUCCESS"}>
            <AlertDescription>{formik.status?.message}</AlertDescription>
          </RenderIf>
        </Alert>
      </RenderIf>
      <form onSubmit={formik.handleSubmit}>
        <SimpleGrid column={1} columnGap="30px" maxW="500px" mx="auto">
          <FormControl
            isRequired
            p="10px"
            border="1px solid"
            borderColor="gray.300"
            mb="30px"
            mt="30px"
          >
            <Stack isInline spacing={3} mb="20px" align="baseline">
              <CustomFormLabel>NFT Image</CustomFormLabel>
              <CustomToolTip label="Upload an image using the specifications" />
            </Stack>
            <SimpleGrid columns={[1, 1, 2]} spacingX="20px" spacingY="30px">
              <Flex align="flex-start" justify="center">
                <Box h="200px" maxW="200px" w="100%">
                  <FileUploadComp
                    type="IMAGE"
                    currentFile={formik.values.image}
                    onFileRemoved={() => {
                      formik.setFieldValue("image", "");
                    }}
                    onFileSelected={(file) => {
                      formik.setFieldValue("image", file);
                    }}
                  />
                </Box>
              </Flex>
              <Box>
                <Box fontSize="17px" mb="15px">
                  Image Requirements
                </Box>
                <Box>
                  <Text fontSize="11px" mb="5px">
                    File format must be .jpg or .jpeg
                  </Text>
                  <Text fontSize="11px" mb="5px">
                    Image size must be a minimum of 4096x4096 pixels and a
                    maximum of 8000x8000 pixels.
                  </Text>
                  <Text fontSize="11px" mb="5px">
                    Image must be in a square format. Rounded or disc type
                    designs will not be accepted.
                  </Text>
                  <Text fontSize="11px" mb="5px">
                    Image file size must be no larger than 5Mb.
                  </Text>
                  <Text fontSize="11px" mb="5px">
                    Resolution of 300 DPI if possible, however we accept 72 DPI
                    and above.{" "}
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>
          </FormControl>
          <FormControl
            isInvalid={!!(formik.touched.name && formik.errors.name)}
            isRequired
            mb="30px"
          >
            <Box>
              <CustomFormLabel>Name</CustomFormLabel>
              <CustomInput
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                // placeholder="NFT name"
                onBlur={formik.handleBlur}
                required
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </Box>
          </FormControl>

          <FormControl
            isInvalid={
              !!(formik.touched.description && formik.errors.description)
            }
            mb="30px"
          >
            <Box>
              <CustomFormLabel>Description</CustomFormLabel>
              <CustomTextarea
                name="description"
                value={formik.description}
                onChange={formik.handleChange}
                placeholder="NFT description..."
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </Box>
          </FormControl>
          <HStack align="center" justify="center">
            <RenderIf onTrue={!!account}>
              <PrimaryButton bg="primary" type="submit" fontWeight="600">
                Mint NFT
              </PrimaryButton>
            </RenderIf>
            <RenderIf onTrue={!!account === false}>
              <SecondaryButton isDisabled type="submit">
                Connect Wallet
              </SecondaryButton>
            </RenderIf>
          </HStack>
        </SimpleGrid>
      </form>
    </Flex>
  );
};
