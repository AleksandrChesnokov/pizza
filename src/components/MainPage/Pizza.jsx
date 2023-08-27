import { useDispatch } from "react-redux";
import { basket } from "../../rtk/basketSlice";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

export function Pizza({ props }) {
  const doughType = ["Тонкое", "Толстое"];

  const [selectedDoughType, setSelectedDoughType] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const dispatch = useDispatch();

  function handleAddPizza(prop) {
    dispatch(
      basket({
        key: `${prop.title}-${doughType[selectedDoughType]}-${prop.sizes[selectedSize]}`,
        title: prop.title,
        imageUrl: prop.imageUrl,
        types: doughType[selectedDoughType],
        sizes: prop.sizes[selectedSize],
        price: prop.price,
        count: 1,
      })
    );
  }

  return (
    <div className="pizza-card">
      <img src={props.imageUrl} alt="pizza" className="pizza-card__img" />
      <h3 className="pizza-card__pizza-name">{props.title}</h3>
      <div className="pizza-selector">
        <div className="pizza-selector-dough">
          {props.types.map((item, index) => (
            <div
              className={`pizza-selector-dough__type${
                selectedDoughType === index ? "_active" : ""
              }`}
              key={nanoid()}
              onClick={() => setSelectedDoughType(index)}
            >
              {doughType[item]}
            </div>
          ))}
        </div>
        <div className="pizza-selector-sizes">
          {props.sizes.map((item, index) => (
            <div
              className={`pizza-selector-sizes__size${
                selectedSize === index ? "_active" : ""
              }`}
              key={nanoid()}
              onClick={() => setSelectedSize(index)}
            >
              {item} см.
            </div>
          ))}
        </div>
      </div>
      <div className="pizza-selector-info">
        <div className="pizza-selector-info__price">от {props.price} ₽</div>
        <button
          className="pizza-selector-info__button-add"
          onClick={() => handleAddPizza(props)}
        >
          + Добавить
        </button>
      </div>
    </div>
  );
}
