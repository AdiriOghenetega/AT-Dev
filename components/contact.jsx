import React from "react";
import {
  Box,
  Text,
  VStack,
  Container,
  SimpleGrid,
  Icon,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AppWrap } from "@/Wrapper";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const ContactCard = ({ icon, title, subtitle, href, type = "link" }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconColor = useColorModeValue("blue.500", "blue.300");

  return (
    <MotionBox
      as={type === "tel" ? "a" : type === "mailto" ? "a" : Link}
      href={href}
      target={type === "link" ? "_blank" : undefined}
      rel={type === "link" ? "noopener noreferrer" : undefined}
      variants={fadeInUp}
      bg={cardBg}
      p={6}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
        borderColor: iconColor,
      }}
      transition="all 0.2s ease-in-out"
      textDecoration="none"
      _focus={{ outline: "none" }}
    >
      <VStack spacing={4}>
        <Box
          w="50px"
          h="50px"
          borderRadius="full"
          bg={`${iconColor}15`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} w={6} h={6} color={iconColor} />
        </Box>
        
        <VStack spacing={1}>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
          >
            {title}
          </Text>
          <Text
            fontSize="sm"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
          >
            {subtitle}
          </Text>
        </VStack>
      </VStack>
    </MotionBox>
  );
};

const Contact = () => {
  return (
    <Container maxW="7xl" py={{ base: 16, md: 24 }}>
      <VStack spacing={16} align="center">
        {/* Header */}
        <VStack spacing={6} textAlign="center">
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
          >
            Get In Touch
          </Text>
          
          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="600px"
          >
            Have a project in mind or just want to chat? I'd love to hear from you.
          </Text>
        </VStack>

        {/* Contact Information - Centered */}
        <MotionBox 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true }}
        >
          <VStack spacing={8} align="center">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="gray.900"
              _dark={{ color: "white" }}
              textAlign="center"
            >
              Contact Information
            </Text>
            
            <SimpleGrid 
              columns={{ base: 1, md: 2 }} 
              spacing={8} 
              maxW="600px"
            >
              <ContactCard
                icon={EmailIcon}
                title="Email"
                subtitle="adiritega@gmail.com"
                href="mailto:adiritega@gmail.com"
                type="mailto"
              />
              
              <ContactCard
                icon={PhoneIcon}
                title="Phone"
                subtitle="+234 814 260 4385"
                href="tel:+2348142604385"
                type="tel"
              />
            </SimpleGrid>

            {/* Additional message */}
            <Box
              textAlign="center"
              maxW="500px"
              pt={4}
            >
              <Text
                fontSize="md"
                color="gray.600"
                _dark={{ color: "gray.400" }}
                lineHeight="tall"
              >
                Feel free to reach out through email or phone. I'm always excited to discuss new opportunities and collaborate on interesting projects.
              </Text>
            </Box>
          </VStack>
        </MotionBox>
      </VStack>
    </Container>
  );
};

export default AppWrap(Contact, "Contact");