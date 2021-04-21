import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

const theme = unstable_createMuiStrictModeTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#35c265",
    },
  },
});

export default theme;
