import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { darkScrollbar } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: red.A400,
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    // Name of the component
    MuiTabs: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // backgroundColor: "white",
        },
        flexContainer: {
          // backgroundColor: "white",
          height: "50px",
          justifyContent: "center",
          button: {
            // Some CSS
            minHeight: "auto",
            fontWeight: 600,
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
      },
    },

    MuiModal: {
      styleOverrides: {
        root: {
          // position: "relative",
          zIndex: "1500 !important",
        },

        // backdrop: {
        //   backgroundColor: "transparent",
        // },
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        root: {
          textAlign: "left",
          paddingLeft: "0",
        },

        label: {
          fontWeight: "bold",
        },

        labelContainer: {
          fontSize: "15px",
        },
        iconContainer: {
          fontSize: "30px",
          position: "relative",
          left: "1%",
        },
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: "40px",
          color: "black",
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        // root: { backgroundColor: "white", borderRadius: "50px" },
        // button: {
        //   "&:hover": {
        //     backgroundColor: "#fff",
        //     color: "#3c52b2",
        //   },
        // },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {},
        title: {
          fontWeight: "bold",
          textTransform: "uppercase",
        },
      },
    },

    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "white",
          backgroundColor: "red",
        },
        arrow: {
          color: "red",
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {},
        line: {
          borderTopWidth: "2px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {},
        input: {
          fontSize: "1.125rem",
          "@media (max-width:600px)": {
            fontSize: "17px",
          },
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          maxWidth: "100px",
        },
      },
    },
  },

  typography: {
    h4: {
      fontSize: "2.125rem",
      "@media (max-width:600px)": {
        fontSize: "17px",
      },
    },

    h3: {
      fontSize: "1.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.9em",
        fontWeight: 500,
      },
    },
    body1: {
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
    body2: {
      "@media (max-width:600px)": {
        fontSize: "15px",
      },
    },
  },
});

export default theme;
