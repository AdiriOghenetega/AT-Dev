import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Spinner,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AppWrap } from "@/Wrapper";
import { FaEye, FaExternalLinkAlt } from "react-icons/fa";

const MotionBox = motion(Box);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ArticleCard = ({ article }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.750");

  return (
    <MotionBox
      variants={cardVariants}
      bg={cardBg}
      p={8}
      borderRadius="2xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
        bg: hoverBg,
        borderColor: "blue.500",
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      h="full"
      cursor="pointer"
      onClick={() => window.open(article.url, "_blank")}
    >
      <VStack align="start" spacing={5} h="full">
        {/* Title */}
        <Text
          fontSize="xl"
          fontWeight="700"
          color="gray.900"
          _dark={{ color: "white" }}
          lineHeight="1.3"
        >
          {article.title}
        </Text>

        {/* Meta Info */}
        <HStack spacing={4} flexWrap="wrap">
          {article.language && (
            <Badge colorScheme="purple" fontSize="xs">
              {article.language}
            </Badge>
          )}
        </HStack>

        {/* Stats */}
        <HStack spacing={6} mt="auto" pt={4}>
          <HStack spacing={2}>
            <Icon as={FaEye} color="green.500" />
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              {article.views}
            </Text>
          </HStack>
        </HStack>

        {/* Read More Link */}
        <HStack
          spacing={2}
          color="blue.600"
          _dark={{ color: "blue.400" }}
          fontSize="sm"
          fontWeight="600"
        >
          <Text>Read Article</Text>
          <Icon as={FaExternalLinkAlt} w={3} h={3} />
        </HStack>
      </VStack>
    </MotionBox>
  );
};

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const articlesData = [
          {
            id: 1,
            title:
              "Building Robust Offline Functionality in React Native: A Complete Guide",
            published: "Oct 22",
            language: "English",
            likes: 4,
            comments: 0,
            views: 121,
            url: "https://dev.to/oghenetega_adiri/building-robust-offline-functionality-in-react-native-a-complete-guide-4174",
          },
          {
            id: 2,
            title: "Converting Your Website to a PWA: A Comprehensive Guide",
            published: "May 18",
            language: "English",
            likes: 7,
            comments: 4,
            views: 205,
            url: "https://dev.to/oghenetega_adiri/converting-your-website-to-a-pwa-a-comprehensive-guide-23ge",
          },
          {
            id: 3,
            title: "IndexedDB vs localStorage: When to Use Which?",
            published: "May 11",
            language: "English",
            likes: 1,
            comments: 0,
            views: 107,
            url: "https://dev.to/oghenetega_adiri/indexeddb-vs-localstorage-when-to-use-which-2blf",
          },
          {
            id: 4,
            title:
              "Real-Time Private Channel Notifications in Vue 3 with Laravel Echo and Pusher",
            published: "May 4",
            language: "English",
            likes: 5,
            comments: 0,
            views: 516,
            url: "https://dev.to/oghenetega_adiri/real-time-notifications-in-vue-3-with-laravel-echo-and-pusher-5bb9",
          },
          {
            id: 5,
            title:
              "Integrating AdMob in React Native Expo: A Comprehensive Developer's Guide",
            published: "Apr 6",
            language: "English",
            likes: 6,
            comments: 0,
            views: 2263,
            url: "https://dev.to/oghenetega_adiri/integrating-admob-in-react-native-expo-a-comprehensive-developers-guide-35ij",
          },
        ];

        setArticles(articlesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container maxW="7xl" py={{ base: 8, md: 32 }}>
      <VStack spacing={16} align="stretch">
        {/* Header */}
        <VStack spacing={6}>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.600"
            _dark={{ color: "blue.400" }}
            fontWeight="600"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            Blog
          </Text>

          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="800"
            color="gray.900"
            _dark={{ color: "white" }}
            textAlign="center"
            lineHeight="1.2"
          >
            Recent Articles
          </Text>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            textAlign="center"
            maxW="700px"
            lineHeight="1.7"
          >
            Sharing knowledge and insights about web development, mobile apps,
            and modern technologies
          </Text>
        </VStack>

        {/* Articles Grid */}
        {loading ? (
          <Box textAlign="center" py={20}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
          </Box>
        ) : (
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              w="full"
            >
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </SimpleGrid>
          </MotionBox>
        )}
      </VStack>
    </Container>
  );
};

export default AppWrap(Articles, "Articles");
