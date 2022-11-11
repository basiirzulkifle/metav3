import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardMedia, Grid, useMediaQuery } from "@mui/material";

// project import
// import MainCard from "components/ui-component/cards/MainCard";
// import Avatar from "components/ui-component/extended/Avatar";
// import { gridSpacing } from "store/constant";

// third-party
// import useConfig from "../../../../hooks/useConfig";

// assets
const prod1 =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";
const prod2 =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";
const prod3 =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";
const prod4 =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";
const prod5 =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";
const prod6 =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";
const prod7 =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";
const prod8 =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";

const prodImage =
  "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000";

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ product }: { product: any }) => {
  const theme = useTheme();

  const matchDownLG = useMediaQuery(theme.breakpoints.up("lg"));
  const myVar = import.meta.env.VITE_BACKEND_URL;

  const initialImage = `${myVar}/product/${product?.product_image}`;

  const [selected, setSelected] = useState(initialImage);

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          image={selected}
          sx={{
            height: "50vh",
            width: "-webkit-fill-available",
            overflow: "hidden",
          }}
        />
      </Card>
    </>
  );
};

export default ProductImages;
