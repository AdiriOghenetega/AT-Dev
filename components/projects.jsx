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
import { motion, AnimatePresence } from "framer-motion";
import { AppWrap } from "@/Wrapper";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";
import { AiOutlineEye, AiFillGithub, AiOutlineDownload } from "react-icons/ai";

const MotionBox = motion(Box);

// Professional, subtle animations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ProjectCard = ({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const isMobile = project.tags?.includes("mobile");

  return (
    <MotionBox
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, delay: index * 0.1 }}
      bg={cardBg}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      h="full"
    >
      {/* Image Section */}
      <Box position="relative" w="full" h="200px" overflow="hidden">
        <Skeleton isLoaded={imageLoaded} w="full" h="full">
          <Image
            src={urlFor(project.imgUrl)?.width(400).height(200).url()}
            alt={project.title}
            w="full"
            h="full"
            objectFit="cover"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </Skeleton>

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
          {isMobile ? "Mobile" : "Web"}
        </Badge>
      </Box>

      {/* Content Section */}
      <VStack p={6} align="stretch" spacing={4} flex="1">
        <VStack align="stretch" spacing={2}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
            noOfLines={2}
          >
            {project.title}
          </Text>

          <Text
            fontSize="sm"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            noOfLines={3}
            lineHeight="tall"
          >
            {project.description}
          </Text>
        </VStack>

        {/* Tech Stack */}
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
            {project.techs?.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                size="sm"
                variant="subtle"
                colorScheme="gray"
                fontSize="xs"
              >
                {tech}
              </Badge>
            ))}
            {project.techs?.length > 4 && (
              <Badge
                size="sm"
                variant="subtle"
                colorScheme="gray"
                fontSize="xs"
              >
                +{project.techs.length - 4}
              </Badge>
            )}
          </Flex>
        </Box>

        {/* Action Buttons */}
        <HStack spacing={3} mt="auto">
          <Button
            as={Link}
            href={project.projectLink}
            target="_blank"
            size="sm"
            leftIcon={<Icon as={isMobile ? AiOutlineDownload : AiOutlineEye} />}
            colorScheme="blue"
            variant="solid"
            flex={1}
            isExternal
          >
            {isMobile ? "Download" : "Live Demo"}
          </Button>

          <Button
            as={Link}
            href={project.codeLink}
            target="_blank"
            size="sm"
            leftIcon={<Icon as={AiFillGithub} />}
            variant="outline"
            flex={1}
            isExternal
          >
            Code
          </Button>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

const FilterButton = ({ label, isActive, onClick, count }) => (
  <Button
    size="md"
    variant={isActive ? "solid" : "outline"}
    colorScheme="blue"
    onClick={onClick}
    fontWeight="medium"
    px={6}
  >
    {label} ({count})
  </Button>
);

const Projects = () => {
  const { work } = useContext(UserContext);
  const [activeFilter, setActiveFilter] = useState("all");

  // Memoize filtered projects for performance
  const { filteredProjects, projectCounts } = useMemo(() => {
    if (!work?.length)
      return {
        filteredProjects: [],
        projectCounts: { all: 0, web: 0, mobile: 0 },
      };

    const mobileProjects = work.filter((project) =>
      project.tags?.includes("mobile")
    );
    const webProjects = work.filter(
      (project) => !project.tags?.includes("mobile")
    );

    const counts = {
      all: work.length,
      web: webProjects.length,
      mobile: mobileProjects.length,
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
        filtered = work;
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
    <Container maxW="7xl" py={{ base: 16, md: 24 }}>
      <VStack spacing={12} align="stretch">
        {/* Header */}
        <VStack spacing={6}>
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
            textAlign="center"
          >
            Featured Projects
          </Text>

          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
            maxW="600px"
          >
            A collection of projects that showcase my skills and experience
          </Text>
        </VStack>

        {/* Filter Buttons */}
        <Flex justify="center">
          <ButtonGroup spacing={2}>
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
        <AnimatePresence mode="wait">
          <SimpleGrid
            key={activeFilter}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            minChildWidth="300px"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${project._id}-${activeFilter}`}
                project={project}
                index={index}
              />
            ))}
          </SimpleGrid>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <Text textAlign="center" color="gray.500" fontSize="lg" py={12}>
            No projects found for this category
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default AppWrap(Projects, "Projects");
