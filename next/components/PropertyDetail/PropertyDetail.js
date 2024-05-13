import { Divider, Grid, Typography } from "@mui/material";
import Button from "../Button/Button";
import Banner from "../Banner/Banner";
import StatusBadge from "../StatusBadge/StatusBadge";
import styles from "./PropertyDetail.module.scss";
import DetailTable from "../DetailTable/DetailTable";
import { SingleMarkerMap } from "../Map/Map";
import FeaturesList from "../Features/FeaturesList";
import composition from "./composition";
import { numberWithCommas } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { getWalkScore } from "../../data/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PropertyDetail = ({ data }) => {
  const {
    generalFeatures,
    interiorFeatures,
    exteriorFeatures,
    communityFeatures,
    schoolFeatures,
  } = composition(data);

  const [proximityScore, setProximityScore] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const score = await getWalkScore(
          data.UnparsedAddress,
          data.Latitude,
          data.Longitude
        );
        setProximityScore(score);
      } catch (error) {
        console.error("Error fetching walk score:", error);
      }
    };

    fetchData();
  }, []);

  // Replicate Proximity Score UI and conditionally render data if it exists
  return (
    <>
      <Grid container direction="column" className={styles.container}>
        <Grid item>
          <div style={{ display: "flex" }}>
            <h3 style={{ padding: "10px 0px" }}>For Sale</h3>
            <StatusBadge label={data.MlsStatus}></StatusBadge>
          </div>
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid item>
          <p className={styles.address}>{data.UnparsedFirstLineAddress}</p>
          <p className={styles.address}>
            {data.City}, {data.StateOrProvince} {data.PostalCode}
          </p>
          <p className={styles.price}>${numberWithCommas(data.CurrentPrice)}</p>
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid item>
          <h3>At a Glance</h3>
          <FeaturesList data={data} />
        </Grid>
        <Divider />
        <br />
        <Grid item>
          <p className={styles.description}>{data.PublicRemarks}</p>
        </Grid>
      </Grid>

      <Banner hasBackground>
        <Grid
          container
          item
          spacing={1}
          direction="row"
          xs={12}
          md={12}
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Grid item alignSelf="center">
            <h3>Ready to see this property in person? Have Questions?</h3>
          </Grid>
          <br />
          <Grid container item spacing={2} justifyContent="center">
            <Grid item>
              <a className={styles.button} href="tel:3214272948">
                <Button variant="outlined">Contact Us</Button>
              </a>
            </Grid>
            {/* <Grid item>
              <a
                className={styles.button}
                target="_blank"
                href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=barbaraguest@remax.net&su=Tour - ${data.UnparsedFirstLineAddress} - MLS: ${data.MlsId}&body=Barbara, I'm interested in viewing this property at ${data.UnparsedAddress} at your earliest ​convenience!`}
              >
                <Button variant="contained">Schedule a Tour</Button>
              </a>
            </Grid> */}
          </Grid>
        </Grid>
      </Banner>

      <Grid container className={styles.container}>
        <Grid container item spacing={3}>
          <Grid item container xs={12} md={6} spacing={3}>
            <Grid item>
              <h3>Property Overview</h3>
            </Grid>
            <Grid item xs={12} md={12}>
              <DetailTable data={generalFeatures} />
            </Grid>
            <Grid item xs={12} md={12}>
              <DetailTable data={interiorFeatures} />
            </Grid>
            <Grid item xs={12} md={12}>
              <DetailTable data={exteriorFeatures} />
            </Grid>
            <Grid item xs={12} md={12}>
              <DetailTable data={communityFeatures} />
            </Grid>
            <Grid item xs={12} md={12}>
              <DetailTable data={schoolFeatures} />
            </Grid>
          </Grid>
          <Grid container item xs={12} lg={6} direction="column" spacing={3}>
            <Grid item>
              <h3>Map View</h3>
            </Grid>
            <Grid item>
              <SingleMarkerMap lat={data.Latitude} lng={data.Longitude} />
            </Grid>
            <Grid container item>
              <h3 style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}>
                Neighborhood & Commute
              </h3>
              <Typography variant="h6" style={{ paddingBottom: "0.5rem" }}>
                {data.UnparsedAddress}
              </Typography>
              <Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="left"
                  alignItems="center"
                  style={{ paddingBottom: "0.8rem" }}
                >
                  {/* <Typography
                    variant="body2"
                    style={{ paddingRight: "0.3rem" }}
                  >
                    Scores
                  </Typography> */}
                  {/* <Typography variant="body2">Nearby</Typography> */}

                  {/* use flexbox */}
                </Grid>
                <Grid style={{ paddingBottom: "1.3rem" }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <FontAwesomeIcon icon="person-walking" size="4x" />
                    </Grid>
                    <Grid>
                      <Typography>{proximityScore?.description}</Typography>
                    </Grid>
                    <Grid>
                      {proximityScore?.walkscore && (
                        <Typography>{proximityScore.walkscore}</Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <FontAwesomeIcon icon="person-biking" size="4x" />
                    </Grid>
                    <Grid>
                      <Typography>
                        {proximityScore?.bike.description}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography>{proximityScore?.bike.score}</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <Grid>{proximityScore?.transit?.description}</Grid>
                    <Grid>{proximityScore?.transit?.score}</Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* clickable link of map of restaurants etc. switches to the "nearby" tab */}
              {/* <Typography>
                View Map of nearby restaurants, grocery stores, and more.
              </Typography> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Banner>
        <Divider />
        <Grid
          container
          item
          spacing={1}
          direction="row"
          xs={12}
          md={12}
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Grid item>
            <h3 className={styles.bannerLabel}>
              Like this property? Schedule a tour to see it in person!
            </h3>
          </Grid>
          <Grid container item spacing={2} justifyContent="center">
            <Grid item>
              <a href="tel:3214272948">
                <Button variant="outlined">Contact Us</Button>
              </a>
            </Grid>
            {/* <Grid item>
              <a
                target="_blank"
                href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=barbaraguest@remax.net&su=LandandSea - ${data.UnparsedFirstLineAddress} - MLS: ${data.MlsId}&body=Barbara, I'm interested in viewing this property at ${data.UnparsedAddress} at your earliest ​convenience!`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.scheduleButton}
                >
                  Schedule a Tour
                </Button>
              </a>
            </Grid> */}
          </Grid>
        </Grid>
      </Banner>
    </>
  );
};

export default PropertyDetail;
