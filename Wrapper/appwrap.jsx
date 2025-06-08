import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

// Optimized social links component
const SocialLinks = React.lazy(() => import("@/components/socials"));

// Optimized navigation dots component  
const NavigationDots = React.lazy(() => import("@/components/navdots"));

const AppWrap = (Component, idName, className = "") =>
  function HOC(props) {
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)", {
      ssr: true,
      fallback: false,
    });

    return (
      <Box
        as="section"
        id={idName}
        position="relative"
        w="full"
        minH={{ base: "auto", md: "100vh" }}
        display="flex"
        alignItems="center"
        className={className}
        // Add top padding to account for fixed header
        pt={{ 
          base: "120px", // More padding on mobile due to two-row header
          md: "80px"     // Less padding on desktop due to single-row header
        }}
      >
        {/* Social Links - Only show on larger screens */}
        {isLargerThan768 && (
          <Box
            position="fixed"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={10}
          >
            <React.Suspense fallback={null}>
              <SocialLinks />
            </React.Suspense>
          </Box>
        )}

        {/* Main Content */}
        <Box w="full" position="relative">
          <Component {...props} />
        </Box>
      </Box>
    );
  };

export default AppWrap;