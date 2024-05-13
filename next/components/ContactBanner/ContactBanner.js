import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ContactBanner.module.scss";

const ContactBanner = () => {
  return (
    <Grid container className={styles.contactBanner}>
      <Grid item className={styles.left} xs={12} md={6} lg={4}>
        <Grid item>
          <h3 className={styles.header}>
            Selling a home in Brevard or Orange County?
          </h3>

          <p className={styles.subHeader}>Selling with us is easy!</p>

          <p className={styles.subHeader}>
            Take the guesswork and stress out of selling your home and leave it
            to the experts.
          </p>
        </Grid>
      </Grid>
      <Grid item className={styles.right} xs={12} md={6} lg={8}>
        <h4>Call, Text or Email us!</h4>
        <div>
          <a href="tel:3214272948">
            <FontAwesomeIcon icon="mobile-alt" size="5x" />
          </a>
          <a href="mailto:barbaraguest@remax.net">
            <FontAwesomeIcon icon="envelope" size="5x" />
          </a>
        </div>
      </Grid>
    </Grid>
  );
};

export default ContactBanner;
