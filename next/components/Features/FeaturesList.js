import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";
import moment from "moment";
import styles from "./FeaturesList.module.scss";

const FeaturesList = ({ data }) => {
  const {
    BedsTotal,
    BathroomsTotalNotational,
    LivingArea,
    YearBuilt,
    PropertySubType,
    OnMarketDate,
  } = data;

  const daysOnMarket = moment(OnMarketDate).fromNow();
  const isNewListing = moment(Date.now()).diff(OnMarketDate, "days") <= 7;

  const formatedData = [
    {
      id: 1,
      title: BedsTotal > 1 ? `${BedsTotal} Beds` : `${BedsTotal} Bed`,
      icon: "bed",
    },
    {
      id: 2,
      title:
        BathroomsTotalNotational > 1
          ? `${BathroomsTotalNotational} Baths`
          : `${BathroomsTotalNotational} Bath`,
      icon: "bath",
    },
    {
      id: 3,
      title: PropertySubType,
      icon: "house",
    },
    {
      id: 4,
      title: `${LivingArea} Sq. Ft.`,
      icon: "ruler-horizontal",
    },
    {
      id: 5,
      title: `Built in ${YearBuilt}`,
      icon: "compass-drafting",
    },
    {
      id: 6,
      title: OnMarketDate ? `Listed ${daysOnMarket}` : "Coming Soon!",
      icon: "clock",
      highlight: isNewListing,
    },
  ];

  return (
    <>
      <Grid
        container
        justifyContent="space-evenly"
        className={styles.container}
      >
        {formatedData.map((item) => {
          return (
            <div key={item.id}>
              <Grid item className={styles.iconContainer}>
                <Grid container direction="column">
                  <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                  <Grid item>
                    <p
                      style={{ color: item.highlight && "red" }}
                      className={styles.title}
                    >
                      {item.title}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Grid>
    </>
  );
};
export default FeaturesList;
