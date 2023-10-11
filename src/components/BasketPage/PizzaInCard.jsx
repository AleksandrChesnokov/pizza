import styles from "./BasketPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, removeFromBasket } from "../../rtk/basketSlice";

import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

export function PizzaInCard({ prop }) {
  const dispatch = useDispatch();

  const valueCount = useSelector(
    (state) => state.basket.pizzas[prop.key].count
  );

  return (
    <div className={styles.pizza}>
      <img src={prop.imageUrl} alt="Pizza" />
      <div className={styles.description}>
        <h1>{prop.title}</h1>
        <h3>{`${prop.types} тесто, ${prop.sizes} см.`}</h3>
      </div>
      <IconButton onClick={() => dispatch(decrement(prop))}>
        <RemoveCircleOutlineOutlinedIcon
          className={valueCount < 2 ? styles.decrement : ""}
          sx={{ height: 35, width: 35 }}
        />
      </IconButton>
      <span className={styles.count}>{prop.count}</span>
      <IconButton onClick={() => dispatch(increment(prop))}>
        <AddCircleOutlineOutlinedIcon sx={{ height: 35, width: 35 }} />
      </IconButton>
      <div className={styles.price}>{prop.price}₽</div>
      <IconButton onClick={() => dispatch(removeFromBasket(prop))}>
        <HighlightOffOutlinedIcon sx={{ height: 35, width: 35 }} />
      </IconButton>
    </div>
  );
}
