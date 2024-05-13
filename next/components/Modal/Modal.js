import { forwardRef } from "react";
import Image from "next/image";
import { Grid, Button, Backdrop, Modal } from "@mui/material";
import { useSpring, animated } from "react-spring/web.cjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMediaQuery from "../../utils/useMediaQuery";
import styles from "./Modal.module.scss";

const Fade = forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function SpringModal({ open, handleClose, children }) {
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Button
            variant="contained"
            className={styles.close}
            onClick={handleClose}
          >
            close
          </Button>
          {children}
        </Fade>
      </Modal>
    </div>
  );
}
