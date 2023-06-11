import React,{useContext} from "react";
import { AppWrap } from "@/Wrapper";
import {
  Flex,
  Text,
  Divider,
  Button,
  chakra,
  shouldForwardProp,
  useMediaQuery
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { UserContext } from "@/pages";
import { urlFor } from "@/pages";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const About = () => {
  const {about} = useContext(UserContext)

  const [mobileView, laptopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 601px)",
  ]);


  
  return (
  <>
{about?.map(data=>{
      const {title,subtitle,description,imgUrl,_id,resume} = data
      
      return <ChakraBox
      display="flex"
      flexDirection={laptopView ? "row":"column"}
        p={laptopView ? "1em 2em":"6em 1em"}
        w="100%"
        h={laptopView ? "600px":"auto"}
        fontFamily="Space Grotesk"
        justifyContent="space-around"
       alignItems={mobileView && "center"}
        key={_id}
        marginTop={laptopView ? "0":"1em"}
       
      >
      <ChakraBox
        bg="rgb(199,163,242,.5)"
        w={laptopView ? "300px":"230px"}
        h={laptopView ? "300px":"auto"}
        display="flex"
        flexDirection="column"
        borderRadius="10px"
        boxShadow="0 0 25px rgba(0,0,0,0.2)"
        p="1em"
        initial={{x:0}}
        whileInView={{
          x: [-30, 0],
        }}
        transition={{
          duration: .5
        }}
      >
        <Text fontWeight="black" fontSize={laptopView ? "1.5em":"1.35em"}>
          {title}
        </Text>
        <Divider />
        <Text fontWeight="black" fontSize={laptopView ? "1.5em":"1.35em"}>
          {subtitle}
        </Text>
        <Divider />
        <Text fontSize="1.331em" marginTop="0.3em">
          {description}
        </Text>
        <a
            href={resume}
            target="_blank"
          passHref>
        <Button marginTop="0.5em" p="1em" w={laptopView ? "99%":"98%"}>
            my resume
        </Button>
        </a>
      </ChakraBox>
      <Flex alignItems="center" justifyContent="center" zIndex="1" marginTop={laptopView ? "0":"2em"} >
        <ChakraBox
        
          initial={{ scale: 1 }}
          whileInView={{ scale:[ 1.2,1] }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: .5 }}
          w={laptopView ? "300px":"230px"}
          h={laptopView ? "300px" : "230px"}
          bg="gray.300"
          borderRadius="70px 30px 150px 100px"
        ></ChakraBox>
        <ChakraBox
          
          position="absolute"
          w={laptopView ? "250px":"200px"}
          h={laptopView ? "250px":"200pxc"}
          borderRadius="50px"
          initial={{ scale: 1, filter: "grayscale(100%)" }}
          whileInView={{ scale: 1.2, filter: "grayscale(20%)" }}
          whileHover={{ scale: 1, filter: "grayscale(100%)" }}
          transition={{ duration: .5 }}
        >
          <img src={urlFor(imgUrl)} alt="user" />
        </ChakraBox>
      </Flex>
      </ChakraBox>
     })}
  </>
    
  );
};

export default AppWrap(About, "About");
