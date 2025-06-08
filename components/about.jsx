import React, { useContext, useMemo } from "react";
import { AppWrap } from "@/Wrapper";
import {
  Flex,
  Text,
  Button,
  Box,
  VStack,
  useMediaQuery,
  Image,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";

// Subtle, professional animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const scaleOnHover = {
  whileHover: { scale: 1.02 },
  transition: { duration: 0.2, ease: "easeInOut" }
};

const About = () => {
  const { about } = useContext(UserContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  // Memoize to prevent unnecessary re-renders
  const aboutData = useMemo(() => about?.[0], [about]);

  if (!aboutData) return null;

  const { title, subtitle, description, imgUrl, resume } = aboutData;

  return (
    <Container maxW="7xl" py={{ base: 16, md: 24 }}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        gap={{ base: 12, lg: 16 }}
        minH={{ lg: "70vh" }}
      >
        {/* Content Section */}
        <motion.div {...fadeInUp}>
          <VStack
            align={{ base: "center", lg: "flex-start" }}
            spacing={6}
            maxW={{ lg: "500px" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <VStack spacing={3} align={{ base: "center", lg: "flex-start" }}>
              <Text
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                color="gray.900"
                _dark={{ color: "white" }}
                letterSpacing="tight"
                lineHeight="shorter"
              >
                {title}
              </Text>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                color="blue.600"
                _dark={{ color: "blue.300" }}
                fontWeight="medium"
              >
                {subtitle}
              </Text>
            </VStack>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              _dark={{ color: "gray.300" }}
              lineHeight="relaxed"
              maxW="600px"
            >
              {description}
            </Text>

            <motion.div {...scaleOnHover}>
              <Button
                as="a"
                href={resume}
                target="_blank"
                size="lg"
                colorScheme="blue"
                variant="solid"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="medium"
                borderRadius="xl"
                boxShadow="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
                transition="all 0.2s"
              >
                Download Resume
              </Button>
            </motion.div>
          </VStack>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Box
            position="relative"
            w={{ base: "280px", md: "350px", lg: "400px" }}
            h={{ base: "280px", md: "350px", lg: "400px" }}
          >
            {/* Subtle background decoration */}
            <Box
              position="absolute"
              top="20px"
              left="20px"
              w="full"
              h="full"
              bg="blue.100"
              _dark={{ bg: "blue.900" }}
              borderRadius="3xl"
              opacity={0.3}
            />
            
            {/* Main image container */}
            <Box
              position="relative"
              w="full"
              h="full"
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="2xl"
              bg="white"
              _dark={{ bg: "gray.800" }}
            >
              <Image
                src={urlFor(imgUrl)?.width(400).height(400).url()}
                alt={`${title} - Profile`}
                w="full"
                h="full"
                objectFit="cover"
                loading="lazy"
                fallback={
                  <Box
                    w="full"
                    h="full"
                    bg="gray.200"
                    _dark={{ bg: "gray.700" }}
                    display="flex"
                    align="center"
                    justify="center"
                  >
                    <Text color="gray.500">Loading...</Text>
                  </Box>
                }
              />
            </Box>
          </Box>
        </motion.div>
      </Flex>
    </Container>
  );
};

export default AppWrap(About, "About");