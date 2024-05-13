import { createTheme } from "@mui/material/styles";

const routes = [
  { title: "home", path: "/" },
  { title: "about us", path: "/about" },
  { title: "find a home", path: "/listings" },
  { title: "sell with us", path: "/sell" },
];

const theme = createTheme({
  typography: {
    fontFamily: "Spartan, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: "3.5rem",
          width: "10rem",
          letterSpacing: "-0.34px",
          fontWeight: "bold",
          textTransform: "inherit",
          lineHeight: "17px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "Hind Madurai, sans-serif",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { fontWeight: "600" },
      },
    },
  },
  palette: {
    primary: {
      main: "#0a4459",
    },
    secondary: {
      main: "#5fa5aa",
    },
  },
});

const typeaheadOptions = [
  { title: "Cape Canaveral" },
  { title: "Cocoa" },
  { title: "Cocoa Beach" },
  { title: "Grant" },
  { title: "Indialantic" },
  { title: "Malabar" },
  { title: "Melbourne" },
  { title: "Melbourne Beach" },
  { title: "Merritt Island" },
  { title: "Mims" },
  { title: "Palm Bay" },
  { title: "Rockledge" },
  { title: "Satellite Beach" },
  { title: "Sebastian" },
  { title: "Titusville" },
  { title: "Indian Harbour Beach" },
  { title: "West Melbourne" },
  { title: "Palm Shores" },
  { title: "Viera" },
  { title: "32907" },
  { title: "32955" },
  { title: "32935" },
  { title: "32940" },
  { title: "32780" },
  { title: "32904" },
  { title: "32909" },
  { title: "32926" },
  { title: "32905" },
  { title: "32937" },
  { title: "32927" },
  { title: "32953" },
  { title: "32901" },
  { title: "32952" },
  { title: "32796" },
  { title: "32934" },
  { title: "32922" },
  { title: "32931" },
  { title: "32903" },
  { title: "32951" },
  { title: "32908" },
  { title: "32754" },
  { title: "32920" },
  { title: "32976" },
  { title: "32950" },
  { title: "32948" },
  { title: "32949" },
  { title: "32925" },
  { title: "32815" },
  { title: "32919" },
  { title: "32775" },
  { title: "32781" },
  { title: "32783" },
  { title: "32782" },
  { title: "32902" },
  { title: "32906" },
  { title: "32911" },
  { title: "32910" },
  { title: "32912" },
  { title: "32924" },
  { title: "32923" },
  { title: "32932" },
  { title: "32936" },
  { title: "32941" },
  { title: "32954" },
  { title: "32956" },
  { title: "32959" },
];

export { routes, theme, typeaheadOptions };
