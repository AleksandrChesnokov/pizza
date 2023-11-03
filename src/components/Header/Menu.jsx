import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  updateProductCategoriesValue,
  setTogglePopup,
} from "../../rtk/sortSlice";
import { Link } from "react-router-dom";

export function Menu() {
  const popupState = useSelector((state) => state.sort.popup);

  const productCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  let dispatch = useDispatch();

  let selectedSort = useSelector((state) => state.sort.value);

  const handleUpdateSorts = (index) => {
    dispatch(updateProductCategoriesValue(index));
    dispatch(setTogglePopup(false));
  };

  return (
    <nav className="menu">
      <ul className={popupState ? "sorts_popup" : "sorts"}>
        {productCategories.map((item, index) => (
          <li key={nanoid()}>
            <Link
              to={"/"}
              className={`sorts__item${
                selectedSort === index ? "_active" : ""
              }`}
              onClick={() => handleUpdateSorts(index)}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
