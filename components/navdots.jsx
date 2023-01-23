import React,{useState} from 'react'
import {myLinks} from "../utils/navLinks"
import {Flex,Box,useColorModeValue} from "@chakra-ui/react"

const NavDots = ({active}) => {
    
  const setBg = useColorModeValue("black","white")

  return (
    <Flex h="80px" direction="column" alignItems="center" justifyContent="space-between">
    {myLinks?.map((linked) => (
        <a href={`#${linked.name}`} key={linked.id}>
         
        <Box
        
          bg={active === linked.name ? linked.bg:setBg}
          w="9px"
          h="9px"
          borderRadius="50%"
         
        >
        </Box></a>
        
    ))}
  </Flex>
  )
}

export default NavDots