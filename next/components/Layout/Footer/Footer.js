import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.oWrapper}>
          <div className={styles.iWrapper}>
            <div className={styles.logos}>
              <div>
                <Image
                  src="/images/logo-white.png"
                  alt="Barbara Guest logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div>
                <Image
                  src="/images/logo-remax.png"
                  alt="Remax aerospace logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className={styles.contact}>
              <h3>Contact</h3>

              <a href="tel:3214272948">
                {" "}
                <FontAwesomeIcon icon="mobile-alt" size="2x" />
                <span>(321) 427-2948</span>{" "}
              </a>
              <a href="mailto:barbaraguest@remax.net">
                {" "}
                <FontAwesomeIcon icon="envelope" size="2x" />
                <span>barbaraguest@remax.net</span>{" "}
              </a>
            </div>
            <div className={styles.links}>
              <h3>Links</h3>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/about">
                <a>About Us</a>
              </Link>
              <Link href="/listings">
                <a>Find a Home</a>
              </Link>
              <Link href="/sell">
                <a>Sell with Us</a>
              </Link>
            </div>
            <div className={styles.connect}>
              <h3>Connect</h3>
              <a
                href="https://www.instagram.com/barbaraguestrealtor/?hl=en"
                target="_blank"
              >
                <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/BarbaraGuestRealtor/"
                target="_blank"
              >
                <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
          <div className={styles.tag}>
            <p>proudly created & maintained by </p>
            <div>
              <a href="https://www.guestmedia.dev/" target="_blank">
                <Image
                  src="/images/logo-guestMedia_white.png"
                  alt="Land and Sea logo"
                  layout="fill"
                  objectFit="contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
