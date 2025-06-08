import React, { useState } from 'react';
import { Box, Image, Skeleton } from '@chakra-ui/react';

const LazyImage = ({ 
  src, 
  alt, 
  fallback, 
  skeletonProps = {},
  ...imageProps 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
  });

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <Box ref={targetRef} {...imageProps}>
      {hasIntersected && (
        <>
          <Skeleton 
            isLoaded={isLoaded} 
            borderRadius="md"
            {...skeletonProps}
          >
            {hasError ? (
              fallback || (
                <Box
                  w="full"
                  h="full"
                  bg="gray.200"
                  _dark={{ bg: "gray.700" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="md"
                >
                  <Text fontSize="sm" color="gray.500">
                    Failed to load image
                  </Text>
                </Box>
              )
            ) : (
              <Image
                src={src}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                {...imageProps}
              />
            )}
          </Skeleton>
        </>
      )}
    </Box>
  );
};

export default LazyImage;