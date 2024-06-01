import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { AiFillGithub, AiOutlineEye,AiOutlineDownload } from "react-icons/ai";
import { motion, isValidMotionProp, useAnimation } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Carousel = ({ work }) => {
  const projects = work?.reverse()
  console.log(projects)
  const [currentIndex, setCurrentIndex] = useState(0);

  const hoverColor = useColorModeValue("black", "white");
  const containerColor = useColorModeValue(
    "rgb(195,203,211,.8)",
    "rgba(247,243,252,0.2)"
  );

  const handleClick = (index) => {
    setCurrentIndex(index);
    control.start({
      x: [-10, 0, -10, 0],
      transition: {
        duration: "1",
      },
    });
  };

  const control = useAnimation();

  const [mobileView, laptopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 601px)",
  ]);


  return (
    <ChakraBox
      display="flex"
      flexDirection="column"
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
      {projects?.length && (
        <Box
          bg={containerColor}
          w={laptopView ? "400px" : "250px"}
          h={laptopView ? "450px" : "auto"}
          m="1em"
          boxShadow="0 0 25px rgba(0,0,0,0.2)"
          borderRadius="1em"
          position="relative"
          overflow="hidden"
        >
          <Box borderRadius="1em" overflow="hidden">
            <img
              src={urlFor(projects[currentIndex].imgUrl)
                .width(laptopView ? 400 : 260)
                .height(250)
                .url()}
              alt="project"
            />
          </Box>
          <Box p="0 1em 1em">
            <Box fontWeight="black" textAlign="center" p="2">
              <Text fontSize={"large"}>{projects[currentIndex].title}</Text>
            </Box>

            <Box>
              <Text fontSize="small" textAlign="center" p="2">
                {projects[currentIndex].description}
              </Text>
            </Box>
            <Flex
              w="100%"
              p={laptopView ? "2" : "1"}
              alignItems="center"
              justifyContent="space-around"
            >
              {projects[currentIndex].techs?.map((tech, index) => {
                return (
                  <Box
                    key={index}
                    fontWeight="black"
                    fontSize={mobileView && "0.6em"}
                  >
                    {tech}
                  </Box>
                );
              })}
            </Flex>
            <Flex
              w="100%"
              alignItems="center"
              justifyContent="space-around"
              p="2"
              borderRadius="1em"
              bg="rgb(54,60,71,.2)"
              color="blue.400"
              _hover={{ boxShadow: "0 0 25px rgba(0,0,0,0.2)" }}
            >
              <Tooltip
                label={projects[currentIndex].tags?.includes("mobile") ? "download apk":"view website"}
                bg="gray.700"
                color="white"
                placement="bottom"
              >
                <a href={projects[currentIndex].projectLink} target="_blank">
                  <Icon
                    as={projects[currentIndex].tags?.includes("mobile") ? AiOutlineDownload:AiOutlineEye}
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
                <a href={projects[currentIndex].codeLink} target="_blank">
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
      )}
      <Flex w="100px" justifyContent="space-between">
        <Flex
          w="30px"
          h="30px"
          cursor="pointer"
          borderRadius="50%"
          bg="rgb(195,203,211,.2)"
          alignItems="center"
          justifyContent="center"
          color="blue.400"
          _hover={{ boxShadow: "0 0 25px rgba(0,0,0,0.2)" }}
          onClick={() =>
            handleClick(currentIndex === 0 ? projects.length - 1 : currentIndex - 1)
          }
        >
          <Icon
            as={HiChevronLeft}
            _hover={{
              color: hoverColor,
              boxShadow: "0 0 25px rgba(0,0,0,0.2)",
            }}
          />
        </Flex>

        <Flex
          w="30px"
          h="30px"
          cursor="pointer"
          borderRadius="50%"
          bg="rgb(195,203,211,.2)"
          alignItems="center"
          justifyContent="center"
          color="blue.400"
          _hover={{ boxShadow: "0 0 25px rgba(0,0,0,0.2)" }}
          onClick={() =>
            handleClick(currentIndex === projects.length - 1 ? 0 : currentIndex + 1)
          }
        >
          <Icon
            as={HiChevronRight}
            _hover={{
              color: hoverColor,
              boxShadow: "0 0 25px rgba(0,0,0,0.2)",
            }}
          />
        </Flex>
      </Flex>
    </ChakraBox>
  );
};

export default Carousel;
