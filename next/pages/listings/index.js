import ListingSlider from "../../components/ListingSlider/ListingSlider";
import MetaHead from "../../components/Layout/MetaHead/MetaHead";
import Hero from "../../components/Hero/Hero";
import Search from "../../components/Search/Search";
import sanityClient from "../../client";
import { GET_IMAGES_BY_PAGE } from "../../data/cms";
import { getListingsByCity } from "../../data/queries";
import cache from "../../lib/cache";

export default function ListingsPage({
  images,
  cocoaBeachListings,
  vieraListings,
  merrittIslandListings,
  melbourneListings,
}) {
  const heroImage = images[0];
  return (
    <>
      <MetaHead
        title="Brevard County Homes for Sale, Contact Barbara Guest to Find your Dream Home!"
        desc="Search our listing database to find your dream home, let our team work for you!"
        imageUrl={heroImage.img.url}
      />
      <Hero heroImage={heroImage} />
      <Search
        hasBackground
        heading="Discover Your Dream Home"
        altText="Search for Listings"
      />
      {cocoaBeachListings.length > 0 && (
        <ListingSlider
          // hasSeeAll
          sparkListings={cocoaBeachListings}
          heading="Featured Homes in Cocoa Beach"
        />
      )}

      {vieraListings.length > 0 && (
        <ListingSlider
          // hasSeeAll
          sparkListings={vieraListings}
          heading="Featured Homes in Viera"
        />
      )}

      {merrittIslandListings.length > 0 && (
        <ListingSlider
          // hasSeeAll
          sparkListings={merrittIslandListings}
          heading="Featured Homes in Merritt Island"
        />
      )}

      {melbourneListings.length > 0 && (
        <ListingSlider
          // hasSeeAll
          sparkListings={melbourneListings}
          heading="Featured Homes in Melbourne"
        />
      )}
    </>
  );
}

export async function getStaticProps() {
  const images = await sanityClient.fetch(GET_IMAGES_BY_PAGE("listings"));
  const cocoaBeachListings = await cache.fetch(
    "CB-listings",
    () => getListingsByCity("cocoa beach"),
    60
  );
  const merrittIslandListings = await cache.fetch(
    "MI-listings",
    () => getListingsByCity("merritt island"),
    60
  );
  const vieraListings = await cache.fetch(
    "VIERA-listings",
    () => getListingsByCity("viera"),
    60
  );
  const melbourneListings = await cache.fetch(
    "MEL-listings",
    () => getListingsByCity("melbourne"),
    60
  );

  return {
    props: {
      images,
      cocoaBeachListings: cocoaBeachListings.Results,
      merrittIslandListings: merrittIslandListings.Results,
      vieraListings: vieraListings.Results,
      melbourneListings: melbourneListings.Results,
    },
    revalidate: 1,
  };
}
