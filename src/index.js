import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./rtk/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import { Main } from "./components/MainPage/Main";
import { Basket } from "./components/BasketPage/Basket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        errorElement: <NotFoundPage />,
        children: [
          { index: true, element: <Main /> },
          {
            path: "basket",
            element: <Basket />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
