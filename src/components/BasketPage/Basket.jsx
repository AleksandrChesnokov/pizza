import { useSelector, useDispatch } from "react-redux";
import { PizzaInBasket } from "./PizzaInBasket";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./BasketPage.module.scss";
import { removeAll } from "../../rtk/basketSlice";
import { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  TextField,
  Switch,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { ruRU } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import packageIcon from "../../img/package.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c2d190",
    },
  },
  typography: {
    fontFamily: ["Jost"].join(","),
  },
});

export function Basket() {
  const hasItems = useSelector((state) => state.basket.pizzas);

  return <>{Object.keys(hasItems).length > 0 ? <Card /> : <EmptyCard />}</>;
}

function Card() {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state) => state.basket.pizzas);
  const totalPrice = useSelector((state) => state.basket.totalPrice);

  const futureDate = dayjs().add(14, "days");
  const today = dayjs();

  const [modalActive, setModalActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [showCalendar, setShowCalendar] = useState(false);

  const minTime = selectedDate.hour(9).minute(0);
  const maxTime = selectedDate.hour(22).minute(59);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeSwitch = (e) => {
    if (e.target.checked) {
      return setShowCalendar(true);
    }
    return setShowCalendar(false);
  };

  const shouldDisableTime = (value, view) => {
    if (today.date() === value.date()) {
      return view === "hours" && value.hour() < today.hour() + 2;
    }
  };

  const calendar = (
    <DateTimePicker
      maxTime={maxTime}
      minTime={minTime}
      skipDisabled={true}
      onChange={handleDateChange}
      shouldDisableTime={shouldDisableTime}
      disablePast={true}
      maxDate={futureDate}
      timeSteps={{ minutes: 15 }}
      label="Выберете дату доставки"
    />
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.iconBasket}>
          <ShoppingCartOutlinedIcon
            sx={{ height: 30, width: 30, color: "#00000082" }}
          />
          Корзина
        </div>
        <div
          className={styles.dltButton}
          onClick={() => dispatch(removeAll(itemsInBasket))}
        >
          <DeleteOutlineOutlinedIcon
            sx={{ height: 30, width: 30, color: "#00000082" }}
          />
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
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            localeText={
              ruRU.components.MuiLocalizationProvider.defaultProps.localeText
            }
            adapterLocale={"ru"}
            dateAdapter={AdapterDayjs}
          >
            <div className="address-form">
              <TextField
                id="outlined-basic"
                type="text"
                label="Адрес"
                variant="outlined"
                fullWidth={true}
                inputProps={{ maxlength: 35 }}
              />
              <TextField
                id="outlined-basic"
                label="Номер дома"
                variant="outlined"
                type="text"
                fullWidth={true}
                inputProps={{ maxlength: 5 }}
              />
              <TextField
                id="outlined-basic"
                label="Номер квартиры"
                variant="outlined"
                type="text"
                fullWidth={true}
                inputProps={{ maxlength: 5 }}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                fullWidth={true}
                label="Ваше имя"
                variant="outlined"
                type="text"
                inputProps={{ maxlength: 20 }}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                fullWidth={true}
                label="Телефон"
                variant="outlined"
                placeholder="+7"
                defaultValue="+7"
                type="tel"
                inputProps={{ maxlength: 12 }}
              />
            </div>
            <div className="switcher">
              <div>
                К определенному времени
                <Switch onChange={handleChangeSwitch} />
              </div>
              {showCalendar && calendar}
            </div>
            <FormControl>
              <FormLabel>Способ оплаты</FormLabel>
              <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel
                  value="Картой курьеру"
                  control={<Radio />}
                  label="Картой курьеру"
                />
                <FormControlLabel
                  value="Картой онлайн"
                  control={<Radio />}
                  label="Картой онлайн"
                />
                <FormControlLabel
                  value="Наличными курьеру"
                  control={<Radio />}
                  label="Наличными курьеру"
                />
              </RadioGroup>
            </FormControl>
          </LocalizationProvider>
        </ThemeProvider>
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
