import { Menu } from "./Menu";
import { BasketButton } from "./BasketButton";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";
import { setTogglePopup } from "../../rtk/sortSlice";
import { useDispatch, useSelector } from "react-redux";

export function Header() {
  const dispatch = useDispatch();
  const popupState = useSelector((state) => state.sort.popup);

  const handleHideMenu = () => dispatch(setTogglePopup(!popupState));
  console.log(popupState);

  return (
    <header className="header">
      <div
        onClick={handleHideMenu}
        className={popupState ? "modal-wrapper_active" : "modal-wrapper"}
      ></div>
      <div
        className={popupState ? "menu__burger_active" : "menu__burger"}
        onClick={() => dispatch(setTogglePopup(!popupState))}
      >
        <span></span>
      </div>
      <Logo />
      <div className={popupState ? "navigation__popup" : "navigation"}>
        <SearchBox />
        <Menu />
      </div>
      <BasketButton />
    </header>
  );
}
