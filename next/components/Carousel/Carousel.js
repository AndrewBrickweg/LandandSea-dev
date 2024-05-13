import { useState, useEffect } from "react";
import Image from "next/image";
import { Grid, Button } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMediaQuery from "../../utils/useMediaQuery";
import Modal from "../Modal/Modal";
import { SingleMarkerMap } from "../Map/Map";
import styles from "./Carousel.module.scss";

const Carousel = ({ data }) => {
  const isDesktop = useMediaQuery(`(min-width: 639px)`);
  const [openPics, setOpenPics] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const handleOpenPics = () => setOpenPics(true);
  const handleOpenMap = () => setOpenMap(true);

  const customThumbs = data.Photos.map((item, i) => (
    <img key={i} src={item.UriThumb} />
  ));

  const [carouselHeight, setCarouselHeight] = useState();

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerHeight) {
      const navHeight = document.getElementById("nav").clientHeight;
      const thumbnailHeight =
        document.querySelector(".thumbs-wrapper").offsetHeight;
      const carouselBtns =
        document.getElementById("carousel-btns").offsetHeight;
      const thumbnailMargins = 40;
      const carouselBtnPadding = 24;

      const desktopCalc =
        window.innerHeight - navHeight - thumbnailHeight - thumbnailMargins ||
        "100vh";
      const mobileCalc =
        window.innerHeight -
          navHeight -
          thumbnailHeight -
          thumbnailMargins -
          carouselBtns -
          carouselBtnPadding || "75vh";

      if (window.innerWidth > 639) {
        setCarouselHeight(desktopCalc);
      } else {
        setCarouselHeight(mobileCalc);
      }
    }
  }, []);

  return (
    <>
      <Grid container className={styles.carouselWrapper}>
        <Grid style={{ width: "100%" }} item className={styles.carouselRoot}>
          <ResponsiveCarousel
            autoPlay
            infiniteLoop
            interval={7000}
            showStatus={false}
            showThumbs={true}
            showArrows={!!isDesktop}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={50}
            showIndicators={false}
            renderThumbs={() => customThumbs}
          >
            {data.Photos.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    height: carouselHeight,
                  }}
                  className={styles.imageWrapper}
                >
                  <Image
                    priority
                    src={isDesktop ? item.Uri1600 : item.Uri640}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              );
            })}
          </ResponsiveCarousel>
          <div className={styles.carouselButton}>
            <Button
              id="carousel-btns"
              onClick={handleOpenPics}
              variant="contained"
            >
              {isDesktop ? (
                "See All Photos"
              ) : (
                <FontAwesomeIcon icon="camera" size="2x" />
              )}
            </Button>
            <Button onClick={handleOpenMap} variant="contained">
              {isDesktop ? (
                "See Map"
              ) : (
                <FontAwesomeIcon icon="map-location-dot" size="2x" />
              )}
            </Button>
          </div>
        </Grid>
      </Grid>

      <Modal open={openPics} handleClose={() => setOpenPics(false)}>
        <Grid
          className={styles.container}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {data.Photos.map((item, i) => (
            <Grid key={i} item>
              <img src={isDesktop ? item.Uri1600 : item.Uri640} alt="" />
            </Grid>
          ))}
        </Grid>
      </Modal>
      <Modal open={openMap} handleClose={() => setOpenMap(false)}>
        <SingleMarkerMap
          height="100vh"
          title={data.UnparsedFirstLineAddress}
          lat={data.Latitude}
          lng={data.Longitude}
        />
      </Modal>
    </>
  );
};

export default Carousel;
