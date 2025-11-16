import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AppWrap } from "@/Wrapper";
import { 
  FaReact, 
  FaMobile, 
  FaCode, 
  FaRocket 
} from "react-icons/fa";
import { 
  MdSpeed, 
  MdOutlineDesignServices 
} from "react-icons/md";

const MotionBox = motion(Box);

const services = [
  {
    id: 1,
    icon: FaReact,
    title: "Web Development",
    description: "Modern websites and web apps tailored for performance, accessibility, and SEO.",
    color: "blue.500",
  },
  {
    id: 2,
    icon: FaMobile,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications built with React Native for iOS and Android.",
    color: "purple.500",
  },
  {
    id: 3,
    icon: MdSpeed,
    title: "Performance Optimization",
    description: "Optimize your existing applications for speed, scalability, and better user engagement.",
    color: "green.500",
  },
  {
    id: 4,
    icon: MdOutlineDesignServices,
    title: "UI/UX Design Implementation",
    description: "Transform designs into pixel-perfect, responsive, and interactive user interfaces.",
    color: "orange.500",
  },
  {
    id: 5,
    icon: FaCode,
    title: "Full-Stack Development",
    description: "End-to-end solutions with modern frontend and robust backend systems.",
    color: "pink.500",
  },
  {
    id: 6,
    icon: FaRocket,
    title: "Technical Consulting",
    description: "Help your development team grow with code reviews, best practices, and technical guidance.",
    color: "teal.500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ServiceCard = ({ service }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.750");

  return (
    <MotionBox
      variants={cardVariants}
      bg={cardBg}
      p={8}
      borderRadius="2xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
        bg: hoverBg,
        borderColor: service.color,
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      h="full"
    >
      <VStack align="start" spacing={5} h="full">
        {/* Icon */}
        <Box
          w="60px"
          h="60px"
          borderRadius="xl"
          bg={`${service.color}15`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon 
            as={service.icon} 
            w={8} 
            h={8} 
            color={service.color}
          />
        </Box>

        {/* Title */}
        <Text
          fontSize="xl"
          fontWeight="700"
          color="gray.900"
          _dark={{ color: "white" }}
          lineHeight="1.3"
        >
          {service.title}
        </Text>

        {/* Description */}
        <Text
          fontSize="md"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          lineHeight="1.7"
        >
          {service.description}
        </Text>
      </VStack>
    </MotionBox>
  );
};

const Services = () => {
  return (
    <Container maxW="7xl" py={{ base: 8, md: 32 }}>
      <VStack spacing={16} align="stretch">
        {/* Header */}
        <VStack spacing={6}>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.600"
            _dark={{ color: "blue.400" }}
            fontWeight="600"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            Services
          </Text>
          
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="800"
            color="gray.900"
            _dark={{ color: "white" }}
            textAlign="center"
            lineHeight="1.2"
          >
            What I Offer
          </Text>
          
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
            maxW="700px"
            lineHeight="1.7"
          >
            I offer custom software development services designed to bring your ideas to life and help your business grow online
          </Text>
        </VStack>

        {/* Services Grid */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </SimpleGrid>
        </MotionBox>
      </VStack>
    </Container>
  );
};

export default AppWrap(Services, "Services");