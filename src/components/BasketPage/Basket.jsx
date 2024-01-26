import { useSelector } from "react-redux";
import { EmptyCard } from "./EmptyCard";
import { Card } from "./Card";

export function Basket() {
  const pizzas = useSelector((state) => state.basket.pizzas);

  return <>{Object.keys(pizzas).length > 0 ? <Card /> : <EmptyCard />}</>;
}
