import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { updateProductCategoriesValue } from "../../rtk/sortSlice";
import { Link } from "react-router-dom";

export function Menu() {
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

  return (
    <div className="menu">
      <ul className="sorts">
        {productCategories.map((item, index) => (
          <Link
            to={"/"}
            key={nanoid()}
            className={`sorts__item${selectedSort === index ? "_active" : ""}`}
            onClick={() => dispatch(updateProductCategoriesValue(index))}
          >
            {item}
          </Link>
        ))}
      </ul>
    </div>
  );
}
