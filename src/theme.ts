import { createTheme } from "@mui/material";
const TopicColor = "#00404e";
const SubColor = "#ffe6d4";
const theme = createTheme({
  palette: {
    primary: {
      main: TopicColor,
      contrastText: "#fff",
      light: "#005468",
    },
    secondary: {
      main: SubColor,
      dark: "#fe3d3c",
      contrastText: TopicColor,
    },
    text: {
      primary: TopicColor,
    },
    divider: TopicColor,
    background: {
      default: "#fffaf9",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
