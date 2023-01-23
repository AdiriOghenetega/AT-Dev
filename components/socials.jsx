import React from 'react'
import { AiOutlineTwitter,AiFillGithub,AiFillLinkedin } from "react-icons/ai";
import {Box,Flex,Icon} from "@chakra-ui/react"

const Socials = () => {
  return (
    <Flex direction="column" p="1em 0.3em" height="10em" justifyContent="space-between" alignItems="center" >
    
        <Box bg="rgb(227,209,248)" w="32px" h="32px" borderRadius="50%" textAlign="center" p="6px 1px 1px" boxShadow="0 0 25px rgba(0,0,0,0.2)" >

        <a href="https://twitter.com/adiri_tega?t=tYACVBXxcjFscxCVd4dY5w&s=08" target="blank"><Icon as={AiOutlineTwitter} color="rgb(29,155,240)"   /></a>
            
        </Box>
        <Box bg="rgb(203,213,224)" w="32px" h="32px" borderRadius="50%" textAlign="center" p="6px 1px 1px" boxShadow="0 0 25px rgba(0,0,0,0.2)" >
        <a href="https://github.com/AdiriOghenetega" target="blank"><Icon as={AiFillGithub} color="black"  /></a>
            
        </Box>
        <Box bg="rgb(156, 240, 202)" w="32px" h="32px" borderRadius="50%" textAlign="center" p="6px 1px 1px" boxShadow="0 0 25px rgba(0,0,0,0.2)">
        <a href="https://www.linkedin.com/in/adiri-oghenetega-33459b1a1" target="blank"><Icon as={AiFillLinkedin} color="rgb(10,102,194)"  /></a>
            
        </Box>
    </Flex>
  )
}

export default Socials