import { Button as ButtonMaterial } from "@mui/material";
import styles from "./Button.module.scss";

// can add more variants but needs to be handled from here for future to stay consistent.
const Button = (props) => {
  const buttonStyle =
    props.variant === "outlined" ? styles.ButtonOutlined : styles.Button;
  return <ButtonMaterial {...props} className={buttonStyle} />;
};

export default Button;
