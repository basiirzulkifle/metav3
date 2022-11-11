import { CommitSharp } from "@mui/icons-material";
import axios from "axios";
import axiosRetry from "axios-retry";
// import getConfig from "./apiConfig";

axiosRetry(axios, { retries: 3 });

const myVar = import.meta.env.VITE_BACKEND_URL;
const getAllProduct = async (booth_id: number) => {
  try {
    const response = await axios.get(
      `${myVar}/api/products/?booth_id=${booth_id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};

const setAddToCart = async (formObj: any) => {
  try {
    const response = await axios.post(`${myVar}/api/carts/`, formObj);
    return response;
  } catch (err) {
    return err;
  }
};

const getAddToCartByUserId = async (user_id: number) => {
  try {
    const response = await axios.get(`${myVar}/api/carts/${user_id}`);
    return response;
  } catch (err) {
    return err;
  }
};

const setScheduleProductById = async (formObj: any) => {
  try {
    const response = axios.post(`${myVar}/api/schedule`, formObj);
    return response;
  } catch (err) {
    return err;
  }
};

const deleteCartByCartId = async (id: any) => {
  try {
    const response = axios.delete(`${myVar}/api/carts/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

export {
  getAllProduct,
  setAddToCart,
  getAddToCartByUserId,
  setScheduleProductById,
  deleteCartByCartId,
};
