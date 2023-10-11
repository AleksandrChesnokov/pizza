import { Menu } from "./Menu";
import { BasketButton } from "./BasketButton";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";

export function Header() {
  return (
    <div className="header">
      <Logo />
      <div className="navigation">
        <SearchBox />
        <Menu />
      </div>
      <BasketButton />
    </div>
  );
}
