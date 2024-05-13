import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import composition from "../../utils/composition";
import { numberWithCommas } from "../../utils/helpers";
import styles from "./ListingCard.module.scss";

export default function ListingCard({ sparkListing, isLarge }) {
  const {
    BedsTotal,
    BathroomsTotalNotational,
    CurrentPrice,
    LivingArea,
    MlsStatus,
    MajorChangeType,
    UnparsedAddress,
    Photos,
    OnMarketDate,
    Id,
    OpenHouseData,
  } = composition(sparkListing);

  const isLast24hrs =
    !!OnMarketDate &&
    moment(OnMarketDate).isBetween(moment().subtract(24, "hours"), moment());

  const hasOpenHouseDates = OpenHouseData?.length > 0;

  return (
    <Link href={`/listings/${Id}`}>
      <a className={isLarge ? styles.largeCard : styles.card}>
        <div className={styles.image}>
          {hasOpenHouseDates && (
            <div
              style={{
                backgroundColor: "red",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={styles.badge}
            >
              <p>Open House</p>
              {OpenHouseData.map((openHouseDate, i) => (
                <p key={i} style={{ marginTop: "0.2rem" }}>
                  {moment(openHouseDate?.Date).isSame(moment(), "day")
                    ? "Today"
                    : moment(openHouseDate.OpenHouseStartTimestamp).format(
                        "ddd"
                      )}
                  : {moment(openHouseDate.OpenHouseStartTimestamp).format("h")}{" "}
                  - {moment(openHouseDate.OpenHouseEndTimestamp).format("h")}
                </p>
              ))}
            </div>
          )}

          {!hasOpenHouseDates &&
            MlsStatus === "Coming Soon" &&
            !isLast24hrs && (
              <div
                style={{ backgroundColor: "darkblue" }}
                className={styles.badge}
              >
                Coming Soon!
              </div>
            )}

          {!hasOpenHouseDates &&
            (MlsStatus === "Pending" || MlsStatus === "Backups") && (
              <div
                style={{ backgroundColor: "orange" }}
                className={styles.badge}
              >
                Pending/Backups
              </div>
            )}

          {!hasOpenHouseDates && MajorChangeType === "Back on Market" && (
            <div style={{ backgroundColor: "black" }} className={styles.badge}>
              Back on Market!
            </div>
          )}

          {!hasOpenHouseDates &&
            MajorChangeType !== "Back on Market" &&
            !(MlsStatus === "Pending" || MlsStatus === "Backups") &&
            isLast24hrs && (
              <div style={{ backgroundColor: "teal" }} className={styles.badge}>
                Just Listed!
              </div>
            )}

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
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <div className={styles.desc}>
          <div className={styles.info}>
            <p className={styles.price}>
              ${CurrentPrice ? numberWithCommas(CurrentPrice) : "n/a"}
            </p>
            <p className={styles.address}>
              {UnparsedAddress ? UnparsedAddress : "n/a"}
            </p>
          </div>
          <hr className={styles.divider} />
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
      </a>
    </Link>
  );
}
