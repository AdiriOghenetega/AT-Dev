import React from "react";
import { AiOutlineTwitter, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Box, Flex, Icon, Tooltip } from "@chakra-ui/react";

const Socials = () => {
  return (
    <Flex
      direction="column"
      p="1em 0.3em"
      height="10em"
      justifyContent="space-between"
      alignItems="center"
    >
      <Tooltip
        label="twitter"
        bg="rgb(156, 240, 202)"
        color="rgb(29,155,240)"
        placement="right"
      >
        <Box
          bg="rgb(227,209,248)"
          w="32px"
          h="32px"
          borderRadius="50%"
          textAlign="center"
          p="6px 1px 1px"
          boxShadow="0 0 25px rgba(0,0,0,0.2)"
        >
          <a
            href="https://twitter.com/adiri_tega?t=tYACVBXxcjFscxCVd4dY5w&s=08"
            target="_blank"
          >
            <Icon as={AiOutlineTwitter} color="rgb(29,155,240)" />
          </a>
        </Box>
      </Tooltip>
      <Tooltip
        label="github"
        bg="rgb(227,209,248)"
        color="black"
        placement="right"
      >
      <Box
        bg="rgb(203,213,224)"
        w="32px"
        h="32px"
        borderRadius="50%"
        textAlign="center"
        p="6px 1px 1px"
        boxShadow="0 0 25px rgba(0,0,0,0.2)"
      >
        <a href="https://github.com/AdiriOghenetega" target="_blank">
          <Icon as={AiFillGithub} color="black" />
        </a>
      </Box>
      </Tooltip>
      <Tooltip
        label="linkedin"
        bg="rgb(203,213,224)"
        color="rgb(10,102,194)"
        placement="right"
      >
      <Box
        bg="rgb(156, 240, 202)"
        w="32px"
        h="32px"
        borderRadius="50%"
        textAlign="center"
        p="6px 1px 1px"
        boxShadow="0 0 25px rgba(0,0,0,0.2)"
      >
        <a
          href="https://www.linkedin.com/in/adiri-oghenetega-33459b1a1"
          target="_blank"
        >
          <Icon as={AiFillLinkedin} color="rgb(10,102,194)" />
        </a>
      </Box>
      </Tooltip>
    </Flex>
  );
};

export default Socials;
