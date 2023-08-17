import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    value: 0,
  },
  reducers: {
    sortNum: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { sortNum } = sortSlice.actions;

export default sortSlice.reducer;
