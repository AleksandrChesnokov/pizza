import { Pizza } from "./Pizza";
import { Skeleton } from "./Skeleton";
import { nanoid } from "@reduxjs/toolkit";
import { useGetPizzasQuery } from "../../rtk/apiSlice";
import { useSelector } from "react-redux";

export function Main() {
  const selectedSort = useSelector((state) => state.sort.value);
  const selectedFilter = useSelector((state) => state.sort.filterValue);
  const searchValue = useSelector(
    (state) => state.sort.searchValue
  ).toLowerCase();

  const category0Filter = (a, b) =>
    selectedFilter === 1
      ? b.price - a.price
      : selectedFilter === 2
      ? a.price - b.price
      : selectedFilter === 3
      ? b.rating - a.rating
      : a.rating - b.rating;

  // const {
  //   data: sortPizzas,
  //   isFetching,
  //   isSuccess,
  // } = useGetSortQuery(selectedSort > 0 ? selectedSort : "");

  const { data: sortPizzas, isFetching, isSuccess } = useGetPizzasQuery();

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
      .filter((item) => {
        if (selectedSort !== 0) {
          return item.category === selectedSort;
        }
        return true;
      })
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
