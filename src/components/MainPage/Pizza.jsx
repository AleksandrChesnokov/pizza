export function Pizza({ props }) {
  const size = ["Тонкое", "Толстое"];

  return (
    <div className="pizza-card">
      <img src={props.imageUrl} alt="pizza" className="pizza-card__img" />
      <h3 className="pizza-card__pizza-name">{props.title}</h3>
      <div className="pizza-card__pizza-selector pizza-selector">
        <div className="pizza-selector__dough">
          <div className="pizza-selector__dough_thin">Тонкое</div>
          <div className="pizza-selector__dough_thick">Толстое</div>
        </div>
        <div className="pizza-selector__size">
          <div className="pizza-selector__size_s">26 см.</div>
          <div className="pizza-selector__size_m">30 см.</div>
          <div className="pizza-selector__size_l">40 см.</div>
        </div>
      </div>
      <div className="pizza-selector__info">
        <div className="pizza-selector__info_price">от {props.price} ₽</div>
        <div className="pizza-selector__info_button-add">+ Добавить</div>
      </div>
    </div>
  );
}
