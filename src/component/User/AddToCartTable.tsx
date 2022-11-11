import {
  Grid,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import theme from "../../style/theme";
import AvatarExtend from "../AvatarExtend";

import * as Yup from "yup";
// assets
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

import {
  useFormik,
  Form,
  FormikProvider,
  useField,
  FieldHookConfig,
} from "formik";
import BasicSelect from "../UiUx/BasicSelect";
import {
  deleteCartByCartId,
  setAddToCart,
  setScheduleProductById,
} from "../../api/productApi";

import { toDay } from "../../helper/toDay";

import useMediaQuery from "@mui/material/useMediaQuery";
import { borderRadius } from "@mui/system";

const Increment = ({
  itemId,
  quantity,
}: // updateQuantity,
{
  itemId: any;
  quantity: any;
  // updateQuantity: any;
}) => {
  const [value, setValue] = useState(quantity);

  const incrementHandler = () => {
    setValue(value - 1);
    // updateQuantity(itemId, value - 1);
  };

  const decrementHandler = () => {
    setValue(value + 1);
    // updateQuantity(itemId, value + 1);
  };

  return (
    <ButtonGroup
      size="large"
      variant="text"
      color="inherit"
      sx={{ border: "1px solid", borderColor: "grey.400" }}
    >
      <Button
        key="three"
        disabled={value <= 1}
        onClick={incrementHandler}
        sx={{ pr: 0.75, pl: 0.75, minWidth: "0px !important" }}
      >
        <RemoveIcon fontSize="inherit" />
      </Button>
      <Button key="two" sx={{ pl: 0.5, pr: 0.5 }}>
        {value}
      </Button>
      <Button
        key="one"
        onClick={decrementHandler}
        sx={{ pl: 0.75, pr: 0.75, minWidth: "0px !important" }}
      >
        <AddIcon fontSize="inherit" />
      </Button>
    </ButtonGroup>
  );
};

const validationSchema = Yup.object({
  color: Yup.string().required("Color selection is required"),
  size: Yup.number().required("Size selection is required."),
});

const AddToCartTable = ({ data }: { data: any }) => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const [availableDate, setAvailableDate] = useState<any>([]);

  const [scheduleId, setScheduleId] = useState({ delivery_date: "", id: null });

  const matches = useMediaQuery("(max-width:425px)");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data?.id,
      name: data?.name,
      image: data?.product_image,
      price: data?.price,
      booth_id: data?.booth_id,
      quantity: 1,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const {
    values,
    errors,
    status,
    handleSubmit,
    handleChange,
    setStatus,
    setErrors,
  } = formik;

  const handleChange1 = (index: any) => {
    const todayDate = toDay("today");

    const formObj = {
      date: todayDate,
      product_id: index,
    };

    setScheduleProductById(formObj).then((res: any) => {
      setAvailableDate(res?.data);
    });
  };

  const sendDataToParent = (index: any) => {
    setScheduleId(index);
  };

  const addCart = async (row: any) => {
    setStatus("");

    const { id, image, name, price, booth_id, quantity, product_id } = row;

    const FormDataObj = {
      user_id: 1,
      product_id: product_id,
      quantity: quantity,
      booth_id: booth_id,
      price_qty: 10,
      delivery_schedule_id: scheduleId?.id,
    };

    console.log("FormDataObj", FormDataObj);

    setAddToCart(FormDataObj).then((res: any) => {
      if (res?.data?.success == "Add to Cart successfully") {
        const a = window.document.getElementById("buttonAddToCartRefresh");
        a?.click();

        setStatus("Date Updated Successfully");
        console.log("res----?", res);
      }
    });
  };

  const removeCart = async (id: any) => {
    console.log("id", id);
    deleteCartByCartId(id).then((res) => {
      console.log("res delete", res);
      const a = window.document.getElementById("buttonAddToCartRefresh");
      a?.click();
      const rowData = window.document.getElementById(`tr${id}`);
      rowData?.remove();
    });
  };

  // useEffect(() => {
  //   if (productById == undefined && availableDate == []) {
  //     setScheduleProductById(formObj).then((res: any) => {
  //       setAvailableDate(res?.data);
  //     });
  //   }
  // }, [productById, availableDate]);

  console.log("data", data);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              borderTop: "1px solid",
              color: "grey.200",
            }}
          >
            <TableRow>
              <TableCell align="left">Vendor</TableCell>
              <TableCell align="left">Images</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="center">unit Price (SGD)</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total (SGD)</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: any) => {
              return (
                <>
                  <TableRow
                    id={`tr${row.id}`}
                    key={index}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item md={8}>
                          <Typography variant="subtitle1">
                            Vendor {row?.booth_id}
                          </Typography>

                          <Typography variant="caption">
                            <b>Your Selected Delivery Date:</b>
                            <br />
                            {row?.delivery_date}
                          </Typography>
                          <br />
                          <br />

                          <Stack
                            direction={"row"}
                            sx={{
                              maxWidth: "100%",
                              width: matches ? "30vw" : "21vw",
                            }}
                            onMouseEnter={() => {
                              handleChange1(row?.product_id);
                            }}
                            onTouchStart={() => {
                              handleChange1(row?.product_id);
                            }}
                          >
                            <BasicSelect
                              data={availableDate}
                              errors={errors}
                              sendDataToParent={sendDataToParent}
                            />
                            <Button
                              onClick={() => {
                                addCart(row);
                              }}
                              variant="contained"
                            >
                              Update
                            </Button>
                          </Stack>
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
                      </Grid>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid>
                          <AvatarExtend
                            src={`${backEndUrl}/product/${row?.product_image}`}
                            color={undefined}
                            outline={undefined}
                            size="lg"
                            sx={{
                              borderRadius: "0px",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Typography variant="subtitle1">
                            {row?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>

                    <TableCell align="center">
                      <Stack>
                        <Typography variant="subtitle1">
                          {row?.price_qty}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Increment
                        quantity={row?.quantity}
                        itemId={row?.id}
                        // updateQuantity={updateQuantity}
                      />
                      {/* {row?.quantity} */}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {Number(row?.price_qty * row?.quantity)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => removeCart(row.id)}
                        size="large"
                      >
                        <CloseIcon sx={{ color: "grey.500" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  <hr />
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Grid item xs={12}>
        <OrderSummary checkout={checkout} />
      </Grid> */}

      {/*  <Grid item xs={12}>
          <Grid
            direction={matchDownMD ? "column-reverse" : "row"}
            container
            spacing={3}
            alignItems={matchDownMD ? "" : "center"}
          >
            <Grid item xs={12} md={7} lg={8}>
              <Button
                component={Link}
                href="/app/e-commerce/products"
                variant="text"
                startIcon={<KeyboardBackspaceIcon />}
              >
                Continue Shopping
              </Button>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Stack spacing={gridSpacing}>
                <CartDiscount />
                <Button variant="contained" fullWidth onClick={onNext}>
                  Check Out
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid> */}
    </>
  );
};

export default AddToCartTable;
