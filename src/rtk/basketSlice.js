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
      if (!state.pizzas[action.payload.key]) {
        state.pizzas[action.payload.key] = action.payload;
        state.pizzas[action.payload.key].initialPrice = action.payload.price;
        state.totalPrice += action.payload.price;
      } else {
        state.pizzas[action.payload.key].count = ++state.pizzas[
          action.payload.key
        ].count;
        state.pizzas[action.payload.key].price += action.payload.price;
        state.totalPrice += action.payload.price;
      }
    },
    increment: (state, action) => {
      for (let prop in state.pizzas) {
        if (prop === action.payload.key) {
          state.pizzas[prop].price += action.payload.initialPrice;
          state.pizzas[prop].count = ++state.pizzas[prop].count;
          state.totalPrice += action.payload.initialPrice;
        }
      }
    },
    decrement: (state, action) => {
      for (let prop in state.pizzas) {
        if (prop === action.payload.key && state.pizzas[prop].count > 1) {
          state.pizzas[prop].price -= action.payload.initialPrice;
          state.pizzas[prop].count = --state.pizzas[prop].count;
          state.totalPrice -= action.payload.initialPrice;
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
