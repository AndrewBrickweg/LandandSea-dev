import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import FadeInOnScroll from "../../lib/FadeInOnScroll";
import styles from "./SellCTA.module.scss";

export default function SellCTA({ bannerImage }) {
  return (
    <FadeInOnScroll className={styles.container}>
      <div className={styles.text}>
        <h3>Ready to sell your home?</h3>
        <p>Let the experts do the work for you!</p>
        <p className={styles.subHead}>
          Selling with us is easy. We work with you every step of the way for
          maximum profits!
        </p>
        <Link href="/sell">
          <Button className={styles.button}>
            <a>Tell Me More</a>
          </Button>
        </Link>
      </div>
      <div className={styles.img}>
        <Image
          src={bannerImage.img.url}
          alt={bannerImage?.alt}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </FadeInOnScroll>
  );
}
