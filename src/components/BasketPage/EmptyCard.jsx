import packageIcon from "../../img/package.png";
import styles from "./BasketPage.module.scss";

export function EmptyCard() {
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
