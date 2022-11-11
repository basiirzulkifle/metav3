import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

// third-party
import {
  useFormik,
  Form,
  FormikProvider,
  useField,
  FieldHookConfig,
} from "formik";
import * as yup from "yup";

// assets
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import {
  getAddToCartByUserId,
  setAddToCart,
  setScheduleProductById,
} from "../../api/productApi";
import Increment from "./Increment";
import { useEffect, useState } from "react";
import BasicSelect from "../UiUx/BasicSelect";

const validationSchema = yup.object({
  color: yup.string().required("Color selection is required"),
  size: yup.number().required("Size selection is required."),
});

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }: { product: any }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: product?.id,
      name: product?.name,
      image: product?.product_image,
      price: product?.price,
      booth_id: product?.booth_id,
      delivery_schedule_id: product?.delivery_schedule_id,
      quantity: 1,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values", values);

      // console.log("produc---t", product);
    },
  });

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hour = newDate.getHours();
  let mint = newDate.getMinutes();
  let sec = newDate.getSeconds();

  const [availableDate, setAvailableDate] = useState<any>([]);
  const [deliverId, setDeliverId] = useState<any>();
  const [errorsMsg, setErrorsMsg] = useState<any>();

  const sendDataToParent = (index: any) => {
    // the callback. Use a better name
    console.log("index--->", index);
    setDeliverId(index?.id);
  };

  const myDateString = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    date < 10 ? `0${date}` : `${date}`
  } ${hour}:${mint}:${sec}`;

  const {
    values,
    errors,
    status,
    handleSubmit,
    handleChange,
    setStatus,
    setErrors,
  } = formik;

  const addCart = async () => {
    setStatus("");

    const { id, image, name, price, quantity } = values;

    console.log("deliverId", deliverId);

    if (deliverId == undefined) {
      setErrors({ delivery_schedule_id: "please select one of the date" });
    } else {
      setErrors({ delivery_schedule_id: "" });
      const FormDataObj = {
        user_id: 1,
        product_id: id,
        quantity: quantity,
        booth_id: product?.booth_id,
        price_qty: 10,
        delivery_schedule_id: deliverId,
      };

      setAddToCart(FormDataObj).then((res: any) => {
        if (res?.data?.success == "Add to Cart successfully") {
          const a = window.document.getElementById("buttonAddToCartRefresh");
          a?.click();

          setStatus("Add to Cart successfully");
          console.log("res", res);
        }
      });
    }
  };

  const formObj = {
    date: myDateString,
    product_id: product?.id,
  };

  useEffect(() => {
    if (availableDate?.length == 0) {
      setScheduleProductById(formObj).then((res) => {
        setAvailableDate(res);
      });
    }
  }, [product.id, formObj]);

  return (
    <Stack>
      <Typography variant="h3">{product?.name}</Typography>

      <Typography variant="h6" sx={{ textAlign: "justify" }}>
        Description
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "justify" }}>
        {product?.detail}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 1 }}>
        <Typography variant="h4" sx={{ color: "black" }}>
          SGD {product?.price}
        </Typography>
      </Stack>
      <Divider sx={{ paddinTop: "1%" }} />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Table>
                <TableBody
                  sx={{ "& .MuiTableCell-root": { borderBottom: "none" } }}
                >
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2">Quantity</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Increment name="quantity" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: " flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Table>
                <TableBody
                  sx={{ "& .MuiTableCell-root": { borderBottom: "none" } }}
                >
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2">Available</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Box sx={{ minWidth: 120 }}>
                        {availableDate?.data?.length == 0 ? (
                          "Not Available"
                        ) : (
                          <>
                            <BasicSelect
                              errors={errors}
                              sendDataToParent={sendDataToParent}
                              data={availableDate.data}
                            />
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {availableDate?.data?.length != 0 && (
              <>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} md={5} lg={3}>
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        size="medium"
                        sx={{ backgroundColor: "#ff6600 " }}
                        startIcon={<ShoppingCartTwoToneIcon />}
                        onClick={addCart}
                        disabled={status ? true : false}
                      >
                        Add to Cart
                      </Button>
                      {status && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "green",
                            position: " relative",
                            top: "10%",
                          }}
                        >
                          {status}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={5} md={4} lg={3}>
                      <Button
                        type="submit"
                        fullWidth
                        sx={{ backgroundColor: " red" }}
                        variant="contained"
                        size="medium"
                      >
                        Buy Now
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default ProductInfo;
