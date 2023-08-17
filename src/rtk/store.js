import { configureStore } from "@reduxjs/toolkit";
import sort from "./sortSlice";
import { apiSlice } from "./apiSlice";

export default configureStore({
  reducer: {
    sort: sort,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
