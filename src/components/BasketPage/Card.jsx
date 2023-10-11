import { nanoid } from "@reduxjs/toolkit";
import styles from "./BasketPage.module.scss";
import { removeAllFromBasket } from "../../rtk/basketSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PizzaInCard } from "./PizzaInCard";
import { ContactInfoForm } from "./ContactInfoForm";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export function Card() {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state) => state.basket.pizzas);
  const totalPrice = useSelector((state) => state.basket.totalPrice);

  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.basketIcon}>
          <ShoppingCartOutlinedIcon
            sx={{ height: 30, width: 30, color: "#00000082" }}
          />
          Корзина
        </div>
        <div
          className={styles.dltButton}
          onClick={() => dispatch(removeAllFromBasket(itemsInBasket))}
        >
          <DeleteOutlineOutlinedIcon
            sx={{ height: 30, width: 30, color: "#00000082" }}
          />
          Очистить корзину
        </div>
      </div>
      <div>
        {Object.keys(itemsInBasket).map((key) => (
          <PizzaInCard key={nanoid()} prop={itemsInBasket[key]} />
        ))}
      </div>
      <div className={styles.total}>
        <span>Итого:</span>
        <span>{totalPrice}₽</span>
      </div>
      <div className="delivery-container">
        <h2>Оформление заказа</h2>
        <ContactInfoForm />
      </div>
      <div className={styles.buttonOrder}>
        <button onClick={() => setModalActive(!modalActive)}>
          Оформить заказ
        </button>
        {modalActive && (
          <div className={styles.order}>
            <div className={styles.modal}></div>
          </div>
        )}
      </div>
    </div>
  );
}
