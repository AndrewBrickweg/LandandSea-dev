import Head from "next/head";
import { useEffect } from "react";

const MetaHead = ({
  title = "Land and Sea Homes Group a RE/MAX Aerospace Team",
  desc = "The Land & Sea Homes Group with RE/MAX Aerospace Realty provides superior customer service when buying or selling your home to ensure you experience the best in the real estate market.",
  imageUrl = "",
}) => {
  useEffect(() => {
    if (document && title) {
      document.title = title;
    }
  }, [title]);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} key="title" />
      <meta property="og:description" content={desc} />
      <meta
        property="og:image"
        content={
          imageUrl || "https://landandsea.vercel.app/images/logo-white.png"
        }
      />
    </Head>
  );
};

export default MetaHead;
