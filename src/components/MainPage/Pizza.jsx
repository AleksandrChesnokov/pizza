import { useDispatch, useSelector } from "react-redux";
import { useState, memo } from "react";
import { addToBasket } from "../../rtk/basketSlice";
import { LoadImg } from "./LoadImg";

export const Pizza = memo(function Pizza({ props }) {
  const { title, imageUrl, types, sizes, price, id } = props;

  const [selectedDoughType, setSelectedDoughType] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const doughType = ["Тонкое", "Толстое"];
  const dispatch = useDispatch();

  const counterValue = useSelector((state) =>
    Object.values(state.basket.pizzas)
      .filter((item) => item.id === id)
      .map((item) => item.count)
      .reduce((sum, current) => sum + current, 0)
  );

  function handleAddPizza(prop) {
    dispatch(
      addToBasket({
        key: `${prop.title}-${doughType[selectedDoughType]}-${prop.sizes[selectedSize]}`,
        title: prop.title,
        imageUrl: prop.imageUrl,
        types: doughType[selectedDoughType],
        sizes: prop.sizes[selectedSize],
        price: prop.price,
        count: 1,
        id: prop.id,
        initialPrice: prop.price,
      })
    );
  }

  return (
    <div className="pizza-card">
      <LoadImg urlImg={imageUrl} />
      <div className="pizza-selection-box">
        <h3 className="pizza-selection-box__pizza-name">{title}</h3>
        <div className="pizza-selector">
          <div className="pizza-selector-dough">
            {types.map((item, index) => (
              <div
                className={`pizza-selector-dough__type${
                  selectedDoughType === index ? "_active" : ""
                }`}
                onClick={() => setSelectedDoughType(index)}
              >
                {doughType[item]}
              </div>
            ))}
          </div>
          <div className="pizza-selector-sizes">
            {sizes.map((item, index) => (
              <div
                className={`pizza-selector-sizes__size${
                  selectedSize === index ? "_active" : ""
                }`}
                onClick={() => setSelectedSize(index)}
              >
                {item} см.
              </div>
            ))}
          </div>
        </div>
        <div className="pizza-selector-info">
          <div className="pizza-selector-info__price">от {price} ₽</div>
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
    </div>
  );
});
