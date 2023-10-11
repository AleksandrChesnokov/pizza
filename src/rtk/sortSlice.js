import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    value: 0,
    filterValue: 1,
    searchValue: "",
    isLoad: false,
  },
  reducers: {
    updateProductCategoriesValue: (state, action) => {
      state.value = action.payload;
    },
    setSortIndex: (state, action) => {
      state.filterValue = action.payload;
    },
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    toggleInitLoading: (state, action) => {
      state.isLoad = action.payload;
    },
  },
});

export const {
  updateProductCategoriesValue,
  setSortIndex,
  updateSearchValue,
  toggleInitLoading,
} = sortSlice.actions;

export default sortSlice.reducer;
