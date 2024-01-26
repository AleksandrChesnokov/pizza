import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setErrors,
  setShowCalendar,
} from "../../rtk/contactFormSlice";
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
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.contactForm.errors);
  const showCalendar = useSelector((state) => state.contactForm.showCalendar);

  const futureDate = dayjs().add(14, "days");
  const today = dayjs();

  const [selectedDate, setSelectedDate] = useState(today);

  const minTime = selectedDate.hour(9).minute(0);
  const maxTime = selectedDate.hour(22).minute(59);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateFormat = date.format("DD/MM/YYYY HH:mm:ss");
    dispatch(setFormData({ selectedDate: dateFormat }));
    dispatch(setErrors({ selectedDate: false }));
  };

  const handleChangeSwitch = () => {
    dispatch(setShowCalendar(!showCalendar));
    dispatch(setErrors({ selectedDate: false }));
    dispatch(setFormData({ selectedDate: "" }));
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
      slotProps={{
        textField: {
          error: errors.selectedDate,
        },
      }}
      timeSteps={{ minutes: 15 }}
      label="Выберете дату доставки"
    />
  );

  const validateHouseNumber = (houseNumber) => {
    if (!houseNumber.trim()) {
      return 'Поле "Номер дома" обязательно для заполнения.';
    }
    return "";
  };
  const validateAddress = (address) => {
    if (!address.trim()) {
      return 'Поле "Адресс" обязательно для заполнения.';
    }
    return "";
  };
  const validateApartment = (apartment) => {
    if (!apartment.trim()) {
      return 'Поле "Номер квартиры" обязательно для заполнения.';
    }
    return "";
  };
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Поле "Ваше имя" обязательно для заполнения.';
    }
    return "";
  };
  const validatePhone = (phone) => {
    if (phone.trim().length < 1) {
      return 'Поле "Телефон" обязательно для заполнения.';
    }
    if (phone.trim().length <= 11) {
      return "Введите корректный номер телефона.";
    }
    if (!/^\+7\d{10}$/.test(phone)) {
      return "Введите корректный номер телефона.";
    }
    return "";
  };

  const validateCheckBox = (e) => {
    if (e.target.value) {
      console.log(e.target.value);
      dispatch(setFormData({ paymentCheckBox: e.target.value }));
      dispatch(setErrors({ paymentCheckBox: false }));
    }
  };

  const updateFormDataAndErrors = (name, value, errorMessage) => {
    dispatch(
      setFormData({
        [name]: value,
      })
    );

    dispatch(
      setErrors({
        [name]: errorMessage,
      })
    );
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "address":
        const errorAddressMeddage = validateAddress(value);
        updateFormDataAndErrors(name, value, errorAddressMeddage);
        break;
      case "houseNumber":
        const errorHouseNumberMessage = validateHouseNumber(value);
        updateFormDataAndErrors(name, value, errorHouseNumberMessage);
        break;
      case "apartment":
        const errorApartment = validateApartment(value);
        updateFormDataAndErrors(name, value, errorApartment);
        break;
      case "name":
        const errorName = validateName(value);
        updateFormDataAndErrors(name, value, errorName);
        break;
      case "phone":
        const errorPhone = validatePhone(value);
        updateFormDataAndErrors(name, value, errorPhone);
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </div>
        <div className="switcher">
          <div>
            К определенному времени
            <Switch checked={showCalendar} onChange={handleChangeSwitch} />
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
              onClick={validateCheckBox}
            />
            <FormControlLabel
              value="Картой онлайн"
              control={<Radio />}
              label="Картой онлайн"
              onClick={validateCheckBox}
            />
            <FormControlLabel
              value="Наличными курьеру"
              control={<Radio />}
              label="Наличными курьеру"
              onClick={validateCheckBox}
            />
          </RadioGroup>
        </FormControl>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
