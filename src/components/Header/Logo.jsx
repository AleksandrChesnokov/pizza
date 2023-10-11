import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProductCategoriesValue } from "../../rtk/sortSlice";

import logo from "../../img/logo.png";

export function Logo() {
  const dispatch = useDispatch();
  return (
    <div className="logo">
      <Link
        to={"/"}
        onClick={() => dispatch(updateProductCategoriesValue(0))}
        className="logo__anchor"
      >
        <img src={logo} alt="logo" className="logo__img" />
        <h1 className="logo__name">Pizza #1</h1>
      </Link>
    </div>
  );
}
