import { Pizza } from "./Pizza";
import { Skeleton } from "./Skeleton";
import { useGetPizzasQuery } from "../../rtk/apiSlice";
import { useSelector } from "react-redux";

export function Main() {
  const selectedSort = useSelector((state) => state.sort.value);
  const selectedFilter = useSelector((state) => state.sort.filterValue);
  const searchValue = useSelector(
    (state) => state.sort.searchValue
  ).toLowerCase();

  const sortPizzasByFilter = (a, b) => {
    switch (selectedFilter) {
      case 1:
        return b.price - a.price;
      case 2:
        return a.price - b.price;
      case 3:
        return b.rating - a.rating;
      default:
        return a.rating - b.rating;
    }
  };

  const filterBySearch = (item) =>
    item.title.toLowerCase().includes(searchValue);

  const filterByCategory = (item) => {
    if (selectedSort !== 0 && selectedSort !== null) {
      return item.category === selectedSort;
    } else if (selectedSort === null) {
      return true;
    }
    return true;
  };

  const { data: sortPizzas, isFetching, isSuccess } = useGetPizzasQuery();

  let content;

  let notFoundContent = <h1>Упс, такую пиццу мы пока ещё не делаем.</h1>;
  if (isFetching) {
    content = [...new Array(8)].map((item) => <Skeleton props={item} />);
  } else if (isSuccess) {
    content = sortPizzas
      .filter(filterBySearch)
      .sort(sortPizzasByFilter)
      .filter(filterByCategory)
      .map((item) => <Pizza key={item.title} props={item} />);
  }
  return (
    <main className="main-container">
      <div className={`${content.length > 0 ? "main" : "notFound"}`}>
        {content.length > 0 ? content : notFoundContent}
      </div>
    </main>
  );
}
