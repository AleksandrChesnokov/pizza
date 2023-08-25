import logo from "../../img/logo.png";
import basket from "../../img/free-icon-shopping-cart-711897.png";
import { Menu } from "./Menu";
import { SearchBox } from "./SearchBox";
import { Link } from "react-router-dom";
import { sortNum } from "../../rtk/sortSlice";
import { useDispatch } from "react-redux";

export function Header() {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="logo">
        <Link to={"/"} className="logo__anchor">
          <img src={logo} alt="logo" className="logo__img" />
          {/* не работает относительный путь для отображения лого */}
          <h1 className="logo__name">Pizza #1</h1>
        </Link>
      </div>
      <SearchBox />
      <Menu />
      <div className="basket">
        <Link
          to={"basket"}
          onClick={() => dispatch(sortNum(null))}
          className="basket__button"
        >
          <img className="basket__img" src={basket} />
          <span className="basket__price">0₽</span>
        </Link>
      </div>
    </div>
  );
}
