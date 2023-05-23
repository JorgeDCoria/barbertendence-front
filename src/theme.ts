import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Palette {
    customDark?: PaletteOptions['primary'];
  }

  interface PaletteOptions {
    customDark?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    
    primary: {
      main: '#7F217D',
      light: '#FAEBF9',
      dark: '#140514',
      100: "#EFC2EE",
      200: "#E59AE3",
      300: "#DA71D8",
      400: "#D049CD",
      500: "#B62FB3",
      600: "#8E258B",
      700: "#651A64",
      800: "#3D103C",
      
      contrastText: '#fff',
    },
    secondary: {
      main: '#446FB2',
      light: '#EDF1F8',
      dark: '#070C12',
      100: "#C8D5EA",
      200: "#A3B9DC",
      300: "#7E9DCE",
      400: "#5981C0",
      500: "#3F68A6",
      600: "#315181",
      700: "#233A5C",
      800: "#152337",
    },
    grey: {
      50: '#F3F2F3',
      100: '#DAD7DA',
      200: '#C2BDC2',
      300: '#A9A2A9',
      400: '#918891',
      500: '#776E77',
      600: '#5D565D',
      700: '#423D42',
      800: '#282528',
      900: '#0D0C0D',
    },
    customDark:{
      main: 'rgba(0,0,0,0.8)'
    },
  },
  typography:{
    fontFamily:['Open Sans',"sans-serif"].join(','),
    h1:{fontFamily:["Poppins", "sans-serif"].join(',')},
    h2:{fontFamily:["Raleway", "sans-serif"].join(',')},
  },
});

export default theme;
