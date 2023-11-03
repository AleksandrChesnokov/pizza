import { createSlice } from "@reduxjs/toolkit";

export const contactFormSlice = createSlice({
  name: "contactForm",
  initialState: {
    showCalendar: false,
    formData: {
      address: "",
      houseNumber: "",
      apartment: "",
      name: "",
      phone: "",
      paymentCheckBox: false,
    },
    errors: {
      address: "",
      houseNumber: "",
      apartment: "",
      name: "",
      phone: "",
      paymentCheckBox: "",
    },
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = { ...state.errors, ...action.payload };
    },
    setShowCalendar: (state, action) => {
      state.showCalendar = action.payload;
    },
  },
});

export const { setFormData, setErrors, setShowCalendar } =
  contactFormSlice.actions;

export default contactFormSlice.reducer;
