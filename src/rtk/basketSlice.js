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
    addToBasket: (state, action) => {
      const { price, key } = action.payload;
      const pizza = state.pizzas[key];
      if (!pizza) {
        state.pizzas[key] = action.payload;
        state.totalPrice += price;
      } else {
        pizza.count += 1;
        pizza.price += price;
        state.totalPrice += price;
      }
    },
    increment: (state, action) => {
      const { initialPrice, key } = action.payload;
      const pizza = state.pizzas[key];
      pizza.price += initialPrice;
      pizza.count += 1;
      state.totalPrice += initialPrice;
    },
    decrement: (state, action) => {
      const { initialPrice, key } = action.payload;
      const pizza = state.pizzas[key];
      if (pizza.count > 1) {
        pizza.price -= initialPrice;
        pizza.count -= 1;
        state.totalPrice -= initialPrice;
      }
    },
    removeFromBasket: (state, action) => {
      const { key } = action.payload;
      const pizza = state.pizzas[key];
      if (pizza) {
        state.totalPrice -= pizza.initialPrice * pizza.count;
        delete state.pizzas[key];
      }
    },
    removeAllFromBasket: (state) => {
      state.pizzas = {};
      state.totalPrice = 0;
    },
  },
});

export const {
  addToBasket,
  increment,
  decrement,
  removeFromBasket,
  removeAllFromBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
