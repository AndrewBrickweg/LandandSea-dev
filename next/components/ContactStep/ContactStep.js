import Image from "next/image";
import { Grid } from "@mui/material";
import React from "react";
import styles from "./ContactStep.module.scss";

const Step = ({ imageSrc, header, description }) => {
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={styles.wrapper}
      >
        <Image
          src={imageSrc}
          height={237}
          width={237}
          className={styles.image}
        />

        <h2 className={styles.imageHeader}>{header}</h2>
        <p className={styles.description}>{description}</p>
      </Grid>
    </>
  );
};

export default Step;
