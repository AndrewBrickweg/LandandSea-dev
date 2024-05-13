import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ListingSlider from "../ListingSlider/ListingSlider";
import styles from "./Tabs.module.scss";

function BasicTabs({ heading, tabs }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%" }} className={styles.container}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        allowScrollButtonsMobile
        className={styles.tabs}
        value={value}
        onChange={handleChange}
        aria-label="listing tabs"
      >
        {tabs &&
          tabs.map((tab, i) => (
            <Tab key={i} label={tab.title} {...a11yProps(i)} />
          ))}
      </Tabs>

      {tabs &&
        tabs.map((listing, i) => (
          <TabPanel key={i} className={styles.panel} value={value} index={i}>
            <ListingSlider sparkListings={listing?.data} />
          </TabPanel>
        ))}
    </Box>
  );
}

export default BasicTabs;
