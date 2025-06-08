import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  HStack,
  VStack,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { myLinks } from "../utils/navLinks";

const MotionBox = motion(Box);

const NavLink = ({ href, children, onClick, isActive }) => {
  const color = useColorModeValue("gray.700", "gray.200");
  const activeColor = useColorModeValue("blue.600", "blue.300");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Button
      as="a"
      href={href}
      variant="ghost"
      size="md"
      color={isActive ? activeColor : color}
      fontWeight={isActive ? "bold" : "medium"}
      _hover={{
        bg: hoverBg,
        color: activeColor,
        transform: "translateY(-1px)",
      }}
      transition="all 0.2s"
      onClick={onClick}
      position="relative"
    >
      {children}
      {isActive && (
        <MotionBox
          position="absolute"
          bottom="-2px"
          left="50%"
          w="20px"
          h="2px"
          bg={activeColor}
          borderRadius="full"
          layoutId="activeIndicator"
          initial={false}
          animate={{ x: "-50%" }}
        />
      )}
    </Button>
  );
};

const Header = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const headerBg = useColorModeValue(
    isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
    isScrolled ? "rgba(26, 32, 44, 0.9)" : "rgba(26, 32, 44, 0.7)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = isLargerThan768 ? 80 : 120; // Account for different header heights
      
      // Get all sections and their positions
      const sections = myLinks.map(link => {
        const element = document.getElementById(link.name);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollPosition + rect.top;
          return {
            name: link.name,
            top: elementTop,
            bottom: elementTop + element.offsetHeight
          };
        }
        return null;
      }).filter(Boolean);

      // Find which section is currently in view
      const currentSection = sections.find(section => {
        const sectionStart = section.top - headerHeight - 50; // Extra buffer
        const sectionEnd = section.bottom - headerHeight;
        return scrollPosition >= sectionStart && scrollPosition < sectionEnd;
      });

      if (currentSection && currentSection.name !== activeSection) {
        setActiveSection(currentSection.name);
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [isLargerThan768, activeSection]);

  const handleNavClick = (sectionName) => {
    const element = document.getElementById(sectionName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg={headerBg}
        backdropFilter="blur(10px)"
        borderBottom="1px"
        borderColor={isScrolled ? borderColor : "transparent"}
        transition="all 0.3s ease-in-out"
      >
        <Container maxW="7xl">
          <VStack spacing={0}>
            {/* Main Header Row */}
            <Flex h={16} align="center" justify="space-between" w="full">
              {/* Logo */}
              <Link href="/" passHref>
                <Box cursor="pointer">
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, blue.500, purple.600)"
                    bgClip="text"
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                    transition="transform 0.2s"
                  >
                    AT-Dev
                  </Text>
                </Box>
              </Link>

              {/* Desktop Navigation */}
              {isLargerThan768 && (
                <HStack spacing={1}>
                  {myLinks.map((link) => (
                    <NavLink
                      key={link.id}
                      href={`#${link.name}`}
                      isActive={activeSection === link.name}
                      onClick={() => handleNavClick(link.name)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </HStack>
              )}

              {/* Theme Toggle */}
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                variant="ghost"
                size="md"
                onClick={toggleColorMode}
                _hover={{
                  transform: "rotate(180deg)",
                }}
                transition="transform 0.3s"
              />
            </Flex>

            {/* Mobile Navigation Row */}
            {!isLargerThan768 && (
              <Box w="full" pb={3}>
                <HStack spacing={1} justify="space-between" px={2}>
                  {myLinks.map((link) => (
                    <Button
                      key={link.id}
                      as="a"
                      href={`#${link.name}`}
                      variant="ghost"
                      size="sm"
                      color={activeSection === link.name ? "blue.600" : "gray.700"}
                      _dark={{
                        color: activeSection === link.name ? "blue.300" : "gray.200"
                      }}
                      fontWeight={activeSection === link.name ? "bold" : "medium"}
                      _hover={{
                        color: "blue.600",
                        _dark: { color: "blue.300" }
                      }}
                      onClick={() => handleNavClick(link.name)}
                      position="relative"
                      flex={1}
                      fontSize="sm"
                    >
                      {link.name}
                      {activeSection === link.name && (
                        <MotionBox
                          position="absolute"
                          bottom="0"
                          left="50%"
                          w="20px"
                          h="2px"
                          bg="blue.600"
                          _dark={{ bg: "blue.300" }}
                          borderRadius="full"
                          layoutId="mobileActiveIndicator"
                          initial={false}
                          animate={{ x: "-50%" }}
                        />
                      )}
                    </Button>
                  ))}
                </HStack>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
    </MotionBox>
  );
};

export default Header;