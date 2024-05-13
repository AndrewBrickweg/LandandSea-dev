import Hero from "../components/Hero/Hero";
import Search from "../components/Search/Search";
import Tabs from "../components/Tabs/Tabs";
import Testimonials from "../components/Testimonials/Testimonials";
import SellCTA from "../components/CTAs/SellCTA";
import StatsBanner from "../components/StatsBanner/StatsBanner";
import sanityClient from "../client";
import { GET_IMAGES_BY_PAGE, GET_TESTIMONIALS } from "../data/cms";
import {
  getFeatured,
  getWaterfront,
  getSingleFamily,
  getCondos,
  getNewest,
  getComingSoon,
} from "../data/queries";
import cache from "../lib/cache";

export default function Home({
  images,
  featuredListings,
  singleFamilyListings,
  condoListings,
  waterfrontListings,
  newestListings,
  comingSoonListings,
  testimonials,
}) {
  const heroImage = images[0];
  const bannerImage = images[1];

  return (
    <>
      <Hero heroImage={heroImage} />
      <Search
        heading="Find Your Next Home"
        altText={`Tell us what you're looking for.`}
      />
      <Tabs
        heading="Want to see some options? Browse our beautiful listings!"
        tabs={[
          { title: "Featured", data: featuredListings },
          { title: "Single Family", data: singleFamilyListings },
          { title: "Condos/Townhomes", data: condoListings },
          { title: "Waterfront", data: waterfrontListings },
          { title: "Just Listed!", data: newestListings },
          { title: "Coming Soon!", data: comingSoonListings },
        ]}
      />
      <Testimonials testimonials={testimonials} />
      <SellCTA bannerImage={bannerImage} />
      <StatsBanner />
    </>
  );
}

export async function getStaticProps() {
  const images = await sanityClient.fetch(GET_IMAGES_BY_PAGE("home"));
  const testimonials = await sanityClient.fetch(GET_TESTIMONIALS);

  const featuredListings = await cache.fetch(
    "FEATURED",
    () => getFeatured(),
    60
  );
  const singleFamilyListings = await cache.fetch(
    "SINGLE-FAMILY",
    () => getSingleFamily(),
    60
  );
  const condoListings = await cache.fetch("CONDOS", () => getCondos(), 60);
  const waterfrontListings = await cache.fetch(
    "WATERFRONT",
    () => getWaterfront(),
    60
  );
  const newestListings = await cache.fetch("NEWEST", () => getNewest(), 60);

  const comingSoonListings = await cache.fetch(
    "COMING-SOON",
    () => getComingSoon(),
    60
  );

  return {
    props: {
      images,
      featuredListings,
      singleFamilyListings,
      condoListings,
      waterfrontListings,
      newestListings,
      comingSoonListings,
      testimonials,
    },
    revalidate: 1,
  };
}
