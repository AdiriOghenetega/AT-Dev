import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  Button,
  useMediaQuery,
  useColorModeValue,
} from "@chakra-ui/react";
import { AppWrap } from "@/Wrapper";
import Image from "next/image";
import emailjs from "@emailjs/browser";

function Contact() {
  const containerColor = useColorModeValue(
    "rgb(195,203,211,.8)",
    "rgba(247,243,252,0.2)"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { name, email, message } = formData;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const serviceID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
  const publicApi = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.sendForm(serviceID, templateID, form.current, publicApi).then(
      (result) => {
        console.log(result.text);
        setLoading(false);
        setSubmitted(true);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  const [mobileView, laptopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 601px)",
  ]);

  return (
    <Flex
      w="100%"
      h={"auto"}
      direction="column"
      fontFamily="Space Grotesk"
      alignItems="center"
      justifyContent="center"
      fontWeight="black"
    >
      <Text fontSize={laptopView ? "2em" : "1.5em"}>Contact Me</Text>
      <Flex
        w={laptopView ? "500px":"auto"}
        h={laptopView ? "auto" : "10em"}
        alignItems="center"
        justifyContent="space-between"
        marginTop="2em"
        direction={laptopView ? "row" : "column"}
      >
        <Flex
          w="220px"
          alignItems="center"
          justifyContent="space-between"
          bg={containerColor}
          p="1em"
          borderRadius="0.5em"
          boxShadow="0 0 25px rgba(0,0,0,0.2)"
        >
          <Box w="40px" h="40px" position="relative">
            <Image
              src="/email.png"
              alt="email"
              fill
              sizes="(max-width:345px) 20px,(max-width:600px) 30px,(max-width:1023px) 40px,1000px"
            />
          </Box>
          <Box fontSize="13px">
            <a href="mailto:adiritega@gmail.com">adiritega@gmail.com</a>
          </Box>
        </Flex>
        <Flex
          w="215px"
          alignItems="center"
          justifyContent="space-between"
          bg={containerColor}
          p="1em"
          borderRadius="0.5em"
          boxShadow="0 0 25px rgba(0,0,0,0.2)"
        >
          <Box w="40px" h="40px" position="relative">
            <Image
              src="/mobile.png"
              alt="mobile"
              fill
              sizes="(max-width:345px) 20px,(max-width:600px) 30px,(max-width:1023px) 40px,1000px"
            />
          </Box>
          <Box fontSize="13px">
            <a href="tel:+2348142604385">+234(814) 260-4385</a>
          </Box>
        </Flex>
      </Flex>
      {/* {submitted ? (
        <Box p="2em">
          <Text fontSize={laptopView ? "1.5em" : "1em"}>
            Thanks for contacting me, will get back to you shortly
          </Text>
        </Box>
      ) : (
        <form ref={form} style={{ width: laptopView ? "500px" : "90%" }}>
          <Flex
            direction="column"
            w="100%"
            h="280px"
            alignItems="center"
            justifyContent="space-between"
            marginTop="2em"
          >
            <Input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            <Textarea
              placeholder="message"
              value={message}
              name="message"
              onChange={handleChange}
            />
            <Button onClick={sendEmail}>
              {loading ? "Submitting" : "Send Message"}
            </Button>
          </Flex>
        </form>
      )} */}
    </Flex>
  );
}

export default AppWrap(Contact, "Contact");
