import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const devEnv = process.env.NODE_ENV !== "production";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      devEnv
        ? "http://localhost:5000"
        : "https://mern-ecommerce-app-with-paypal.onrender.com/"
    }`,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/product",
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
    }),
    getOrdersByUser: builder.query({
      query: () => ({
        url: "/orders/mine",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetOrderByIdQuery,
  useGetOrdersByUserQuery,
} = productApi;
