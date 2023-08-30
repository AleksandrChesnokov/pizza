import { useSelector, useDispatch } from "react-redux";
import { PizzaInBasket } from "./PizzaInBasket";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./BasketPage.module.scss";
import { removeAll } from "../../rtk/basketSlice";
import dlt from "../../img/free-icon-delete-1214428.png";
import basketImg from "../../img/free-icon-shopping-cart-711897.png";

export function Basket() {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state) => state.basket.pizzas);
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const hasItems = useSelector((state) => {
    for (let key in state.basket.pizzas) {
      if (key) {
        return true;
      } else {
        return false;
      }
    }
  });
  console.log(hasItems);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.basket}>
          <img src={basketImg} alt="" />
          Корзина
        </div>
        <div
          className={styles.dltButton}
          onClick={() => dispatch(removeAll(itemsInBasket))}
        >
          <img src={dlt} alt="" />
          Очистить корзину
        </div>
      </div>
      <div>
        {Object.keys(itemsInBasket).map((key) => (
          <PizzaInBasket key={nanoid()} prop={itemsInBasket[key]} />
        ))}
      </div>
      <div className={styles.total}>
        <span>Итого:</span>
        <span>{totalPrice}₽</span>
      </div>
    </div>
  );
}
