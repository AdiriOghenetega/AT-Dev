import React, { useContext, useState } from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { AppWrap } from "@/Wrapper";
import { UserContext } from "@/pages";
import ProjectsWrap from "./projectsWrap";
import SlideIn from "@/customComponents/slideIn";

const Projects = () => {
  const { work } = useContext(UserContext);

  const [category, setCategory] = useState("mobile");

  const [mobileView, laptopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 601px)",
  ]);

  const handleClick = (option) => {
    setCategory(option);
  };

  return (
    <Flex
      w="100%"
      h={"auto"}
      direction="column"
      fontFamily="Space Grotesk"
      alignItems="center"
      justifyContent="space-between"
      fontWeight="black"
      position={"relative"}
    >
      <Text fontSize={laptopView ? "2em" : "1.5em"} position={"relative"}>
        <SlideIn direction={"left"}>Projects</SlideIn>
      </Text>
      <Box
        w="100%"
        h="auto"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          justifyContent={mobileView ? "center" : "flex-end"}
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginBottom="1em"
        >
          <Flex border={"1px"}>
            <Text
              cursor={"pointer"}
              px="1em"
              py="0.5em"
              backgroundColor={category === "web" ? "rgb(1,22,39)" : "white"}
              color={category === "web" ? "white" : "rgb(1,22,39)"}
              onClick={() => handleClick("web")}
            >
              web
            </Text>
            <Text
              cursor={"pointer"}
              px="1em"
              py="0.5em"
              backgroundColor={category === "mobile" ? "rgb(1,22,39)" : "white"}
              color={category === "mobile" ? "white" : "rgb(1,22,39)"}
              onClick={() => handleClick("mobile")}
            >
              mobile
            </Text>
          </Flex>
        </Box>
        <ProjectsWrap work={work} category={category} />
      </Box>
    </Flex>
  );
};

export default AppWrap(Projects, "Projects");
