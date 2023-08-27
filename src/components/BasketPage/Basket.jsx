import { useSelector, useDispatch } from "react-redux";
import { PizzaInBasket } from "./PizzaInBasket";
import styles from "./BasketPage.module.scss";

export function Basket() {
  const itemsInBasket = useSelector((state) => state.basket.pizzas);

  return (
    <div className={styles.root}>
      {Object.keys(itemsInBasket).map((key) => (
        <PizzaInBasket prop={itemsInBasket[key]} />
      ))}
    </div>
  );
}
