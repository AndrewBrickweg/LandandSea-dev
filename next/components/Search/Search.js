import { useRouter } from "next/router";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { typeaheadOptions } from "../../utils/constants";
import styles from "./Search.module.scss";

export default function Search({
  heading,
  altText,
  hasBackground = false,
  fullScreen = false,
  condensed = false,
  ...rest
}) {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleChange = (event, newValue) => setValue(newValue);

  const handleInputChange = (event, newInputValue) =>
    setInputValue(newInputValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${value}`);
  };

  return (
    <section
      id="searchBar"
      className={fullScreen ? styles.fullScreen : styles.container}
      {...rest}
    >
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.alt}>{altText}</p>

      <div className={hasBackground ? styles.background : styles.wrapper}>
        <form
          onSubmit={handleSubmit}
          className={condensed ? styles.condensed : styles.form}
        >
          <div className={styles.search}>
            <Autocomplete
              value={value}
              onChange={handleChange}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              id="listingSearch"
              freeSolo
              disableClearable
              options={typeaheadOptions.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  hiddenLabel
                  placeholder="Search for City, Town or Zip in Brevard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon="magnifying-glass" />
                      </InputAdornment>
                    ),
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </div>
          <Button
            style={{ marginLeft: "1.5rem" }}
            onClick={handleSubmit}
            type="submit"
            className={styles.button}
            variant="contained"
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
