import logo from "../../img/logo.png";
import basket from "../../img/free-icon-shopping-cart-711897.png";
import { Menu } from "./Menu";
import { SearchBox } from "./SearchBox";
import { Link } from "react-router-dom";
import { sortNum } from "../../rtk/sortSlice";
import { useDispatch, useSelector } from "react-redux";

export function Header() {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.basket.totalPrice);

  return (
    <div className="header">
      <div className="logo">
        <Link
          to={"/"}
          onClick={() => dispatch(sortNum(0))}
          className="logo__anchor"
        >
          <img src={logo} alt="logo" className="logo__img" />
          {/* не работает относительный путь для отображения лого */}
          <h1 className="logo__name">Pizza #1</h1>
        </Link>
      </div>
      <SearchBox />
      <Menu />
      <div className="basket">
        {totalPrice > 0 && (
          <Link
            to={"basket"}
            onClick={() => dispatch(sortNum(null))}
            className="basket__button"
          >
            <img className="basket__img" src={basket} alt="" />
            <span className="basket__price">{totalPrice}₽</span>
          </Link>
        )}
      </div>
    </div>
  );
}
