import { useSelector, useDispatch } from "react-redux";
import { PizzaInBasket } from "./PizzaInBasket";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./BasketPage.module.scss";
import { removeAll } from "../../rtk/basketSlice";
import { useState } from "react";

import dlt from "../../img/free-icon-delete-1214428.png";
import basketImg from "../../img/free-icon-shopping-cart-711897.png";
import packageIcon from "../../img/package.png";

export function Basket() {
  const hasItems = useSelector((state) => state.basket.pizzas);

  return <>{Object.keys(hasItems).length > 0 ? <Card /> : <EmptyCard />}</>;
}

function Card() {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state) => state.basket.pizzas);
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.iconBasket}>
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
      <div className="delivery-container">
        <h2>Оформление заказа</h2>
        <div className="street-form">
          <InputForm props={{ name: "street", text: "Улица" }} />
        </div>
        <div className="order-destination">
          <InputForm props={{ name: "apartment", text: "Квартира" }} />
          <InputForm props={{ name: "entrance", text: "Подъезд" }} />
          <InputForm props={{ name: "floor", text: "Этаж" }} />
        </div>
        <div className="full-name">
          <InputForm props={{ name: "name", text: "Ваше имя" }} />
          <InputForm props={{ name: "number", text: "Телефон" }} />
        </div>
        <div className="comment-form">
          <InputForm
            props={{ name: "comment", text: "Комментарий к адресу" }}
          />
        </div>
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

function InputForm({ props }) {
  const [formValue, setFormValue] = useState("");
  return (
    <div className="delivery-form">
      <input
        className={
          formValue.length > 0
            ? `delivery-form__${props.name}_active`
            : `delivery-form__${props.name}`
        }
        onChange={(e) => setFormValue(e.target.value)}
        id={props.name}
        value={formValue}
      />
      <label
        className={
          formValue.length > 0
            ? `delivery-form__label_active`
            : `delivery-form__label`
        }
        htmlFor={props.name}
      >
        {props.text}
      </label>
    </div>
  );
}
