import React from 'react';
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.600", "gray.400");

  return (
    <Box 
      bg={bg}
      color={color}
      py={8}
      textAlign="center"
      borderTop="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <VStack spacing={2}>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Adiri Oghenetega. All rights reserved.
        </Text>
        <Text fontSize="xs">
          Built with Next.js, Chakra UI, Framer Motion & Sanity.io
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;