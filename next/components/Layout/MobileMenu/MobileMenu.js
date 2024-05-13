import { createRef, useRef } from "react";
import Link from "next/link";
import styles from "./MobileMenu.module.scss";

export default function MobileMenu({
  routes,
  isActiveLink,
  toggleOverlay,
  setToggleOverlay,
}) {
  let linkRefs = useRef([]);
  const linksArray = new Array(routes.length).fill(0);
  linkRefs.current = linksArray.map(
    (ref, index) => (linkRefs.current[index] = createRef())
  );

  function handleClick(e) {
    for (let i = 0; i < linkRefs.current.length; i++) {
      const elRef = linkRefs.current[i];
      setToggleOverlay(!toggleOverlay);
      if (elRef && !elRef.current?.contains(e.target)) {
        setToggleOverlay(false);
      }
    }
  }

  return (
    <div onClick={(e) => handleClick(e)} className={styles.menu}>
      {routes.map((route, i) => (
        <Link key={`${i}-mobileMenu`} href={route.path}>
          <a ref={linkRefs.current[i]}>
            <span className={isActiveLink(route) ? styles.active : ""}>
              {route.title}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
}
