import React from "react";
import {
  Switch,
  useColorMode,
  Box,
  Flex,
  Icon,
  Text,
  Spacer,
  Show,
  Tooltip,
  useColorModeValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { myLinks } from "../utils/navLinks";
import Link from "next/link";
import { FaGhost } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const tipBg = useColorModeValue("black", "white");
  const tipColor = useColorModeValue("white", "black");

  return (
    <Flex
      direction="column"
      p="1em"
      bg="rgb(239,232,250,.5)"
      position="fixed"
      w="100%"
      backdropFilter="blur(1px)"
      zIndex="2"
    >
      <Flex>
        <Link href="/" passHref>
          <Flex alignItems="center" color="rgb(1,22,39)">
            <Icon as={FaGhost} w={8} h={8} />
            <Text
              fontWeight="black"
              fontSize="large"
              fontFamily="Space Grotesk"
              marginLeft={1}
            >
              AT-Dev
            </Text>
          </Flex>
        </Link>
        <Spacer />
        <Show breakpoint="(min-width: 601px)">
          <Flex w="50%" alignItems="center" justifyContent="space-between">
            {myLinks?.map((linked) => (
              <Flex
                key={linked.id}
                alignItems="center"
                direction="column"
                role="group"
                as={motion.div}
              >
                <Box
                  bg={linked.bg}
                  w="5px"
                  h="5px"
                  borderRadius="50%"
                  opacity="0"
                  _groupHover={{ opacity: "1" }}
                ></Box>
                <a href={`#${linked.name}`}>
                  <Text
                    fontWeight="black"
                    color="rgb(1,22,39)"
                    fontFamily="Space Grotesk"
                  >
                    {linked.name}
                  </Text>
                </a>
              </Flex>
            ))}
          </Flex>
          <Spacer />
        </Show>
        <Tooltip
        label="Theme"
        bg={tipBg}
        color={tipColor}
        placement="left"
      >
        <Switch onChange={() => toggleColorMode()} m="2" />
      </Tooltip>
      </Flex>
      <Show breakpoint="(max-width: 600px)">
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          p="0 0.5em"
        >
          {myLinks?.map((linked) => (
            <Flex
              key={linked.id}
              alignItems="center"
              direction="column"
              role="group"
              as={motion.div}
            >
              <Box
                bg={linked.bg}
                w="9px"
                h="3px"
                opacity="0"
                _groupHover={{ opacity: "1" }}
              ></Box>
              <a href={`#${linked.name}`}>
                <Text
                  fontWeight="black"
                  color="rgb(1,22,39)"
                  fontFamily="Space Grotesk"
                >
                  {linked.name}
                </Text>
              </a>
            </Flex>
          ))}
        </Flex>
      </Show>
    </Flex>
  );
};

export default Header;
