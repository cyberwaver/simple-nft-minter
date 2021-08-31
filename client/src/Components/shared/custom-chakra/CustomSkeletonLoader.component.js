import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { RenderIf } from "../render-if.component";

export const CustomSkeletonLoader = ({ children, isLoaded }) => {
  return (
    <>
      <RenderIf onTrue={!isLoaded}>
        <Flex direction="column" h="100%" px="30px">
          <Flex direction="column" flex="1" minH="100px" mb="30px">
            <Skeleton minH="15px" flex="1" mb="20px" />
            <Skeleton minH="15px" flex="1" mb="20px" />
            <Skeleton minH="15px" flex="1" />
          </Flex>
          <Flex minH="100px" flex="1" mb="30px">
            <Skeleton flex="1" minH="100%" mr="30px" />
            <Skeleton flex="1" minH="100%" />
          </Flex>
          <Flex direction="column" flex="1" minH="100px">
            <Skeleton flex="1" mb="20px" />
            <Skeleton flex="1" mb="20px" />
            <Skeleton flex="1" />
          </Flex>
        </Flex>
      </RenderIf>
      <RenderIf onTrue={isLoaded}>{children}</RenderIf>
    </>
  );
};
