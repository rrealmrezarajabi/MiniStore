import axios from "axios";

const URL = "https://fakestoreapi.com";

export const featuredProducts = async () => {
  const res = await axios.get(`${URL}/products?limit=4`);
  return res.data;
};

export const allProducts = async () => {
  const res = await axios.get(`${URL}/products`);
  return res.data;
};

export const productsDetails = async (id) => {
  const res = await axios.get(`${URL}/products/${id}`);
  return res.data;
};
