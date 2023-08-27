import styles from "./BasketPage.module.scss";
export function PizzaInBasket({ prop }) {
  console.log(prop);
  return (
    <div className={styles.pizza}>
      <img src={prop.imageUrl} alt="Pizza" />
      <div className={styles.description}>
        <h1>{prop.title}</h1>
        <h3>{`${prop.types} тесто, ${prop.sizes} см.`}</h3>
      </div>
      <button className="increment">+</button>
      <span className={styles.count}>{prop.count}</span>
      <button className="decrement">-</button>
      <div className={styles.price}>{prop.price}</div>
      <button className="remove-button">x</button>
    </div>
  );
}
