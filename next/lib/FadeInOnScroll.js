import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { useSpring, animated as a } from "react-spring";

const FadeInOnScroll = ({ children, className }) => {
  const [state, setState] = useState({ visible: false });

  const fadeIn = useSpring({
    opacity: state.visible ? "1" : "0",
  });

  const onChangeVisibility = (isActive) =>
    setState({ ...state, visible: isActive });

  return (
    <VisibilitySensor
      delayedCall
      partialVisibility
      minTopValue={100}
      onChange={(e) => onChangeVisibility(e)}
      active={!state.visible}
    >
      <a.div style={fadeIn} className={className}>
        {children}
      </a.div>
    </VisibilitySensor>
  );
};

export default FadeInOnScroll;
