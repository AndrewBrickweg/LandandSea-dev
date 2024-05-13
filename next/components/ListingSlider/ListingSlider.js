import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTrail, animated as a } from "react-spring";
import ListingCard from "../ListingCard/ListingCard";
import styles from "./ListingSlider.module.scss";

export default function ListingSlider({ sparkListings, heading, hasSeeAll }) {
  const [enableSlider, setEnableSlider] = useState(false);
  const ref = useRef(null);
  const trail = useTrail(sparkListings?.length, {
    from: { marginLeft: -20, opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { marginLeft: 0, opacity: 1, transform: "translate3d(0,0px,0)" },
  });

  // sets ListingCards to display as flex if there is NOT enough cards to overflow
  useEffect(() => {
    if (ref.current.clientWidth >= window.innerWidth) setEnableSlider(true);
  }, []);

  return (
    <section className={heading ? styles.container : ""}>
      {heading && (
        <h2 className={hasSeeAll ? styles.headingTwo : styles.heading}>
          {heading}
          {hasSeeAll && (
            <span>
              <Link href="#">
                <a>See all</a>
              </Link>
            </span>
          )}{" "}
        </h2>
      )}

      <div
        ref={ref}
        className={`${enableSlider && styles.enableScroll} ${
          styles.slider
        } snap-inline`}
      >
        {sparkListings &&
          trail.map((props, index) => (
            <a.div key={index} style={props} className={styles.animation}>
              <ListingCard sparkListing={sparkListings[index]} />
            </a.div>
          ))}
      </div>
    </section>
  );
}
