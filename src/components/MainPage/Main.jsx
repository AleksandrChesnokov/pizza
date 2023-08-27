import { Pizza } from "./Pizza";
import { nanoid } from "@reduxjs/toolkit";
import { useGetSortQuery } from "../../rtk/apiSlice";
import { useSelector } from "react-redux";
import { Skeleton } from "./Skeleton";

export function Main() {
  const selectedSort = useSelector((state) => state.sort.value);
  const selectedFilter = useSelector((state) => state.sort.filterValue);
  const searchValue = useSelector(
    (state) => state.sort.searchValue
  ).toLowerCase();

  const category0Filter = (a, b) =>
    selectedFilter === 0
      ? b.price - a.price
      : selectedFilter === 1
      ? a.price - b.price
      : selectedFilter === 2
      ? b.rating - a.rating
      : a.rating - b.rating;

  const {
    data: sortPizzas,
    isFetching,
    isSuccess,
  } = useGetSortQuery(selectedSort > 0 ? selectedSort : "");

  let content;

  let notFoundContent = <h1>Упс, такую пиццу мы пока ещё не делаем.</h1>;
  if (isFetching) {
    content = [...new Array(8)].map((item) => (
      <Skeleton key={nanoid()} props={item} />
    ));
  } else if (isSuccess) {
    content = sortPizzas
      .filter((item) => item.title.toLowerCase().includes(searchValue))
      .sort(category0Filter)
      .map((item) => <Pizza key={nanoid()} props={item} />);
  }

  return (
    <div className="main-container">
      <div className={`${content.length > 0 ? "main" : "notFound"}`}>
        {content.length > 0 ? content : notFoundContent}
      </div>
    </div>
  );
}
