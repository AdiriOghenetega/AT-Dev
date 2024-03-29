import React, { useContext } from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { AppWrap } from "@/Wrapper";
import { UserContext } from "@/pages";
import Carousel from "@/components/carousel";

const Projects = () => {
  const { work } = useContext(UserContext);

  const [mobileView, laptopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 601px)",
  ]);

  return (
    <Flex
      w="100%"
      h={laptopView ? "500px" : "auto"}
      direction="column"
      fontFamily="Space Grotesk"
      alignItems="center"
      justifyContent="space-between"
      fontWeight="black"
    >
      <Box>
        <Text marginBottom={"0.5em"} fontSize={laptopView ? "2em" : "1.5em"}>Projects</Text>
      </Box>
      <Flex
        w="100%"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Carousel work={work} />
      </Flex>
    </Flex>
  );
};

export default AppWrap(Projects, "Projects");
