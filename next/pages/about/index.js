import Image from "next/image";
import MetaHead from "../../components/Layout/MetaHead/MetaHead";
import Hero from "../../components/Hero/Hero";
import sanityClient from "../../client";
import PortableText from "react-portable-text";
import { GET_IMAGES_BY_PAGE, GET_STAFF } from "../../data/cms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeInOnScroll from "../../lib/FadeInOnScroll";
import styles from "./index.module.scss";

export default function AboutPage({ images, staffs }) {
  const heroImage = images[0];

  const owner = staffs.filter((staff) => staff.showcase && staff);
  const others = staffs.filter((staff) => !staff.showcase && staff);

  return (
    <>
      <MetaHead
        title="About Barbara Guest, where great service and results are standard!"
        desc="Barbara Guest with RE/MAX Aerospace Realty provides superior customer service when buying or selling your home to ensure you experience the best in the real estate market."
        imageUrl={heroImage.img.url}
      />
      <Hero heroImage={heroImage} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p className={styles.intro}>
            Barbara Guest and her team with RE/MAX Aerospace Realty provides
            superior customer service when buying or selling your home to ensure
            you experience the best in the real estate market.
            <br />
            <br />
            We strive to meet our clients’ needs and take their best interests
            at heart with every transaction. Our core values are the highest
            level of honesty, professionalism, and passion which leads us to
            life-long relationships.
          </p>
          <FadeInOnScroll>
            <div className={styles.header}>
              <div />
              <h1>Meet Our Team</h1>
              <div />
            </div>
            <div className={styles.mom}>
              <div className={styles.image}>
                <Image
                  src={owner[0].headshot.url}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={owner[0].headshot.lqip}
                />
              </div>
              <div>
                <h2>{owner[0].name}</h2>

                <PortableText
                  content={owner[0].bio}
                  serializers={{
                    link: (props) => (
                      <a
                        target="_blank"
                        style={{
                          fontWeight: "bolder",
                          textDecoration: "underline",
                          color: "red",
                        }}
                        {...props}
                      />
                    ),
                    normal: (props) => (
                      <p style={{ marginTop: "0.75rem" }} {...props} />
                    ),
                    strong: (props) => (
                      <span style={{ fontWeight: "700" }} {...props} />
                    ),
                    h1: (props) => (
                      <h1
                        style={{ marginTop: "2rem", marginBottom: "2rem" }}
                        {...props}
                      />
                    ),
                    h2: (props) => (
                      <h2
                        style={{
                          marginTop: "1.75rem",
                          marginBottom: "1.75rem",
                        }}
                        {...props}
                      />
                    ),
                    h3: (props) => (
                      <h3
                        style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
                        {...props}
                      />
                    ),
                    h4: (props) => (
                      <h4
                        style={{
                          marginTop: "1.25rem",
                          marginBottom: "1.25rem",
                        }}
                        {...props}
                      />
                    ),
                    h5: (props) => (
                      <h5
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        {...props}
                      />
                    ),
                    h6: (props) => (
                      <h6
                        style={{
                          marginTop: "0.75rem",
                          marginBottom: "0.75rem",
                        }}
                        {...props}
                      />
                    ),
                  }}
                />
                <div className={styles.contact}>
                  <a href="tel:3214272948">
                    <span>
                      <FontAwesomeIcon icon="mobile-alt" />
                    </span>{" "}
                    {owner[0].phoneNumber}
                  </a>
                  <br className="hide-tablet" />
                  <a href="mailto:barbaraguest@remax.net">
                    <span>
                      <FontAwesomeIcon icon="envelope" />
                    </span>{" "}
                    {owner[0].email}
                  </a>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
          <div className={styles.staffContainer}>
            {others.map((person, i) => (
              <FadeInOnScroll key={i} className={styles.staffCard}>
                <div className={styles.staffImage}>
                  <Image
                    src={person.headshot.url}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={person.headshot.lqip}
                  />
                </div>
                <h3>{person.name}</h3>
                <p>{person.title}</p>
                <p className={styles.staffContact}>{person.phoneNumber}</p>

                <p className={styles.staffContact}>{person.email}</p>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const images = await sanityClient.fetch(GET_IMAGES_BY_PAGE("about"));
  const staffs = await sanityClient.fetch(GET_STAFF);

  return {
    props: {
      images,
      staffs,
    },
    revalidate: 30,
  };
}
