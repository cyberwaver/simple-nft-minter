import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useAuth } from "@Store/contexts/authentication";
import {
  SecondaryButton,
  PrimaryButton,
} from "@Components/shared/custom-chakra/custom-buttons";
import { RenderIf } from "@Components/shared/render-if.component";

export const Header = () => {
  console.log("USEAUTH: ", useAuth());
  const [authInfo, { authenticateUser, unauthenticateUser }] = useAuth();
  console.log(authInfo);
  return (
    <Flex
      flexDir={["column", "column", "row"]}
      justify={[null, null, "space-between"]}
      mr={[0, 0, "20px"]}
      alignItems="center"
    >
      <Box mb={["20px", "20px", 0]}>
        <Text fontWeight="600" fontSize="16px">
          Simple NFT Minter.
        </Text>
      </Box>
      <RenderIf onTrue={authInfo?.account}>
        <HStack align="stretch" alignItems="center" spacing="5px">
          <ProfileNavComp wallet={authInfo.account} />
          <Link href="/">
            <SecondaryButton leftIcon={<AddIcon />}>Mint NFT</SecondaryButton>
          </Link>
        </HStack>
      </RenderIf>
      <RenderIf onTrue={!authInfo?.account}>
        <UnAuthenticatedHeaderNav handleAuthentication={authenticateUser} />
      </RenderIf>
    </Flex>
  );
};

const ProfileNavComp = ({ wallet }) => {
  return (
    <Menu>
      <MenuButton
        transition="all 0.2s"
        border="none"
        _hover={{ bg: "gray.400" }}
        _expanded={{ bg: "blue.400" }}
        _focus={{ boxShadow: "outline" }}
      >
        <IconButton fontSize="22px" variant="link" icon={<AiOutlineUser />} />
      </MenuButton>
      <MenuList>
        <VStack
          align="stretch"
          spacing={2}
          px="5px"
          border="1px solid"
          borderColor="gray.200"
          my="10px"
          mx="5px"
          p="5px"
        >
          <Text fontSize="11px" fontWeight="600" color="gray.500">
            {wallet}
          </Text>
        </VStack>
      </MenuList>
    </Menu>
  );
};

const UnAuthenticatedHeaderNav = ({ handleAuthentication }) => {
  return (
    <SecondaryButton onClick={handleAuthentication}>
      Connect Wallet
    </SecondaryButton>
  );
};
