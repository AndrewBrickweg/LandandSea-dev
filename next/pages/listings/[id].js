import { useRouter } from "next/router";
import MetaHead from "../../components/Layout/MetaHead/MetaHead";
import Grid from "@mui/material/Grid";
import { useListing, getListingsById } from "../../data/queries";
import Carousel from "../../components/Carousel/Carousel";
import PropertyDetail from "../../components/PropertyDetail/PropertyDetail";
import Loading from "../../components/FetchStates/Loading";
import Error from "../../components/FetchStates/Error";
// import cache from "../../lib/cache";
import { getWalkScore } from "../../data/queries";

function Listing() {
  const router = useRouter();
  const id = router.query?.id?.toString();
  const { data, isLoading, isError } = useListing(id);

  const primaryPhoto = data?.Photos.filter((photo) => photo.Primary === true)[0]
    .Uri300;

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <MetaHead
        title={data?.UnparsedAddress}
        desc={`Check out ${data?.UnparsedAddress}. Contact Barbara Guest for more information or to schedule a showing.`}
        imageUrl={primaryPhoto}
      />
      <Grid container>
        <Carousel data={data} />
        <PropertyDetail data={data} />
      </Grid>
    </>
  );
}

export default Listing;

// export async function getServerSideProps({ params }) {
//   const data = await cache.fetch(
//     `detailedListing - ${params.id}`,
//     () => getListingsById(params.id),
//     60
//   );

//   return {
//     props: { data },
//   };
// }
