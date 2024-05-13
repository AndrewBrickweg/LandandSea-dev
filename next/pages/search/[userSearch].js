import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "@mui/material/Grid";
import MUIPagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { animated as a, useTrail } from "react-spring";
import DetailedListingCard from "../../components/DetailedListingCard/DetailedListingCard";
import Error from "../../components/FetchStates/Error";
import MetaHead from "../../components/Layout/MetaHead/MetaHead";
import ListingCard from "../../components/ListingCard/ListingCard";
import { MultiMarkerMap } from "../../components/Map/Map";
import Search from "../../components/Search/Search";
import { useSearchByLocation } from "../../data/queries";
import styles from "./userSearch.module.scss";

const SearchResults = ({ pageIndex, setPageIndex }) => {
  const [alignment, setAlignment] = useState("left");
  const router = useRouter();
  const city = router.query.userSearch;

  const { data, isLoading, isError } = useSearchByLocation(city, pageIndex);

  const { Results, Pagination } = data;

  const isDetailedView = alignment === "center";

  const trail = useTrail(Results?.length, {
    from: { marginLeft: -20, opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { marginLeft: 0, opacity: 1, transform: "translate3d(0,0px,0)" },
  });

  const handleAlignment = (event, newAlignment) => setAlignment(newAlignment);

  const priceRange = [];
  if (Results?.length > 0) {
    Results.forEach((result) =>
      priceRange.push(result.StandardFields.CurrentPrice)
    );
  }

  const minPrice = Math.min(...priceRange);
  const maxPrice = Math.max(...priceRange);

  const handleChange = (event, value) => {
    setPageIndex(value);
    if (alignment !== "right") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (alignment === "right") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [alignment]);

  if (isError) return <Error />;
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Skeleton variant="rectangular" width="100%" height={82} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {[...Array(12).keys()].map((skeleton, i) => (
            <Skeleton
              style={{ margin: "2rem" }}
              variant="rectangular"
              width={270}
              height={340}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.filterContainer}>
        {/* <Slider min={minPrice} max={maxPrice} /> */}
      </div>
      <div className={styles.container}>
        <div className={styles.topControls}>
          <div className={styles.viewSort}>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                Gallery
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-border-all" />
                </span>
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                List
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-list" />
                </span>
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                Map
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                </span>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {Results.length > 0 && Results.length >= 12 ? (
            <p className={styles.results}>
              Viewing {Pagination.PageSize * Pagination.CurrentPage} of{" "}
              {Pagination.TotalRows} Search Results
            </p>
          ) : (
            <p className={styles.results}>
              Viewing {Pagination.TotalRows} of {Pagination.TotalRows} Search
              Results
            </p>
          )}
          <MUIPagination
            count={Pagination.TotalPages}
            page={pageIndex}
            onChange={handleChange}
            size="small"
            color="primary"
            shape="rounded"
          />
        </div>
        <Grid
          justifyContent="center"
          alignItems="center"
          container
          width="100%"
        >
          {Results.length > 0 ? (
            trail.map((props, index) => (
              <Grid
                key={index}
                className={styles.cardItem}
                item
                xs={12}
                sm={isDetailedView ? 12 : 6}
                md={isDetailedView ? 12 : 4}
                lg={isDetailedView ? 12 : 3}
              >
                <a.div style={props} className={styles.animation}>
                  {alignment === "left" && (
                    <ListingCard isLarge sparkListing={Results[index]} />
                  )}
                  {alignment === "center" && (
                    <DetailedListingCard sparkListing={Results[index]} />
                  )}
                </a.div>
              </Grid>
            ))
          ) : (
            <p className={styles.noResults}>
              No search results for{" "}
              <span style={{ color: "#5fa5aa", fontWeight: "600" }}>
                {city}
              </span>{" "}
              at this time, please try again later.
            </p>
          )}
          {alignment === "right" && (
            <MultiMarkerMap listings={Results} height="100vh" />
          )}
        </Grid>
        <div className={styles.bottomControls}>
          <MUIPagination
            count={Pagination.TotalPages}
            page={pageIndex}
            onChange={handleChange}
            size="small"
            color="primary"
            shape="rounded"
          />
        </div>
      </div>
    </>
  );
};

export default function SearchPage() {
  const router = useRouter();
  const city = router.query.userSearch;
  const sessionStorageKey = `${city} - pageIndex`;

  const [pageIndex, setPageIndex] = useState(
    getStorageValue(sessionStorageKey, 1)
  );

  function getStorageValue(key, defaultValue) {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      return initial;
    }
  }

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(pageIndex));
  }, [pageIndex]);

  useEffect(() => {
    setPageIndex(getStorageValue(sessionStorageKey, 1));
  }, [city]);

  return (
    <>
      <MetaHead
        title={`Listing Search - Homes for Sale in ${city}`}
        desc={`Allow our team to help you find your dream home in ${city}`}
      />
      <Search hasBackground fullScreen condensed />

      <SearchResults pageIndex={pageIndex} setPageIndex={setPageIndex} />
      <div style={{ display: "none" }}>
        <SearchResults pageIndex={pageIndex + 1} />
      </div>
    </>
  );
}
