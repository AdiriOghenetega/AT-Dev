import "@/styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import theme from "../utils/theme";




export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  

  return (
    <ChakraProvider theme={theme}>
      <NextNProgress />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Head>
        <title>AT-dev2.0</title>
        <meta name="description" content="my portfolio website 2.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
       
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}
