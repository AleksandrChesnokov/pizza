import { useSelector, useDispatch } from "react-redux";
import { PizzaInBasket } from "./PizzaInBasket";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./BasketPage.module.scss";
import { removeAll } from "../../rtk/basketSlice";

import dlt from "../../img/free-icon-delete-1214428.png";
import basketImg from "../../img/free-icon-shopping-cart-711897.png";
import packageIcon from "../../img/package.png";

export function Basket() {
  const hasItems = useSelector((state) => state.basket.pizzas);

  return <>{Object.keys(hasItems).length > 0 ? <Card /> : <EmptyCard />}</>;
}

function EmptyCard() {
  return (
    <div className={styles.empty}>
      <h1>Ваша корзина пуста</h1>
      <p>
        Выберите блюда из меню или оставьте заявку, и мы поможем вам с заказом.
      </p>
      <img src={packageIcon} alt="package" />
    </div>
  );
}

function Card() {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state) => state.basket.pizzas);
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.basket}>
          <img src={basketImg} alt="basket" />
          Корзина
        </div>
        <div
          className={styles.dltButton}
          onClick={() => dispatch(removeAll(itemsInBasket))}
        >
          <img src={dlt} alt="basket" />
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
