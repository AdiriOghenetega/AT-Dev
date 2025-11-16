import React, { useContext, useState, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  ButtonGroup,
  SimpleGrid,
  Container,
  VStack,
  HStack,
  Badge,
  Icon,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AppWrap } from "@/Wrapper";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";
import { AiOutlineEye, AiFillGithub, AiOutlineDownload } from "react-icons/ai";

const MotionBox = motion(Box);

// Animation variants
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

const ProjectCard = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.750");
  
  const isMobile = project.tags?.includes("mobile");

  const getImageUrl = () => {
    try {
      if (!project.imgUrl) return null;
      return urlFor(project.imgUrl)
        .width(600)
        .height(400)
        .quality(90)
        .format('webp')
        .url();
    } catch (error) {
      console.warn('Error generating image URL:', error);
      return null;
    }
  };

  const imageUrl = getImageUrl();
  
  return (
    <MotionBox
      variants={cardVariants}
      bg={cardBg}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
        bg: hoverBg,
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      h="full"
      display="flex"
      flexDirection="column"
    >
      {/* Image Section with Overlay */}
      <Box 
        position="relative" 
        w="full" 
        h="280px"
        overflow="hidden"
        bg="gray.100" 
        _dark={{ bg: "gray.700" }}
      >
        {imageUrl ? (
          <Box position="relative" h="full" w="full">
            <Image
              src={imageUrl}
              alt={project.title || "Project image"}
              w="full"
              h="full"
              objectFit="cover"
              loading="lazy"
              style={{ display: 'block' }}
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.05)" }}
            />
            
            {/* Gradient Overlay */}
            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              h="50%"
              bgGradient="linear(to-t, rgba(0,0,0,0.7), transparent)"
              opacity={0}
              transition="opacity 0.3s"
              _groupHover={{ opacity: 1 }}
            />
          </Box>
        ) : (
          <Box
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.200"
            _dark={{ bg: "gray.600" }}
            flexDirection="column"
          >
            <Text color="gray.500" fontSize="md" fontWeight="600">
              {project.title || "Project"}
            </Text>
            <Text color="gray.400" fontSize="sm" mt={2}>
              {isMobile ? "Mobile App" : "Web App"}
            </Text>
          </Box>
        )}
        
        {/* Project type badge */}
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme={isMobile ? "purple" : "blue"}
          variant="solid"
          fontSize="xs"
          px={3}
          py={1}
          borderRadius="full"
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          {isMobile ? "Mobile" : "Web"}
        </Badge>
      </Box>

      {/* Content Section */}
      <VStack p={6} align="stretch" spacing={4} flex="1">
        {/* Title */}
        <Text
          fontSize="xl"
          fontWeight="700"
          color="gray.900"
          _dark={{ color: "white" }}
          noOfLines={2}
          lineHeight="1.3"
        >
          {project.title || "Untitled Project"}
        </Text>
        
        {/* Description */}
        <Text
          fontSize="sm"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          noOfLines={3}
          lineHeight="1.7"
          flex="1"
        >
          {project.description || "No description available"}
        </Text>

        {/* Tech Stack */}
        {project.techs && project.techs.length > 0 && (
          <Box pt={2}>
            <Flex wrap="wrap" gap={2}>
              {project.techs?.slice(0, 5).map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  size="sm"
                  variant="subtle"
                  colorScheme="blue"
                  fontSize="xs"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontWeight="500"
                >
                  {tech}
                </Badge>
              ))}
              {project.techs?.length > 5 && (
                <Badge 
                  size="sm" 
                  variant="subtle" 
                  colorScheme="gray" 
                  fontSize="xs"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontWeight="500"
                >
                  +{project.techs.length - 5} more
                </Badge>
              )}
            </Flex>
          </Box>
        )}

        {/* Action Buttons */}
        <HStack spacing={3} pt={2}>
          {project.projectLink && (
            <Button
              as={Link}
              href={project.projectLink}
              target="_blank"
              size="md"
              leftIcon={<Icon as={isMobile ? AiOutlineDownload : AiOutlineEye} boxSize={5} />}
              colorScheme="blue"
              variant="solid"
              flex={1}
              isExternal
              fontWeight="600"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              {isMobile ? "Download" : "Live Demo"}
            </Button>
          )}
          
          {project.codeLink && (
            <Button
              as={Link}
              href={project.codeLink}
              target="_blank"
              size="md"
              leftIcon={<Icon as={AiFillGithub} boxSize={5} />}
              variant="outline"
              colorScheme="blue"
              flex={1}
              isExternal
              fontWeight="600"
              borderWidth="2px"
              _hover={{
                bg: "blue.50",
                _dark: { bg: "gray.700" },
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
            >
              View Code
            </Button>
          )}
        </HStack>
      </VStack>
    </MotionBox>
  );
};

const FilterButton = ({ label, isActive, onClick, count }) => (
  <Button
    size={"md"}
    variant={isActive ? "solid" : "outline"}
    colorScheme="blue"
    onClick={onClick}
    fontWeight="medium"
    px={{ base: 3, md: 6 }}
    fontSize={{ base: "sm", md: "md" }}
  >
    {label} <Text as="span" ml={2} opacity={0.7}>({count})</Text>
  </Button>
);

const Projects = () => {
  const { work } = useContext(UserContext);
  const [activeFilter, setActiveFilter] = useState("all");

  const { filteredProjects, projectCounts } = useMemo(() => {
    if (!work?.length) return { filteredProjects: [], projectCounts: { all: 0, web: 0, mobile: 0 } };


    const validProjects = work.filter(project => 
      project && project._id && project.title && project.imgUrl
    );

    const mobileProjects = validProjects.filter(project => 
      project.tags?.includes("mobile")
    );
    const webProjects = validProjects.filter(project => 
      !project.tags?.includes("mobile")
    );

    const counts = {
      all: validProjects.length,
      web: webProjects.length,
      mobile: mobileProjects.length
    };

    let filtered;
    switch (activeFilter) {
      case "web":
        filtered = webProjects;
        break;
      case "mobile":
        filtered = mobileProjects;
        break;
      default:
        filtered = validProjects;
    }

    return { filteredProjects: filtered, projectCounts: counts };
  }, [work, activeFilter]);

  if (!work?.length) {
    return (
      <Container maxW="7xl" py={24}>
        <Text textAlign="center" color="gray.500" fontSize="xl">
          No projects available
        </Text>
      </Container>
    );
  }

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
            Portfolio
          </Text>
          
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="800"
            color="gray.900"
            _dark={{ color: "white" }}
            textAlign="center"
            lineHeight="1.2"
          >
            Featured Projects
          </Text>
          
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
            maxW="700px"
            lineHeight="1.7"
          >
            A showcase of my recent work, featuring modern web applications built with cutting-edge technologies
          </Text>
        </VStack>

        {/* Filter Buttons */}
        <Flex justify="center" px={{ base: 4, md: 0 }}>
          <ButtonGroup 
            spacing={2}
            size={{ base: "sm", md: "md" }}
            isAttached={{ base: false, md: false }}
            flexWrap="wrap"
            justifyContent="center"
          >
            <FilterButton
              label="All"
              isActive={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
              count={projectCounts.all}
            />
            <FilterButton
              label="Web"
              isActive={activeFilter === "web"}
              onClick={() => setActiveFilter("web")}
              count={projectCounts.web}
            />
            <FilterButton
              label="Mobile"
              isActive={activeFilter === "mobile"}
              onClick={() => setActiveFilter("mobile")}
              count={projectCounts.mobile}
            />
          </ButtonGroup>
        </Flex>

        {/* Projects Grid */}
       <Box w="full">
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${project._id}-${activeFilter}`}
                project={project}
                index={index}
              />
            ))}
          </SimpleGrid>

          {filteredProjects.length === 0 && (
            <Text
              textAlign="center"
              color="gray.500"
              fontSize="xl"
              py={16}
              fontWeight="500"
            >
              No projects found for this category
            </Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default AppWrap(Projects, "Projects");