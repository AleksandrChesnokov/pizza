import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { sortNum } from "../rtk/sortSlice";

export function Sort() {
  const sortName = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  let dispatch = useDispatch();

  return (
    <div className="menu">
      <ul className="menu__list">
        {sortName.map((item, index) => (
          <li key={nanoid()} onClick={() => dispatch(sortNum(index))}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
