import { useSelector, useDispatch } from "react-redux";
import styles from "./BasketPage.module.scss";
import { removeAllFromBasket } from "../../rtk/basketSlice";
import { setErrors } from "../../rtk/contactFormSlice";
import { PizzaInCard } from "./PizzaInCard";
import { ContactInfoForm } from "./ContactInfoForm";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const errors = {
  address: 'Поле "Адресс" обязательно для заполнения.',
  apartment: 'Поле "Номер квартиры" обязательно для заполнения.',
  houseNumber: 'Поле "Номер дома" обязательно для заполнения.',
  name: 'Поле "Ваше имя" обязательно для заполнения.',
  paymentCheckBox: true,
  phone: 'Поле "Телефон" обязательно для заполнения.',
  selectedDate: true,
};

export function Card() {
  const dispatch = useDispatch();
  const { pizzas, totalPrice } = useSelector((state) => state.basket);
  const formData = useSelector((state) => state.contactForm);

  const handleCheckedForm = () => {
    Object.entries(formData.formData).forEach(([key, value]) => {
      if (!value) {
        dispatch(setErrors({ [key]: errors[key] }));
      }
    });
  };

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
          onClick={() => dispatch(removeAllFromBasket(pizzas))}
        >
          <DeleteOutlineOutlinedIcon
            sx={{ height: 30, width: 30, color: "#00000082" }}
          />
          Очистить корзину
        </div>
      </div>
      <div>
        {Object.values(pizzas).map((pizza, index) => (
          <PizzaInCard key={index} prop={pizza} />
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
        <button onClick={handleCheckedForm}>Оформить заказ</button>
      </div>
    </div>
  );
}
