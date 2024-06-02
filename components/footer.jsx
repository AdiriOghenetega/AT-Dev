import React from 'react'
import {Box,Text} from "@chakra-ui/react"

const Footer = () => {
  return (
    <Box 
    color="rgb(52,68,83)" p="1em"
    bg="rgb(239,232,250,.5)"
    w="100%"
    backdropFilter="blur(1px)"
    zIndex="2"
    textAlign="center"
    marginTop="2em"
   >
    <Text fontSize="10px">&copy; Adiri Oghenetega</Text>
    <Text fontSize="10px">Built with NextJs,Chakra UI,Framer Motion,Sanity.io & ❤️</Text>
   </Box>
  )
}

export default Footer