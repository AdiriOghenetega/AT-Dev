import React,{createContext} from 'react'
import {Flex} from '@chakra-ui/react'
import About from '@/components/about'
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const UserContext = createContext();

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  dataset: "production",
  apiVersion: "2023-01-19",
  useCdn: false,
});


const builder = imageUrlBuilder(client)

export const urlFor = (source)=> builder.image(source)

const Home = ({about,skill,experience,work}) => {

  
  
  return (
    <UserContext.Provider value={{about: about, skill:skill,experience:experience,work:work}}>
    <Flex direction="column" bgImage="url('/longAnimated.svg')" >
    <About  />
    <Skills  />
    <Projects />
    <Contact />
    </Flex>
    </UserContext.Provider>
  )
}

export default Home


export async function getStaticProps() {
 
  const abouts = await client.fetch(`*[_type == "abouts"]`);
  const skills = await client.fetch(`*[_type == "skills"]`);
  const experiences = await client.fetch(`*[_type == "experiences"]`);
  const works = await client.fetch(`*[_type == "works"]`);
  

  return {
    props: {
      about: abouts,
      skill: skills,
      experience: experiences,
      work:works,
    }
  };
}