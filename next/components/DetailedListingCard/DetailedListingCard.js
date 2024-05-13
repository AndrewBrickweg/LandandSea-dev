import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import composition from "../../utils/composition";
import { numberWithCommas } from "../../utils/helpers";
import styles from "./DetailedListingCard.module.scss";

export default function DetailedListingCard({ sparkListing }) {
  const {
    BedsTotal,
    BathroomsTotalNotational,
    CurrentPrice,
    LivingArea,
    UnparsedAddress,
    Photos,
    Id,
    PublicRemarks,
  } = composition(sparkListing);

  return (
    <Link href={`/listings/${Id}`}>
      <a className={styles.card}>
        <div className={styles.image}>
          {Photos.length > 0 ? (
            <Image
              src={Photos[0].Uri300}
              layout="fill"
              objectFit="cover"
              priority
            />
          ) : (
            <Image
              src="/images/image-not-found.jpg"
              width="100px"
              height="100px"
            />
          )}
        </div>
        <div className={styles.cardMain}>
          <div className={styles.cardHead}>
            <div className={styles.desc}>
              <div className={styles.info}>
                <p className={styles.price}>
                  ${CurrentPrice ? numberWithCommas(CurrentPrice) : "n/a"}
                </p>
                <p className={styles.address}>
                  {UnparsedAddress ? UnparsedAddress : "n/a"}
                </p>
              </div>
            </div>
            <div className={styles.icons}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon="bed" />
                <p>{BedsTotal ? BedsTotal : "n/a"}</p>
                <p>BEDS</p>
              </div>
              <div className={styles.icon}>
                <FontAwesomeIcon icon="bath" />
                <p>
                  {BathroomsTotalNotational ? BathroomsTotalNotational : "n/a"}
                </p>
                <p>BATHS</p>
              </div>
              <div className={styles.icon}>
                <FontAwesomeIcon icon="ruler-horizontal" />
                <p>{LivingArea ? numberWithCommas(LivingArea) : "n/a"}</p>
                <p>SQFT</p>
              </div>
            </div>
          </div>
          <div className={styles.remarks}>{PublicRemarks}</div>
        </div>
      </a>
    </Link>
  );
}
