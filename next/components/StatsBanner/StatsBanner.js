import { useMemo } from "react";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import Image from "next/image";
import { useSpring, animated as a } from "react-spring";
import FadeInOnScroll from "../../lib/FadeInOnScroll";
import { transformNumber } from "../../utils/helpers";
import styles from "./StatsBanner.module.scss";

export default function StatsBanner() {
  const [state, setState] = useState({ visible: false });

  const stats = {
    satisfiedClients: useSpring({
      val: state.visible ? 500 : 0,
      from: { val: 0 },
    }),
    listings: useSpring({ val: state.visible ? 20 : 0, from: { val: 0 } }),
    sales: useSpring({ val: state.visible ? 45000000 : 0, from: { val: 0 } }),
  };

  const items = useMemo(() => [
    {
      img: "joy.jpg",
      text: () => (
        <p>
          Over
          <br />
          <a.span style={stats.satisfiedClients}>
            {transformNumber(stats.satisfiedClients)}
          </a.span>
          <br />
          Satisfied Clients
        </p>
      ),
    },
    {
      img: "signing.jpg",
      text: () => (
        <p>
          <a.span style={stats.listings}>
            {transformNumber(stats.listings)}
          </a.span>
          <br />
          Years of experience
        </p>
      ),
    },
    {
      img: "keys.jpg",
      text: () => (
        <p>
          <span>$</span>
          <a.span style={stats.sales}>{transformNumber(stats.sales)}</a.span>
          <br />
          in sales
          <br />
          all time
        </p>
      ),
    },
  ]);

  const onChangeVisibility = (isActive) =>
    setState({ ...state, visible: isActive });

  return (
    <FadeInOnScroll className={styles.container}>
      <h4>At a Glance</h4>
      <div className={styles.stats}>
        {items.map((item, i) => (
          <VisibilitySensor
            key={i}
            delayedCall
            partialVisibility
            minTopValue={100}
            onChange={(e) => onChangeVisibility(e)}
            active={!state.visible}
          >
            <div className={styles.item}>
              <Image src={`/images/${item.img}`} height={222} width={222} />
              {item.text()}
            </div>
          </VisibilitySensor>
        ))}
      </div>
    </FadeInOnScroll>
  );
}
