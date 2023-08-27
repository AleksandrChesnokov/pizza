import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    totalPrice: 0,
    pizzas: {},
  },
  reducers: {
    basket: (state, action) => {
      if (!state.pizzas[action.payload.key]) {
        state.pizzas[action.payload.key] = action.payload;
        state.totalPrice += action.payload.price;
      } else {
        state.pizzas[action.payload.key].count = ++state.pizzas[
          action.payload.key
        ].count;
        state.pizzas[action.payload.key].price += action.payload.price;
        state.totalPrice += action.payload.price;
      }
    },
  },
});

export const { basket } = basketSlice.actions;

export default basketSlice.reducer;
