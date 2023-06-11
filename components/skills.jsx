import React, { useContext } from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useMediaQuery,
} from "@chakra-ui/react";
import { AppWrap } from "@/Wrapper";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";

const Skills = () => {
  const { skill, experience } = useContext(UserContext);
  const [mobileView, laptopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 601px)",
  ]);
  return (
    <Flex
      w="100%"
      h={laptopView ? "550px" : "auto"}
      direction="column"
      fontFamily="Space Grotesk"
      alignItems="center"
      marginBottom={"2em"}
      fontWeight="black"
      marginTop={mobileView && "2em"}
    >
      <Text fontSize={laptopView ? "2em" : "1.5em"}>Skills & Experience</Text>
      <Flex w="100%" marginTop="2em" direction={laptopView ? "row" : "column"}>
        <Flex
          flexWrap="wrap"
          w={laptopView ? "50%" : "100%"}
          p={laptopView ? "1em 5em" : "1em"}
          alignItems="flex-end"
          justifyContent="center"
        >
          {skill?.map((data) => {
            const { icon, bgColor, name, _id } = data;
            return (
              <Flex
                key={_id}
                direction="column"
                m="2"
                alignItems="center"
                justifyContent="center"
                marginTop="1em"
                
              >
                <Box
                  bg={bgColor}
                  w="60px"
                  h="60px"
                  borderRadius="8px"
                  boxShadow="0 0 25px rgba(0,0,0,0.2)"
                  p="2"
                >
                  <img src={urlFor(icon)} alt="icons" />
                </Box>
                <Box>
                  <Text>{name}</Text>
                </Box>
              </Flex>
            );
          })}
        </Flex>
        <Divider orientation={laptopView ? "vertical" : "horizontal"} />
        <Flex
          w={laptopView ? "50%" : "100%"}
          direction="column"
          p={laptopView ? "2em 1em" : "2em 0.5em"}
        >
          {experience?.map((data) => {
            const { year, works, _id } = data;
            return (
              <Flex
                key={_id}
                alignItems="flex-start"
                justifyContent="space-between"
                w="100%"
                marginBottom="0.5em"
              >
                <Box w="20%" color="rgb(49,59,172)">
                  <Text fontWeight="black">{year}</Text>
                </Box>
                <Box w="70%">
                  {works?.map((item) => {
                    const { company, desc, name, _key } = item;
                    return (
                      <Flex key={_key} direction="column">
                        <Box>
                          <Text fontWeight="black">{name}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="black" marginTop="0.9em">
                            {company}
                          </Text>
                        </Box>
                        <Box
                          textAlign="center"
                          fontSize="0.7em"
                          w="70%"
                          marginTop="0.9em"
                        >
                          <Accordion allowToggle>
                            <AccordionItem>
                              <h4>
                                <AccordionButton>
                                  <Box as="span" flex="1" textAlign="left">
                                    more about this
                                  </Box>
                                  <AccordionIcon />
                                </AccordionButton>
                              </h4>
                              <AccordionPanel pb={4}>{desc}</AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        </Box>
                      </Flex>
                    );
                  })}
                </Box>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppWrap(Skills, "Skills");
