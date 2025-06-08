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
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AppWrap } from "@/Wrapper";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";
import { AiOutlineEye, AiFillGithub, AiOutlineDownload } from "react-icons/ai";

const MotionBox = motion(Box);

// Professional, subtle animations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const ProjectCard = ({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  
  const isMobile = project.tags?.includes("mobile");

  // Optimize image URL
  const getImageUrl = () => {
    
    try {
      if (!project.imgUrl) return null;
      return urlFor(project.imgUrl)
        .width(400)
        .height(250)
        .quality(85)
        .format('webp')
        .url();
    } catch (error) {
      console.warn('Error generating image URL:', error);
      return null;
    }
  };

  const imageUrl = getImageUrl();
  
  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      transition="all 0.2s ease-in-out"
      h="auto"
      minH={{ base: "auto", md: "400px" }}
      w="full"
      maxW={{ base: "100%", md: "350px" }}
      mx="auto"
    >
      {/* Image Section */}
      <Box 
        position="relative" 
        w="full" 
        h={{ base: "180px", md: "200px" }} 
        overflow="hidden" 
        bg="gray.100" 
        _dark={{ bg: "gray.700" }}
      >
        {imageUrl ? (
          <>
           <Image
              src={imageUrl}
              alt={project.title || "Project image"}
              w="full"
              h="full"
              objectFit="cover"
              loading="lazy"
              style={{ display: 'block' }}
            />
          </>
        ) : null}

        {/* Fallback when no image or error */}
        {(!imageUrl || imageError) && (
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
            <Text color="gray.500" fontSize="sm" fontWeight="medium">
              {project.title || "Project"}
            </Text>
            <Text color="gray.400" fontSize="xs" mt={1}>
              {isMobile ? "Mobile App" : "Web App"}
            </Text>
          </Box>
        )}
        
        {/* Project type badge */}
        <Badge
          position="absolute"
          top={3}
          right={3}
          colorScheme={isMobile ? "purple" : "blue"}
          variant="solid"
          fontSize="xs"
          px={2}
          py={1}
          borderRadius="full"
        >
          {isMobile ? "MOBILE" : "WEB"}
        </Badge>
      </Box>

      {/* Content Section */}
      <VStack p={{ base: 4, md: 6 }} align="stretch" spacing={4} flex="1">
        <VStack align="stretch" spacing={2}>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
            noOfLines={2}
            lineHeight="tight"
          >
            {project.title || "Untitled Project"}
          </Text>
          
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            noOfLines={3}
            lineHeight="tall"
          >
            {project.description || "No description available"}
          </Text>
        </VStack>

        {/* Tech Stack */}
        {project.techs && project.techs.length > 0 && (
          <Box>
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="gray.500"
              _dark={{ color: "gray.500" }}
              mb={2}
            >
              Tech Stack
            </Text>
            <Flex wrap="wrap" gap={1}>
              {project.techs?.slice(0, 4).map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  size="sm"
                  variant="subtle"
                  colorScheme="gray"
                  fontSize={{ base: "xs", md: "xs" }}
                >
                  {tech}
                </Badge>
              ))}
              {project.techs?.length > 4 && (
                <Badge 
                  size="sm" 
                  variant="subtle" 
                  colorScheme="gray" 
                  fontSize={{ base: "xs", md: "xs" }}
                >
                  +{project.techs.length - 4}
                </Badge>
              )}
            </Flex>
          </Box>
        )}

        {/* Action Buttons */}
        <HStack spacing={{ base: 2, md: 3 }} mt="auto">
          {project.projectLink && (
            <Button
              as={Link}
              href={project.projectLink}
              target="_blank"
              size={{ base: "xs", md: "sm" }}
              leftIcon={<Icon as={isMobile ? AiOutlineDownload : AiOutlineEye} />}
              colorScheme="blue"
              variant="solid"
              flex={1}
              isExternal
              fontSize={{ base: "xs", md: "sm" }}
            >
              {isMobile ? "Download" : "Demo"}
            </Button>
          )}
          
          {project.codeLink && (
            <Button
              as={Link}
              href={project.codeLink}
              target="_blank"
              size={{ base: "xs", md: "sm" }}
              leftIcon={<Icon as={AiFillGithub} />}
              variant="outline"
              flex={1}
              isExternal
              fontSize={{ base: "xs", md: "sm" }}
            >
              Code
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

const FilterButton = ({ label, isActive, onClick, count }) => (
  <Button
    size={{ base: "sm", md: "md" }}
    variant={isActive ? "solid" : "outline"}
    colorScheme="blue"
    onClick={onClick}
    fontWeight="medium"
    px={{ base: 3, md: 6 }}
    fontSize={{ base: "sm", md: "md" }}
  >
    {label} ({count})
  </Button>
);

const Projects = () => {
  const { work } = useContext(UserContext);
  const [activeFilter, setActiveFilter] = useState("all");

  // Memoize filtered projects for performance
  const { filteredProjects, projectCounts } = useMemo(() => {
    if (!work?.length) return { filteredProjects: [], projectCounts: { all: 0, web: 0, mobile: 0 } };

    // Ensure work data is valid
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
      <Container maxW="7xl" py={16}>
        <Text textAlign="center" color="gray.500">
          No projects available
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={{ base: 16, md: 24 }} px={{ base: 4, md: 6 }}>
      <VStack spacing={12} align="stretch">
        {/* Header */}
        <VStack spacing={6}>
          <Text
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
            textAlign="center"
          >
            Featured Projects
          </Text>
          
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
            maxW="600px"
            px={{ base: 4, md: 0 }}
          >
            A collection of projects that showcase my skills and experience
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
        <Box w="full" px={{ base: 4, md: 0 }}>
          <SimpleGrid
            key={activeFilter}
            columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, md: 8 }}
            w="full"
            justifyItems="center"
            alignItems="start"
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
              fontSize="lg"
              py={12}
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