import React from "react";
import { Flex, Box, useMediaQuery } from "@chakra-ui/react";
import Socials from "@/components/socials";
import NavDots from "@/components/navdots";

const AppWrap = (Component, idName) =>
  function HOC() {
    const [mobileView, laptopView] = useMediaQuery([
      "(max-width: 600px)",
      "(min-width: 601px)",
    ]);

    return (
      <Flex
        id={idName}
        alignItems="flex-end"
        justifyContent="space-between"
        w="100%"
        h={laptopView ? "650px" : "auto"}
      >
        <Box w={laptopView ? "5%" : "10%"}>
          <Socials />
        </Box>
        <Box w={laptopView ? "90%" : "85%"}>
          <Component />
        </Box>
        <Box w="5%">
          <NavDots active={idName} />
        </Box>
      </Flex>
    );
  };

export default AppWrap;
