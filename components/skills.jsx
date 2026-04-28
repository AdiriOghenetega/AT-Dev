import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Container,
  Image,
  Collapse,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AppWrap } from "@/Wrapper";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const getExperienceSortMeta = (yearText = "") => {
  const years = yearText.match(/\d{4}/g)?.map(Number) || [];
  const hasCurrent = /current|present|now/i.test(yearText);

  const startYear = years[0] || 0;
  const endYear = hasCurrent ? 9999 : (years[1] || years[0] || 0);

  return { endYear, startYear };
};

const SkillCard = ({ skill }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.750");

  return (
    <MotionBox
      variants={itemVariants}
      bg={cardBg}
      p={5}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="sm"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "md",
        bg: hoverBg,
      }}
      transition="all 0.2s ease-in-out"
      textAlign="center"
    >
      <VStack spacing={3}>
        <Box
          w="56px"
          h="56px"
          borderRadius="lg"
          overflow="hidden"
          bg="gray.50"
          _dark={{ bg: "gray.700" }}
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={urlFor(skill.icon)?.width(48).height(48).url()}
            alt={`${skill.name} icon`}
            w="full"
            h="full"
            objectFit="contain"
            loading="lazy"
          />
        </Box>
        
        <Text
          fontSize="sm"
          fontWeight="600"
          color="gray.700"
          _dark={{ color: "gray.300" }}
        >
          {skill.name}
        </Text>
      </VStack>
    </MotionBox>
  );
};

const ExperienceCard = ({ experience }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <MotionBox
      variants={itemVariants}
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      _hover={{
        boxShadow: "lg",
      }}
      transition="all 0.2s"
      minW={{ base: "full", md: "600px" }}
    >
      <VStack align="stretch" spacing={0}>
        {experience.works?.map((work, workIndex) => (
          <Box 
            key={work._key} 
            p={6} 
            borderBottomWidth={workIndex < experience.works.length - 1 ? "1px" : 0}
            borderColor={borderColor}
          >
            <Flex 
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "start" }}
              gap={6}
            >
              {/* Year Badge */}
              <Box
                minW={{ base: "full", md: "100px" }}
                bg="blue.50"
                _dark={{ bg: "blue.900" }}
                px={4}
                py={2}
                borderRadius="xl"
                textAlign="center"
              >
                <Text
                  fontSize="md"
                  fontWeight="700"
                  color="blue.600"
                  _dark={{ color: "blue.300" }}
                >
                  {experience.year}
                </Text>
              </Box>

              {/* Content */}
              <VStack align="start" spacing={3} flex={1}>
                <VStack align="start" spacing={1}>
                  <Text
                    fontSize="xl"
                    fontWeight="700"
                    color="gray.900"
                    _dark={{ color: "white" }}
                  >
                    {work.name}
                  </Text>
                  <Text
                    fontSize="md"
                    color="blue.600"
                    _dark={{ color: "blue.400" }}
                    fontWeight="600"
                  >
                    {work.company}
                  </Text>
                </VStack>

                {work.desc && (
                  <Box w="full">
                    <Collapse in={isExpanded} animateOpacity startingHeight={0}>
                      <Text
                        mt={2}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                        lineHeight="1.7"
                      >
                        {work.desc}
                      </Text>
                    </Collapse>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      rightIcon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => setIsExpanded(!isExpanded)}
                      mt={2}
                      fontWeight="600"
                      color="blue.600"
                      _dark={{ color: "blue.400" }}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </Button>
                  </Box>
                )}
              </VStack>
            </Flex>
          </Box>
        ))}
      </VStack>
    </MotionBox>
  );
};

const Skills = () => {
  const { skill, experience } = useContext(UserContext);
  const sortedExperience = [...(experience || [])].sort((a, b) => {
    const aMeta = getExperienceSortMeta(a?.year);
    const bMeta = getExperienceSortMeta(b?.year);

    if (bMeta.endYear !== aMeta.endYear) {
      return bMeta.endYear - aMeta.endYear;
    }

    return bMeta.startYear - aMeta.startYear;
  });

  return (
    <Container maxW="7xl" py={{ base: 8, md: 32 }}>
      <VStack spacing={20} align="stretch">
        {/* Skills Section */}
        <VStack spacing={12} align="stretch">
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
              Technologies
            </Text>
            
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="800"
              color="gray.900"
              _dark={{ color: "white" }}
              textAlign="center"
              lineHeight="1.2"
            >
              Technical Skills
            </Text>
            
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              _dark={{ color: "gray.400" }}
              textAlign="center"
              maxW="700px"
              lineHeight="1.7"
            >
              I work with modern technologies and frameworks to build scalable, performant applications
            </Text>
          </VStack>
          
          {/* Skills Grid */}
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <SimpleGrid
              columns={{ base: 3, sm: 4, md: 5, lg: 6 }}
              spacing={4}
              w="full"
            >
              {skill?.map((skillItem) => (
                <SkillCard
                  key={skillItem._id}
                  skill={skillItem}
                />
              ))}
            </SimpleGrid>
          </MotionBox>
        </VStack>

        {/* Experience Section */}
        <VStack spacing={12} align="stretch">
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
              Career
            </Text>
            
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="800"
              color="gray.900"
              _dark={{ color: "white" }}
              textAlign="center"
              lineHeight="1.2"
            >
              Work Experience
            </Text>
            
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              _dark={{ color: "gray.400" }}
              textAlign="center"
              maxW="700px"
              lineHeight="1.7"
            >
              My professional journey building impactful applications
            </Text>
          </VStack>
          
          {/* Experience Timeline */}
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <VStack spacing={6} w="full" maxW="900px" mx="auto">
              {sortedExperience.map((exp) => (
                <ExperienceCard
                  key={exp._id}
                  experience={exp}
                />
              ))}
            </VStack>
          </MotionBox>
        </VStack>
      </VStack>
    </Container>
  );
};

export default AppWrap(Skills, "Skills");
