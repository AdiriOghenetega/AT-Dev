import React, { useState, useEffect, use } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { urlFor } from "@/pages";
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  chakra,
  shouldForwardProp,
  useMediaQuery,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { AiFillGithub, AiOutlineEye, AiOutlineDownload } from "react-icons/ai";
import { motion, isValidMotionProp, useAnimation } from "framer-motion";
import SlideIn from "@/customComponents/slideIn";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const ProjectsWrap = ({ work, category }) => {
  const [projects, setProjects] = useState(work?.reverse());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mobileFiltered = work?.filter((project) =>
      project.tags?.includes("mobile")
    );
    const webFiltered = work?.filter(
      (project) => !project.tags?.includes("mobile")
    );
    if (category === "web") {
      setProjects(webFiltered);
    } else {
      setProjects(mobileFiltered);
    }
    control.start({
      x: [-10, 0, -10, 0],
      transition: {
        duration: "1",
      },
    });
  }, [category]);

  const hoverColor = useColorModeValue("black", "white");
  const containerColor = useColorModeValue(
    "rgb(195,203,211,.8)",
    "rgba(247,243,252,0.2)"
  );

  const control = useAnimation();

  const [mobileView, laptopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 601px)",
  ]);

  return (
    <ChakraBox
      display="flex"
      flexDirection="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      initial={{ x: 0 }}
      whileInView={{
        x: [-10, 0, -10, 0],
      }}
      transition={{
        duration: "1",
      }}
      animate={control}
    >
      {projects?.length &&
        projects?.map((project) => {
          return (
            <SlideIn direction={"up"} key={project.title}>
              <Box
                bg={containerColor}
                w={"300px"}
                h={"auto"}
                m="1em"
                boxShadow="0 0 25px rgba(0,0,0,0.2)"
                borderRadius="1em"
                position="relative"
                overflow="hidden"
              >
                <Box borderTopRadius="1em" overflow="hidden">
                  <img
                    src={urlFor(project.imgUrl).width(300).height(250).url()}
                    alt="project"
                  />
                </Box>
                <Box p="0 1em 1em">
                  <Box fontWeight="black" textAlign="center" p="2">
                    <Text fontSize={"large"}>{project.title}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="small" textAlign="center" p="2">
                      {project.description}
                    </Text>
                  </Box>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h4>
                        <AccordionButton>
                          <Text
                            as="span"
                            flex="1"
                            textAlign="center"
                            fontSize="small"
                          >
                            Features and Tech Stack
                          </Text>
                          <AccordionIcon />
                        </AccordionButton>
                      </h4>
                      <AccordionPanel pb={4}>
                        {project.features && (
                          <Flex
                            w="100%"
                            p={"1"}
                            alignItems="center"
                            justifyContent="space-around"
                          >
                            <Text w={"30%"} fontSize={"0.7em"}>
                              Features :{" "}
                            </Text>
                            <Box w={"65%"}>
                              {project.features?.map((tech, index) => {
                                return (
                                  <Box
                                    key={index}
                                    fontWeight="black"
                                    fontSize={"0.7em"}
                                    bg="rgb(54,60,71,.2)"
                                    p="1"
                                    borderRadius="0.5em"
                                    my="1"
                                  >
                                    {tech}
                                  </Box>
                                );
                              })}
                            </Box>
                          </Flex>
                        )}
                        <Flex
                          w="100%"
                          p={"1"}
                          alignItems="center"
                          justifyContent="space-around"
                        >
                          <Text w={"32%"} fontSize={"0.7em"}>
                            Tech Stack :{" "}
                          </Text>
                          <Box w={"63%"}>
                            {project.techs?.map((tech, index) => {
                              return (
                                <Box
                                  key={index}
                                  fontWeight="black"
                                  fontSize={"0.7em"}
                                  bg="rgb(54,60,71,.2)"
                                  p="1"
                                  borderRadius="0.5em"
                                  my="1"
                                >
                                  {tech}
                                </Box>
                              );
                            })}
                          </Box>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="space-around"
                    p="2"
                    borderRadius="1em"
                    bg="rgb(54,60,71,.2)"
                    color="blue.400"
                    _hover={{ boxShadow: "0 0 25px rgba(0,0,0,0.2)" }}
                    marginTop="2"
                  >
                    <Tooltip
                      label={
                        project.tags?.includes("mobile")
                          ? "download apk"
                          : "view website"
                      }
                      bg="gray.700"
                      color="white"
                      placement="bottom"
                    >
                      <a href={project.projectLink} target="_blank">
                        <Icon
                          as={
                            project.tags?.includes("mobile")
                              ? AiOutlineDownload
                              : AiOutlineEye
                          }
                          bgColor="transparent"
                          size="25px"
                          marginTop="2"
                          _hover={{
                            color: hoverColor,
                            boxShadow: "0 0 25px rgba(0,0,0,0.2)",
                          }}
                        />
                      </a>
                    </Tooltip>
                    <Tooltip
                      label="view code"
                      bg="gray.700"
                      color="white"
                      placement="bottom"
                    >
                      <a href={project.codeLink} target="_blank">
                        <Icon
                          as={AiFillGithub}
                          bgColor="transparent"
                          size="25px"
                          marginTop="2"
                          _hover={{
                            color: hoverColor,
                            boxShadow: "0 0 25px rgba(0,0,0,0.2)",
                          }}
                        />
                      </a>
                    </Tooltip>
                  </Flex>
                </Box>
              </Box>
            </SlideIn>
          );
        })}
    </ChakraBox>
  );
};

export default ProjectsWrap;
