import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../utils/constants";
import Layout from "../components/Layout/Layout";
import "../lib/fontAwesome";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Barbara Guest, a Premiere Space Coast FL Realtor.</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
