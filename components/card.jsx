import React from "react"
import {Box,Flex,Icon,Text,useColorModeValue} from "@chakra-ui/react"
import { AiFillGithub, AiOutlineEye } from "react-icons/ai";
import { urlFor } from "@/pages";

 const Card = ({work}) => {
    
const {title,_id,imgUrl,codeLink,projectLink,description,techs} = work

const hoverColor=useColorModeValue("black","white")

    return (
        <Box
               
                w="300px"
                h="400px"
                m="2em"
                p="1em"
                borderRadius="1em"
                position="relative"
                bg="rgba(247,243,252,0.2)"
                boxShadow="0 0 25px rgba(0,0,0,0.2)"
                
              >
                  <Box >
                    <img src={urlFor(imgUrl).width(300).height(200).url()} alt="project"  />
                  </Box>
                <Box>
                  <Box fontWeight="black" textAlign="center" p="2">
                    <Text>{title}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="1em" textAlign="center" p="2">{description}</Text>
                  </Box>
                  <Flex w="100%" p="2" alignItems="center" justifyContent="space-around">
                    {techs?.map((tech,index)=>{
                      return <Box key={index} fontWeight="black" color="rgb(156,240,202)">{tech}</Box>
                    })}
                  </Flex>
                  <Flex w="100%"  alignItems="center" justifyContent="space-around" p="2" borderRadius="1em" bg="rgb(195,203,211,.2)" color="blue.400" _hover={{boxShadow:"0 0 25px rgba(0,0,0,0.2)"}}>
                    <a href={projectLink} target="blank"><Icon as={AiOutlineEye} bgColor="transparent"  _hover={{color:hoverColor,boxShadow:"0 0 25px rgba(0,0,0,0.2)"}} /></a>
                    <a href={codeLink} target="blank"><Icon as={AiFillGithub} bgColor="transparent"  _hover={{color:hoverColor,boxShadow:"0 0 25px rgba(0,0,0,0.2)"}} /></a>
                  </Flex>
                </Box>
              </Box> 
    )
}
export default Card
