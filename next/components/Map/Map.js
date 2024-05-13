import Router from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import { numberWithCommas } from "../../utils/helpers";
import styles from "./Map.module.scss";

export const SingleMarkerMap = ({
  lat,
  lng,
  width = "100%",
  height = "425px",
  title = "",
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width,
    height,
  };

  const center = useMemo(
    () => ({
      lat: lat,
      lng: lng,
    }),
    []
  );

  const defaultMapOptions = {
    fullscreenControl: false,
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      <Marker title={title} position={center} />
    </GoogleMap>
  );
};

export const MultiMarkerMap = ({
  listings,
  width = "100%",
  height = "425px",
}) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width,
    height,
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={containerStyle}
      center={{
        lat: listings[0].StandardFields.Latitude,
        lng: listings[0].StandardFields.Longitude,
      }}
      zoom={12}
    >
      {listings.map((listing) => (
        <>
          <Marker
            animation={2}
            title={listing.StandardFields.UnparsedAddress}
            onClick={() => Router.push(`/listings/${listing.Id}`)}
            onMouseOver={() => handleActiveMarker(listing.Id)}
            position={{
              lat: listing.StandardFields.Latitude,
              lng: listing.StandardFields.Longitude,
            }}
          />
          {activeMarker === listing.Id ? (
            <InfoBox
              position={{
                lat: listing.StandardFields.Latitude,
                lng: listing.StandardFields.Longitude,
              }}
            >
              <Link href={`/listings/${listing.Id}`}>
                <a>
                  <div className={styles.container}>
                    <p className={styles.address}>
                      {listing.StandardFields.UnparsedAddress}
                    </p>

                    <div className={styles.image}>
                      <Image
                        src={listing.StandardFields.Photos[0].Uri300}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className={styles.price}>
                      ${numberWithCommas(listing.StandardFields.CurrentPrice)}
                    </p>
                  </div>
                </a>
              </Link>
            </InfoBox>
          ) : null}
        </>
      ))}
    </GoogleMap>
  );
};
