import React, { useContext, useMemo } from "react";
import { AppWrap } from "@/Wrapper";
import {
  Flex,
  Text,
  Button,
  Box,
  VStack,
  HStack,
  Container,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";

const MotionBox = motion(Box);

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
};

const About = () => {
  const { about } = useContext(UserContext);
  const aboutData = useMemo(() => about?.[0], [about]);

  if (!aboutData) return null;

  const { title, subtitle, description, imgUrl, resume } = aboutData;

  return (
    <Container maxW="7xl" py={{ base: 16, md: 32 }}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        gap={{ base: 16, lg: 20 }}
        minH={{ lg: "80vh" }}
      >
        {/* Left Content Section */}
        <MotionBox
          flex={1}
          maxW={{ lg: "600px" }}
          {...fadeInLeft}
        >
          <VStack
            align={{ base: "center", lg: "flex-start" }}
            spacing={8}
            textAlign={{ base: "center", lg: "left" }}
          >
            {/* Greeting */}
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="blue.600"
              _dark={{ color: "blue.400" }}
              fontWeight="600"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              Hello, I'm
            </Text>

            {/* Name/Title */}
            <VStack spacing={3} align={{ base: "center", lg: "flex-start" }}>
              <Text
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="800"
                color="gray.900"
                _dark={{ color: "white" }}
                letterSpacing="tight"
                lineHeight="1.1"
              >
                {title}
              </Text>
              
              <Text
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="700"
                bgGradient="linear(to-r, blue.500, purple.600)"
                bgClip="text"
                lineHeight="1.2"
              >
                {subtitle}
              </Text>
            </VStack>

            {/* Description */}
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              _dark={{ color: "gray.300" }}
              lineHeight="1.8"
              maxW="550px"
            >
              {description}
            </Text>

            {/* CTA Buttons */}
            <HStack spacing={4} pt={4} flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
              <Button
                as="a"
                href={resume}
                target="_blank"
                size="lg"
                colorScheme="blue"
                variant="solid"
                px={8}
                py={7}
                fontSize="lg"
                fontWeight="600"
                borderRadius="xl"
                boxShadow="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "2xl",
                }}
                transition="all 0.3s"
              >
                Download Resume
              </Button>
            </HStack>

            {/* Stats or highlights (optional) */}
            <HStack
              spacing={8}
              pt={8}
              display={{ base: "none", md: "flex" }}
            >
              <VStack align="start" spacing={1}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="blue.600"
                  _dark={{ color: "blue.400" }}
                >
                  5+
                </Text>
                <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  Years Experience
                </Text>
              </VStack>
              
              <VStack align="start" spacing={1}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="blue.600"
                  _dark={{ color: "blue.400" }}
                >
                  70+
                </Text>
                <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                  Projects Completed
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </MotionBox>

        {/* Right Image Section */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          position="relative"
        >
          <Box
            position="relative"
            w={{ base: "300px", md: "400px", lg: "450px" }}
            h={{ base: "300px", md: "400px", lg: "450px" }}
          >
            {/* Decorative gradient background */}
            <Box
              position="absolute"
              top="0"
              right="0"
              w="full"
              h="full"
              bgGradient="linear(to-br, blue.400, purple.600)"
              borderRadius="3xl"
              opacity={0.1}
              filter="blur(40px)"
            />
            
            {/* Decorative border element */}
            <Box
              position="absolute"
              top="-15px"
              right="-15px"
              w="full"
              h="full"
              border="3px solid"
              borderColor="blue.500"
              _dark={{ borderColor: "blue.400" }}
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
              _dark={{ bg: "gray.800",borderColor: "gray.800" }}
              border="5px solid"
              borderColor="white"
            >
              <Image
                src={urlFor(imgUrl)?.width(450).height(450).url()}
                alt={`${title} - Profile`}
                w="full"
                h="full"
                objectFit="cover"
                loading="eager"
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
        </MotionBox>
      </Flex>
    </Container>
  );
};

export default AppWrap(About, "About");