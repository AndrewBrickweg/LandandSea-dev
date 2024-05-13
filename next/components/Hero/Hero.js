import Image from "next/image";
import styles from "./Hero.module.scss";

export default function Hero({ heroImage }) {
  return (
    <div className={styles.hero}>
      <Image
        src={heroImage.img.url}
        alt={heroImage?.alt}
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
}
