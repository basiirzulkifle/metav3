import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, CardActionArea, Skeleton } from "@mui/material";

import { getAllProduct } from "../api/productApi";
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { Stack, useMediaQuery, Grid } from "@mui/material";
// import CarouselImg from "./Carousel";

const CardFeed = ({ data }: { data: any }) => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const [expanded, setExpanded] = React.useState(false);
  const [projectDetail, setProjectDetail] = React.useState<any[]>([]);
  const [productId, setProductId] = React.useState<any>();
  const [open, setOpen] = useState(false);
  const [openDrawer, setDrawer] = useState(false);
  const mobileVersion = useMediaQuery("(max-width:425px)");
  const [loading, setLoading] = React.useState<any>(true);
  const [isError, setError] = React.useState<any>();
  // const popupProduct = (item: { id: any }) => {
  //   setProductId(item.id);
  //   setDrawer(true);
  // };

  const handleChange = () => setOpen(!open);

  const handleDrawer = (e: any) => {
    setDrawer(true);

    setProductId(e);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  React.useEffect(() => {
    getAllProduct(data).then((res: any) => {
      setLoading(false);
      if (res?.data.length == 0) {
        setError("Not Found");
      }
      if (res?.data.length != 0) {
        setProjectDetail(res?.data);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("data", data);

  return (
    <>
      {openDrawer && (
        <SwipeableEdgeDrawer
          data={productId}
          onClick={handleChange}
          value={openDrawer}
          setDrawerState={setDrawer}
        />
      )}

      <Grid sx={{ justifyContent: "space-around" }} container spacing={2}>
        {isError && (
          <>
            <Grid item>
              <Card
                sx={{
                  maxWidth: mobileVersion ? 138 : 500,
                  width: "50vw",
                  marginBottom: 0.5,
                  boxShadow: "none",
                  mb: 0,
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ fontSize: 16 }}
                    component="div"
                  >
                    Not found
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}

        {loading && (
          <>
            <Grid item>
              <Skeleton variant="rectangular" width="170px" height="200px">
                <Card
                  sx={{
                    maxWidth: mobileVersion ? 138 : 170,
                    marginBottom: 0.5,
                  }}
                >
                  <CardActionArea>
                    <CardMedia component="img" alt="green iguana" />

                    <CardContent sx={{ bgcolor: "#ff6d00" }}>
                      <Typography
                        gutterBottom
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                        component="div"
                      ></Typography>

                      <Typography variant="body2" color="#fff">
                        <span className="">$</span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Skeleton>
            </Grid>

            <Grid item>
              <Skeleton variant="rectangular" width="170px" height="200px">
                <Card
                  sx={{
                    maxWidth: mobileVersion ? 138 : 170,
                    marginBottom: 0.5,
                  }}
                >
                  <CardActionArea>
                    <CardMedia component="img" alt="green iguana" />

                    <CardContent sx={{ bgcolor: "#ff6d00" }}>
                      <Typography
                        gutterBottom
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                        component="div"
                      ></Typography>

                      <Typography variant="body2" color="#fff">
                        <span className="">$</span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Skeleton>
            </Grid>

            <Grid item>
              <Skeleton variant="rectangular" width="170px" height="200px">
                <Card
                  sx={{
                    maxWidth: mobileVersion ? 138 : 170,
                    marginBottom: 0.5,
                  }}
                >
                  <CardActionArea>
                    <CardMedia component="img" alt="green iguana" />

                    <CardContent sx={{ bgcolor: "#ff6d00" }}>
                      <Typography
                        gutterBottom
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                        component="div"
                      ></Typography>

                      <Typography variant="body2" color="#fff">
                        <span className="">$</span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Skeleton>
            </Grid>
          </>
        )}

        {projectDetail &&
          !loading &&
          projectDetail?.map((item, key) => {
            return (
              <>
                <Grid item>
                  <Card
                    sx={{
                      maxWidth: mobileVersion ? 138 : 170,
                      marginBottom: 0.5,
                      height: "262px",
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: "150px",
                        width: "300px",
                      }}
                      component="img"
                      image={`${backEndUrl}/product/${item?.product_image}`}
                      alt="green iguana"
                      onClick={() => handleDrawer(item)}
                    />

                    <CardContent sx={{ bgcolor: "#ff6d00", height: "inherit" }}>
                      <Typography
                        gutterBottom
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                        component="div"
                      >
                        {item?.name}
                      </Typography>

                      <Typography variant="body2" color="#fff">
                        <span className="">$</span>
                        {item?.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            );
          })}
      </Grid>
    </>
  );
};

export default CardFeed;
