import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    value: 0,
    filterValue: 1,
    searchValue: "",
    popup: false,
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
    setTogglePopup: (state, action) => {
      state.popup = action.payload;
    },
  },
});

export const {
  updateProductCategoriesValue,
  setSortIndex,
  updateSearchValue,
  setTogglePopup,
} = sortSlice.actions;

export default sortSlice.reducer;
