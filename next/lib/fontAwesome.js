import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import {
  faMobileAlt,
  faEnvelope,
  faMapMarked,
  faMagnifyingGlass,
  faBed,
  faBath,
  faRulerHorizontal,
  faCircle,
  faHouse,
  faClock,
  faCompassDrafting,
  faList,
  faLocationDot,
  faBorderAll,
  faXmark,
  faMapLocationDot,
  faCamera,
  faImage,
  faPersonWalking,
  faPersonBiking,
} from "@fortawesome/free-solid-svg-icons";

import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

library.add(
  faMobileAlt,
  faEnvelope,
  faMapMarked,
  faMagnifyingGlass,
  faBed,
  faBath,
  faRulerHorizontal,
  faCircle,
  faList,
  faLocationDot,
  faBorderAll,
  faFacebook,
  faInstagram,
  faHouse,
  faClock,
  faCompassDrafting,
  faXmark,
  faMapLocationDot,
  faCamera,
  faImage,
  faPersonWalking,
  faPersonBiking
);
