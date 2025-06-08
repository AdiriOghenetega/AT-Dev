import React from "react";
import { AiOutlineTwitter, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { VStack, IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

const socialLinks = [
  {
    name: "Twitter",
    icon: AiOutlineTwitter,
    url: "https://twitter.com/adiri_tega?t=tYACVBXxcjFscxCVd4dY5w&s=08",
    color: "twitter.500",
    bg: "twitter.50",
  },
  {
    name: "GitHub", 
    icon: AiFillGithub,
    url: "https://github.com/AdiriOghenetega",
    color: "gray.800",
    bg: "gray.100",
  },
  {
    name: "LinkedIn",
    icon: AiFillLinkedin, 
    url: "https://www.linkedin.com/in/adiri-oghenetega-33459b1a1",
    color: "linkedin.500",
    bg: "linkedin.50",
  }
];

const Socials = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack spacing={3}>
      {socialLinks.map((social, index) => (
        <Tooltip
          key={social.name}
          label={social.name}
          placement="right"
          hasArrow
        >
          <MotionIconButton
            as="a"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            icon={<social.icon />}
            aria-label={social.name}
            size="md"
            variant="ghost"
            bg={cardBg}
            color={social.color}
            _hover={{
              bg: social.bg,
              transform: "translateX(4px)",
            }}
            boxShadow="md"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </Tooltip>
      ))}
    </VStack>
  );
};

export default Socials;