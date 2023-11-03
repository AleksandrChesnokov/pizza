import styles from "./BasketPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, removeFromBasket } from "../../rtk/basketSlice";

import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import { createTheme } from "@mui/material";

export function PizzaInCard({ prop }) {
  const { key, imageUrl, title, types, sizes, count, price } = prop;

  const dispatch = useDispatch();

  const valueCount = useSelector((state) => state.basket.pizzas[key].count);

  const theme = createTheme({});

  return (
    <div className={styles.pizza}>
      <img src={imageUrl} alt="Pizza" />
      <div className={styles.description}>
        <h1>{title}</h1>
        <h3>{`${types} тесто, ${sizes} см.`}</h3>
      </div>
      <div className={styles.counterWrapper}>
        <IconButton onClick={() => dispatch(decrement(prop))}>
          <RemoveCircleOutlineOutlinedIcon
            className={valueCount < 2 ? styles.decrement : ""}
            sx={{
              height: 35,
              width: 35,
              [theme.breakpoints.down(771)]: {
                width: 25,
                height: 25,
              },
            }}
          />
        </IconButton>
        <span className={styles.count}>{count}</span>
        <IconButton onClick={() => dispatch(increment(prop))}>
          <AddCircleOutlineOutlinedIcon
            sx={{
              height: 35,
              width: 35,
              [theme.breakpoints.down(771)]: {
                width: 25,
                height: 25,
              },
            }}
          />
        </IconButton>

        <div className={styles.price}>{price}₽</div>
      </div>
      <IconButton
        sx={{
          [theme.breakpoints.down(771)]: {
            position: "absolute",
            top: 0,
            right: 0,
          },
        }}
        onClick={() => dispatch(removeFromBasket(prop))}
      >
        <HighlightOffOutlinedIcon
          sx={{
            height: 35,
            width: 35,
            [theme.breakpoints.down(771)]: {
              width: 25,
              height: 25,
            },
          }}
        />
      </IconButton>
    </div>
  );
}
