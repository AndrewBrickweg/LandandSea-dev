import styles from "./Banner.module.scss";

const Banner = ({ hasBackground, children }) => {
  const bannerStyle = hasBackground ? styles.banner : styles.bannerTransparent;

  return (
    <>
      <div className={bannerStyle}>{children}</div>
    </>
  );
};

export default Banner;
