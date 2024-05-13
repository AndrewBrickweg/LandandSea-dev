import { Grid } from "@mui/material";
import MetaHead from "../../components/Layout/MetaHead/MetaHead";
import Button from "../../components/Button/Button";
import sanityClient from "../../client";
import Testimonials from "../../components/Testimonials/Testimonials";
import Hero from "../../components/Hero/Hero";
import { GET_IMAGES_BY_PAGE, GET_TESTIMONIALS } from "../../data/cms";
import Banner from "../../components/Banner/Banner";
import ContactBanner from "../../components/ContactBanner/ContactBanner";
import Step from "../../components/ContactStep/ContactStep";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.scss";

export default function SellPage({ images, testimonials }) {
  return (
    <>
      <MetaHead
        title="Selling your Home in Brevard County with Barbara Guest"
        desc="Selling your home with Barbara Guest will be an enjoyable experience, we guarentee it!"
        imageUrl={images[0].img.url}
      />
      <div className={styles.wrapper}>
        <Hero heroImage={images[0]} />
        <ContactBanner />
        <div className={styles.sellSteps}>
          <h1 className={styles.sellHeader}>Sell with Us in 3 Easy Steps</h1>
          <Grid
            container
            spacing={{ xs: 10, md: 20 }}
            direction="row"
            justifyContent="center"
          >
            <Grid item>
              <Step
                imageSrc={"/images/Phone.svg"}
                header="Contact Us"
                description={
                  "Send us a message to schedule a free consultation about selling your home."
                }
              />
            </Grid>
            <Grid item>
              <Step
                imageSrc={"/images/house.svg"}
                header="List with Us"
                description={
                  "List your home with us to reach our special selection of buyers."
                }
              />
            </Grid>
            <Grid item>
              <Step
                imageSrc={"/images/For_Sale.svg"}
                header="Sell Your Home"
                description={"Sell your home to a lucky buyer!"}
              />
            </Grid>
          </Grid>
        </div>

        <Testimonials
          testimonials={testimonials}
          header="Take it from our satisfied clients!"
        />
        <Banner>
          <Grid
            container
            item
            direction="row"
            xs={12}
            md={12}
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <Grid container direction="column" alignContent="center">
              <Grid item>
                <h3>Have questions? We're ready to answer them.</h3>
              </Grid>
              <br />
              <Grid item>
                <div className={styles.contactButtons}>
                  <p>Call, Text or Email us!</p>
                  <div>
                    <Button variant="contained" color="primary">
                      <a
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        href="tel:3214272948"
                      >
                        <FontAwesomeIcon icon="mobile-alt" size="2x" />
                      </a>
                    </Button>
                    <Button variant="contained" color="primary">
                      <a
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        href="mailto:barbaraguest@remax.net"
                      >
                        <FontAwesomeIcon
                          style={{ width: "100%" }}
                          icon="envelope"
                          size="2x"
                        />
                      </a>
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Banner>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const images = await sanityClient.fetch(GET_IMAGES_BY_PAGE("sell"));
  const testimonials = await sanityClient.fetch(GET_TESTIMONIALS);

  return {
    props: {
      images,
      testimonials,
    },
    revalidate: 60,
  };
}
