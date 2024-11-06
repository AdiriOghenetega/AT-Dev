import React from "react";
import {
  Flex,
  Text,
  Divider,
  Button,
  chakra,
  shouldForwardProp,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const SlideIn = ({ direction, children, customStyle }) => {
  const [mobileView, laptopView] = useMediaQuery([
    "(max-width: 600px)",
    "(min-width: 601px)",
  ]);

  let animate;
  switch (direction) {
    case "left":
      animate = {
        x: [-100, 0],
      };
      break;
    case "right":
      animate = { x: [100, 0] };
      break;
    case "up":
      animate = { y: [-100, 0] };
      break;
    case "down":
      animate = { y: [100, 0] };
  }

  return (
    <ChakraBox
      initial={{ x: 0 }}
      whileInView={animate}
      transition={{
        duration: 0.5,
      }}
    >
      {children}
    </ChakraBox>
  );
};

export default SlideIn;
