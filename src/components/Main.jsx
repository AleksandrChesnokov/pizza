import { Pizza } from "./Pizza";
import { nanoid } from "@reduxjs/toolkit";
import { useGetSortQuery } from "../rtk/apiSlice";
import { useSelector } from "react-redux";
import { Skeleton } from "./Skeleton";

export function Main() {
  const selectedSort = useSelector((state) => state.sort.value);

  const {
    data: sortPizzas,
    isLoading,
    isSuccess,
  } = useGetSortQuery(selectedSort > 0 ? selectedSort : "");

  let content;

  if (isLoading) {
    content = [...new Array(8)].map((item) => (
      <Skeleton key={nanoid()} props={item} />
    ));
  } else if (isSuccess) {
    content = sortPizzas.map((item) => <Pizza key={nanoid()} props={item} />);
  }

  return (
    <div className="main-container">
      <div className="main">{content}</div>
    </div>
  );
}
