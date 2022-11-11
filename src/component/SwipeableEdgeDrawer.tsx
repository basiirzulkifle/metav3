import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Construction } from "@mui/icons-material";
import { Grid, Stack, useMediaQuery } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
// import ColumnsGrid from "./ColumnsGrid";
import ProductInfo from "./ProductDetails/ProductInfo";
import ProductImages from "./ProductDetails/ProductImages";

const drawerBleeding = 30;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
  // backgroundImage: `url(${process.env.basePath}/images/bg1.jpg)`,
  backgroundSize: "cover",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: "23px",
  left: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer(props: {
  window: any;
  onClick: any;
  value: any;
  setDrawerState: any;
  data: any;
}) {
  const [open, setOpen] = React.useState(false);
  // const CardFeed = React.lazy(() => import("./CardFeed"));

  const { window, onClick, value, setDrawerState, data } = props;
  const url = import.meta.env.VITE_BACKEND_URL;
  const mobileVersion = useMediaQuery("(max-width:425px)");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const closeDrawer = () => {
    toggleDrawer(false);
    setDrawerState(false);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  React.useEffect(() => {
    if (value) {
      setOpen(value);
    }
  }, [value, setDrawerState]);

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc( ${
              mobileVersion ? "99%" : "99%"
            }  - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={closeDrawer}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          zIndex: 2000,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: 0 - drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            backgroundPosition: "top",
          }}
        >
          <Puller />

          <Stack direction="row" alignItems="center" justifyContent="right">
            <CloseIcon
              onClick={closeDrawer}
              sx={{
                width: mobileVersion ? "1.5em" : "2em",
                height: mobileVersion ? "1.5em" : "2em",
                zIndex: 100,
                position: "relative",
                mr: "12px",
                mt: 1,
                cursor: "pointer",
              }}
            />
          </Stack>
        </StyledBox>

        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            display: "flex",
            alignItems: mobileVersion ? "baseline" : " center",
            position: "relative",
          }}
        >
          <React.Suspense
            fallback={<Skeleton variant="rectangular" height="100%" />}
          >
            <Grid
              container
              sx={{
                flexGrow: 1,
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-evenly",

                position: "relative",
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                sx={{ p: mobileVersion ? 2 : 0 }}
              >
                <ProductImages product={data} />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={5}
                sx={{ p: mobileVersion ? 1 : 5 }}
              >
                <ProductInfo product={data} />
              </Grid>
            </Grid>
          </React.Suspense>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
