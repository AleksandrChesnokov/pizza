import logo from "../img/logo.png";
import magnifier from "../img/free-icon-magnifier-2319177.png";
import basket from "../img/free-icon-shopping-cart-711897.png";
import { Sort } from "./Sort";

export function Header() {
  return (
    <div className="header">
      <div className="logo">
        <a href="#" className="logo__anchor">
          <img src={logo} alt="logo" className="logo__img" />
          {/* не работает относительный путь для отображения лого */}
          <h1 className="logo__name">Pizza #1</h1>
        </a>
      </div>
      <div className="search">
        <div className="search-box">
          <button className="search-box__button">
            <img className="search-box__magnifier" src={magnifier} />{" "}
            {/* не работает относительный путь для отображения лого */}
          </button>
          <div className="search-box__input-container">
            <input
              type="text"
              placeholder="Поиск пиццы..."
              className="search__input"
            />
          </div>
        </div>
        <div className="search__sort">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
          >
            <path d="M6 0L11.1962 8.25H0.803848L6 0Z" fill="black" />
          </svg>
          сортировка по: <span className="search__popular">популярности</span>
        </div>
      </div>
      <Sort />
      <div className="basket">
        <button className="basket__button">
          <img className="basket__img" src={basket} />
          <span className="basket__price">1000₽</span>
        </button>
      </div>
    </div>
  );
}
