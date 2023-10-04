import { createSlice } from "@reduxjs/toolkit";
import { getPizzasLS } from "../utils/getPizzasLS";
import { getTotalPriceLS } from "../utils/getTotalPriceLS";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    totalPrice: getTotalPriceLS(),
    pizzas: getPizzasLS(),
  },
  reducers: {
    basket: (state, action) => {
      const { price, key } = action.payload;
      if (!state.pizzas[key]) {
        state.pizzas[key] = action.payload;
        state.pizzas[key].initialPrice = price;
        state.totalPrice += price;
      } else {
        state.pizzas[key].count = ++state.pizzas[key].count;
        state.pizzas[key].price += price;
        state.totalPrice += price;
      }
    },
    increment: (state, action) => {
      const { initialPrice, key } = action.payload;
      for (let prop in state.pizzas) {
        if (prop === key) {
          state.pizzas[prop].price += initialPrice;
          state.pizzas[prop].count = ++state.pizzas[prop].count;
          state.totalPrice += initialPrice;
        }
      }
    },
    decrement: (state, action) => {
      const { initialPrice, key } = action.payload;
      for (let prop in state.pizzas) {
        if (prop === key && state.pizzas[prop].count > 1) {
          state.pizzas[prop].price -= initialPrice;
          state.pizzas[prop].count = --state.pizzas[prop].count;
          state.totalPrice -= initialPrice;
        }
      }
    },
    remove: (state, action) => {
      for (let prop in state.pizzas) {
        if (prop === action.payload.key) {
          state.totalPrice -= state.pizzas[prop].price;
          delete state.pizzas[prop];
        }
      }
    },
    removeAll: (state) => {
      for (let prop in state.pizzas) {
        delete state.pizzas[prop];
        state.totalPrice = 0;
      }
    },
  },
});

export const { basket, increment, decrement, remove, removeAll } =
  basketSlice.actions;

export default basketSlice.reducer;
