import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { updateProductCategoriesValue } from "../../rtk/sortSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function BasketButton() {
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const itemsInBasket = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(itemsInBasket));
  }, [itemsInBasket]);

  return (
    <div className="basket">
      <Link
        to={"basket"}
        onClick={() => dispatch(updateProductCategoriesValue(null))}
        className="basket__button"
      >
        <ShoppingCartOutlinedIcon />
        {totalPrice ? (
          <span className="basket__price">{totalPrice}₽</span>
        ) : null}
      </Link>
    </div>
  );
}
