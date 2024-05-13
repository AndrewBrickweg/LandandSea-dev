import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeInOnScroll from "../../lib/FadeInOnScroll";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Testimonials.module.scss";

export default function Testimonials({ testimonials, header }) {
  return (
    <FadeInOnScroll className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.quote} src="/images/quote.png" alt="quote" />
        <h2>{header || "Our reviews speak for themselves!" }</h2>
        <Carousel
          autoPlay
          infiniteLoop
          interval={15000}
          showStatus={false}
          showThumbs={false}
          showArrows={false}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            const defStyle = {
              padding: "0.5rem",
              color: "#d6d7da",
              cursor: "pointer",
              fontSize: "7px",
            };
            const style = isSelected
              ? { ...defStyle, color: "#5a606c", fontSize: "10px" }
              : { ...defStyle };
            return (
              <span
                className={styles.dots}
                style={style}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`${label} ${index + 1}`}
              >
                <FontAwesomeIcon icon="circle" />
              </span>
            );
          }}
        >
          {testimonials &&
            testimonials.map((testimonial) => (
              <div key={testimonial._id}>
                <p className={styles.content}>{testimonial.review}</p>
                <p className={styles.author}>{testimonial.name}</p>
                <p className={styles.desc}>{testimonial.desc}</p>
              </div>
            ))}
        </Carousel>
      </div>
    </FadeInOnScroll>
  );
}
