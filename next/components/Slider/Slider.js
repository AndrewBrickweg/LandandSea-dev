import { useState } from "react";
import Slider from "@mui/material/Slider";
import { numberWithCommas } from "../../utils/helpers";
import useMediaQuery from "../../utils/useMediaQuery";
import styles from "./Slider.module.scss";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ min, max }) {
  const isDesktop = useMediaQuery(`(min-width: 639px)`);
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <Slider
        min={min}
        max={max}
        step={50000}
        marks
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        valueLabelFormat={(value) =>
          isDesktop ? (
            <div>${numberWithCommas(value)}</div>
          ) : (
            <div>${numberWithCommas(value / 1000)}k</div>
          )
        }
        getAriaValueText={valuetext}
      />
    </div>
  );
}
