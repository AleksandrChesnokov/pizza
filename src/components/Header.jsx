import logo from "../img/logo.png";
import magnifier from "../img/free-icon-magnifier-2319177.png";
import basket from "../img/free-icon-shopping-cart-711897.png";

export function Menu() {
  return (
    <div className="header">
      <div className="logo">
        <a href="#" className="logo__anchor">
          <img src={logo} alt="logo" className="logo__img" />
          {/* не работает относительный путь для отображения лого */}
          <span className="logo__name">Pizza #1</span>
        </a>
      </div>
      <div className="search">
        <div className="search-box">
          <button className="search-box__button">
            <img className="search-box__magnifier" src={magnifier} />{" "}
            {/* не работает относительный путь для отображения лого */}
          </button>
          <input type="text" className="search__input" />
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
      <div className="menu">
        <ul className="menu__list">
          <li>Все</li>
          <li>Мясные</li>
          <li>Вегетарианская</li>
          <li>Гриль</li>
          <li>Острые</li>
          <li>Закрытые</li>
        </ul>
      </div>
      <div className="basket">
        <button className="basket__button">
          <img className="basket__img" src={basket} />
          <span className="basket__price">1000₽</span>
        </button>
      </div>
    </div>
  );
}
