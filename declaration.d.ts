declare module "*.scss";
declare module "*.css";
declare module "*.module.css";
import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: false; // adds the `tablet` breakpoint
    laptop: false;
    desktop: false;
  }

  interface Theme extends MuiTheme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {}
}

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}


declare module '@mui/styles' {
  interface DefaultTheme extends MuiTheme {}
}