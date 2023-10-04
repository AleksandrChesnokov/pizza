import { useDispatch, useSelector } from "react-redux";
import { basket } from "../../rtk/basketSlice";
import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";

import CircularProgress from "@mui/material/CircularProgress";

export function Pizza({ props }) {
  const doughType = ["Тонкое", "Толстое"];

  const [selectedDoughType, setSelectedDoughType] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = function () {
      setLoad(true);
    };
    image.src = props.imageUrl;
  }, [props.imageUrl]);

  const dispatch = useDispatch();
  const counterValue = useSelector((state) =>
    Object.values(state.basket.pizzas)
      .filter((item) => item.id === props.id)
      .map((item) => item.count)
      .reduce((sum, current) => sum + current, 0)
  );

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
        id: prop.id,
      })
    );
  }

  return (
    <div className="pizza-card">
      <div className="pizza-card__img">
        {load ? null : (
          <CircularProgress sx={{ color: "rgba(212, 223, 177, 0.45)" }} />
        )}
        <img
          src={props.imageUrl}
          style={load ? {} : { display: "none" }}
          alt="pizza"
          className="pizza-card__img"
          loading="lazy"
        />
      </div>
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
          Добавить{" "}
          {counterValue > 0 ? (
            <span className="pizza-selector-info__count">{counterValue}</span>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
}
