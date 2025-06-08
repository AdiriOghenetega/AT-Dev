import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Container,
  Divider,
  Image,
  Collapse,
  Button,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AppWrap } from "@/Wrapper";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

// Subtle animations for professional feel
const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const SkillCard = ({ skill, index }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <MotionBox
      variants={fadeInUp}
      custom={index}
      bg={cardBg}
      p={6}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      transition="all 0.2s ease-in-out"
      textAlign="center"
    >
      <VStack spacing={4}>
        <Box
          w="60px"
          h="60px"
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
          fontWeight="medium"
          color="gray.700"
          _dark={{ color: "gray.300" }}
        >
          {skill.name}
        </Text>
      </VStack>
    </MotionBox>
  );
};

const ExperienceCard = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <MotionBox
      variants={fadeInUp}
      custom={index}
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
    >
      <VStack align="stretch" spacing={0}>
        {experience.works?.map((work, workIndex) => (
          <Box key={work._key} p={6} borderBottomWidth={workIndex < experience.works.length - 1 ? "1px" : 0}>
            <HStack align="start" spacing={6}>
              {/* Year */}
              <Box
                minW="80px"
                bg="blue.50"
                _dark={{ bg: "blue.900" }}
                px={3}
                py={2}
                borderRadius="lg"
                textAlign="center"
              >
                <Text
                  fontSize="sm"
                  fontWeight="bold"
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
                    fontSize="lg"
                    fontWeight="bold"
                    color="gray.900"
                    _dark={{ color: "white" }}
                  >
                    {work.name}
                  </Text>
                  <Text
                    fontSize="md"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                    fontWeight="medium"
                  >
                    {work.company}
                  </Text>
                </VStack>

                {work.desc && (
                  <Box w="full">
                    <Button
                      size="sm"
                      variant="ghost"
                      rightIcon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => setIsExpanded(!isExpanded)}
                      p={0}
                      h="auto"
                      fontWeight="medium"
                      color="blue.600"
                      _dark={{ color: "blue.300" }}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </Button>
                    
                    <Collapse in={isExpanded} animateOpacity>
                      <Text
                        mt={3}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                        lineHeight="tall"
                      >
                        {work.desc}
                      </Text>
                    </Collapse>
                  </Box>
                )}
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </MotionBox>
  );
};

const Skills = () => {
  const { skill, experience } = useContext(UserContext);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Container maxW="7xl" py={{ base: 16, md: 24 }}>
      <VStack spacing={16} align="stretch">
        {/* Header */}
        <VStack spacing={6}>
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "white" }}
            textAlign="center"
          >
            Skills & Experience
          </Text>
          
          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
            maxW="600px"
          >
            Technologies I work with and my professional journey
          </Text>
        </VStack>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={16}
          align="stretch"
        >
          {/* Skills Section */}
          <VStack spacing={8} flex={1}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="gray.900"
              _dark={{ color: "white" }}
              textAlign="center"
            >
              Technical Skills
            </Text>
            
            <MotionBox
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              w="full"
            >
              <SimpleGrid
                columns={{ base: 3, md: 4, lg: 3, xl: 4 }}
                spacing={4}
                w="full"
              >
                {skill?.map((skillItem, index) => (
                  <SkillCard
                    key={skillItem._id}
                    skill={skillItem}
                    index={index}
                  />
                ))}
              </SimpleGrid>
            </MotionBox>
          </VStack>

          {/* Divider */}
          <Divider
            orientation={isLargerThan768 ? "vertical" : "horizontal"}
            borderColor="gray.300"
            _dark={{ borderColor: "gray.600" }}
          />

          {/* Experience Section */}
          <VStack spacing={8} flex={1}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="gray.900"
              _dark={{ color: "white" }}
              textAlign="center"
            >
              Work Experience
            </Text>
            
            <MotionBox
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              w="full"
            >
              <VStack spacing={6} w="full">
                {experience?.map((exp, index) => (
                  <ExperienceCard
                    key={exp._id}
                    experience={exp}
                    index={index}
                  />
                ))}
              </VStack>
            </MotionBox>
          </VStack>
        </Flex>
      </VStack>
    </Container>
  );
};

export default AppWrap(Skills, "Skills");