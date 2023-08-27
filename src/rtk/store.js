import { configureStore } from "@reduxjs/toolkit";
import sort from "./sortSlice";
import { apiSlice } from "./apiSlice";
import basket from "./basketSlice";

export default configureStore({
  reducer: {
    sort: sort,
    basket: basket,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
