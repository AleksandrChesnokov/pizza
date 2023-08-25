import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    value: 0,
    filterValue: 0,
    searchValue: "",
  },
  reducers: {
    sortNum: (state, action) => {
      state.value = action.payload;
    },
    filterNum: (state, action) => {
      state.filterValue = action.payload;
    },
    addSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { sortNum, filterNum, addSearchValue } = sortSlice.actions;

export default sortSlice.reducer;
