import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { routes } from "../../../utils/constants";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useTransition, animated } from "react-spring";
import styles from "./Header.module.scss";

export default function Header() {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const router = useRouter();
  const transitions = useTransition(toggleOverlay, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  const isActiveLink = (route) => router.pathname === route.path;

  const handleToggleMenu = () => {
    setToggleOverlay(!toggleOverlay);
  };

  // Sets body overflow to hidden when overlay is present
  useEffect(() => {
    if (toggleOverlay) {
      document.querySelector("body").classList.add("no-scroll");
    } else {
      document.querySelector("body").classList.remove("no-scroll");
    }
  }, [toggleOverlay]);

  return (
    <header>
      <nav id="nav" className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <a onClick={() => setToggleOverlay(false)}>
              <Image
                src="/images/logo-color.png"
                alt="Barbara Guest logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </a>
          </Link>
        </div>

        {/* Desktop Links */}
        <ul>
          {routes.map((route, i) => (
            <li key={i}>
              <Link href={route.path}>
                <a className={isActiveLink(route) ? styles.active : ""}>
                  {route.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Burger */}
        <button
          onClick={handleToggleMenu}
          className={`${styles.burger} ${toggleOverlay && styles.open}`}
        >
          <div />
          <div />
          <div />
        </button>
      </nav>

      {/* Mobile Overlay Nav  */}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={styles.mobileMenu}>
              <MobileMenu
                routes={routes}
                isActiveLink={isActiveLink}
                toggleOverlay={toggleOverlay}
                setToggleOverlay={setToggleOverlay}
              />
            </animated.div>
          )
      )}
    </header>
  );
}
