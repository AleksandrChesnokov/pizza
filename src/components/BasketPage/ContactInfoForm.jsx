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

export function ContactInfoForm() {
  const futureDate = dayjs().add(14, "days");
  const today = dayjs();

  const [selectedDate, setSelectedDate] = useState(today);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorValueCalendar, setErrorValueCalendar] = useState(null);
  const [errors, setErrors] = useState({
    address: "",
    houseNumber: "",
    apartment: "",
    name: "",
    phone: "",
    paymentCheckBox: "",
  });

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
      onError={(newError) => setErrorValueCalendar(newError)}
      timeSteps={{ minutes: 15 }}
      label="Выберете дату доставки"
    />
  );

  const validateHouseNumber = (houseNumber) => {
    if (!houseNumber.trim()) {
      return "Поле 'Номер дома' обязательно для заполнения.";
    }
    return "";
  };
  const validateAddress = (address) => {
    if (!address.trim()) {
      return "Поле 'Адресс' обязательно для заполнения.";
    }
    return "";
  };
  const validateApartment = (apartment) => {
    if (!apartment.trim()) {
      return "Поле 'Номер квартиры' обязательно для заполнения.";
    }
    return "";
  };
  const validateName = (name) => {
    if (!name.trim()) {
      return "Поле 'Ваше имя' обязательно для заполнения.";
    }
    return "";
  };
  const validatePhone = (phone) => {
    if (phone.trim().length < 1) {
      return "Поле 'Телефон' обязательно для заполнения.";
    }
    if (phone.trim().length <= 11) {
      return "Введите корректный номер телефона.";
    }
    if (!/^\+7\d{10}$/.test(phone)) {
      return "Введите корректный номер телефона.";
    }
    return "";
  };

  const fu = (name, value, errorMessage) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const fg = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "address":
        const errorAddressMeddage = validateAddress(value);
        fu(name, value, errorAddressMeddage);
        break;
      case "houseNumber":
        const errorHouseNumberMessage = validateHouseNumber(value);
        fu(name, value, errorHouseNumberMessage);
        break;
      case "apartment":
        const errorApartment = validateApartment(value);
        fu(name, value, errorApartment);
        break;
      case "name":
        const errorName = validateName(value);
        fu(name, value, errorName);
        break;
      case "phone":
        const errorPhone = validatePhone(value);
        fu(name, value, errorPhone);
        break;
      default:
        break;
    }
  };

  return (
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
            name="address"
            label="Адрес"
            variant="outlined"
            fullWidth={true}
            inputProps={{ maxLength: 35 }}
            onChange={(e) => fg(e)}
            helperText={errors.address}
            error={!!errors.address}
          />
          <TextField
            id="outlined-basic"
            label="Номер дома"
            variant="outlined"
            name="houseNumber"
            type="text"
            fullWidth={true}
            inputProps={{ maxLength: 5 }}
            onChange={(e) => fg(e)}
            error={!!errors.houseNumber}
            helperText={errors.houseNumber}
          />
          <TextField
            id="outlined-basic"
            label="Номер квартиры"
            variant="outlined"
            name="apartment"
            type="text"
            fullWidth={true}
            inputProps={{ maxLength: 5 }}
            onChange={(e) => fg(e)}
            error={!!errors.apartment}
            helperText={errors.apartment}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            fullWidth={true}
            label="Ваше имя"
            name="name"
            variant="outlined"
            type="text"
            inputProps={{ maxLength: 20 }}
            onChange={(e) => fg(e)}
            error={!!errors.name}
            helperText={errors.name}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            fullWidth={true}
            label="Телефон"
            variant="outlined"
            name="phone"
            placeholder="+7"
            defaultValue="+7"
            type="tel"
            inputProps={{ maxLength: 12 }}
            onChange={(e) => fg(e)}
            error={!!errors.phone}
            helperText={errors.phone}
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
          <FormLabel error={!!errors.paymentCheckBox}>Способ оплаты</FormLabel>
          <RadioGroup row name="row-radio-buttons-group">
            <FormControlLabel
              value="Картой курьеру"
              control={<Radio />}
              label="Картой курьеру"
              onClick={() => setErrors({ ...errors, paymentCheckBox: false })}
            />
            <FormControlLabel
              value="Картой онлайн"
              control={<Radio />}
              label="Картой онлайн"
              onClick={() => setErrors({ ...errors, paymentCheckBox: false })}
            />
            <FormControlLabel
              value="Наличными курьеру"
              control={<Radio />}
              label="Наличными курьеру"
              onClick={() => setErrors({ ...errors, paymentCheckBox: false })}
            />
          </RadioGroup>
        </FormControl>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
