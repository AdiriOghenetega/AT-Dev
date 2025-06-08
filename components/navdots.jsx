import React from 'react';
import { VStack, Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { myLinks } from "../utils/navLinks";

const MotionBox = motion(Box);

const NavDots = ({ active }) => {
  const inactiveColor = useColorModeValue("gray.300", "gray.600");
  
  const handleClick = (sectionName) => {
    const element = document.getElementById(sectionName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <VStack spacing={3}>
      {myLinks?.map((link) => (
        <MotionBox
          key={link.id}
          as="button"
          w="12px"
          h="12px"
          borderRadius="full"
          bg={active === link.name ? link.bg : inactiveColor}
          cursor="pointer"
          onClick={() => handleClick(link.name)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          _focus={{ outline: "none" }}
          aria-label={`Navigate to ${link.name}`}
        />
      ))}
    </VStack>
  );
};

export default NavDots;