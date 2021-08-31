import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@Store/contexts/authentication";
import { minterContractService } from "@Services/mintContractService";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CustomSkeletonLoader } from "./shared/custom-chakra/CustomSkeletonLoader.component";
import { IPFSUtil } from "../utils/IPFSUtil";
import { RenderIf } from "./shared/render-if.component";
import { Link } from "@Components/shared/link.component";
import { PrimaryButton } from "@Components/shared/custom-chakra/custom-buttons";

export const NFTView = () => {
  const router = useRouter();
  const [{ minterContract }] = useAuth();
  const minterService = minterContractService(minterContract);
  const [isLoading, setIsLoading] = useState(true);
  const [{ status, data }, setResponse] = useState({});
  useEffect(
    () =>
      (async () => {
        if (!router.isReady || !minterContract) return;
        let tokenId = Number(router.query.id);
        if (tokenId) {
          try {
            const NFT = await minterService.getNFTDetails(tokenId);
            const { data } = await axios.get(IPFSUtil.getHashURL(NFT.uri));
            setResponse({
              status: "SUCCESS",
              data: {
                ...data,
                owner: NFT.owner,
              },
            });
          } catch (err) {
            console.log("NFTVIEW ==> ", err);
            setResponse({
              status: "FAILED",
              data: "NFT not found or not minted yet.",
            });
          } finally {
            setIsLoading(false);
          }
        } else {
          router.push("/");
        }
      })(),
    [router.isReady, minterContract]
  );
  return (
    <Flex align="center" justify="center" h="100%">
      <CustomSkeletonLoader isLoaded={!isLoading}>
        <RenderIf onTrue={status === "SUCCESS"}>
          <VStack align="center" spacing={5}>
            <Box h="400px" w="500px">
              <Image
                src={IPFSUtil.getHashURL(data?.image)}
                h="100%"
                w="100%"
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
            <Text fontSize="12px" fontWeight="600">
              {data?.name}
            </Text>
            <HStack fontSize="12px" fontWeight="600" color="gray.500">
              <Text>Owner:</Text>
              <Text>{data?.owner}</Text>
            </HStack>
            <Divider />
            <Box>{data?.description}</Box>
          </VStack>
        </RenderIf>
        <RenderIf onTrue={status === "FAILED"}>
          <Flex minH="50vh" w="100%" alignItems="center" justify="center">
            <VStack spacing={5}>
              <Text fontWeight="600" fontSize="18px">
                {data}
              </Text>
              <Link href="/">
                <a>
                  <PrimaryButton>Mint New NFT</PrimaryButton>
                </a>
              </Link>
            </VStack>
          </Flex>
        </RenderIf>
      </CustomSkeletonLoader>
    </Flex>
  );
};
