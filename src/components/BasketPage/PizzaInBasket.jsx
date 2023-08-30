import styles from "./BasketPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, remove } from "../../rtk/basketSlice";
export function PizzaInBasket({ prop }) {
  const dispatch = useDispatch();

  const valueCount = useSelector(
    (state) => state.basket.pizzas[prop.key].count
  );

  return (
    <div className={styles.pizza}>
      <img src={prop.imageUrl} alt="Pizza" />
      <div className={styles.description}>
        <h1>{prop.title}</h1>
        <h3>{`${prop.types} тесто, ${prop.sizes} см.`}</h3>
      </div>
      <button className="increment" onClick={() => dispatch(increment(prop))}>
        +
      </button>
      <span className={styles.count}>{prop.count}</span>
      <button
        className={valueCount < 2 ? styles.decrement : ""}
        onClick={() => dispatch(decrement(prop))}
      >
        -
      </button>
      <div className={styles.price}>{prop.price}₽</div>
      <button className="remove-button" onClick={() => dispatch(remove(prop))}>
        x
      </button>
    </div>
  );
}
