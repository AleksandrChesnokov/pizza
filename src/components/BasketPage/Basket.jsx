import { useSelector } from "react-redux";
import { EmptyCard } from "./EmptyCard";
import { Card } from "./Card";

export function Basket() {
  const hasItems = useSelector((state) => state.basket.pizzas);

  return <>{Object.keys(hasItems).length > 0 ? <Card /> : <EmptyCard />}</>;
}
