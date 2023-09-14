export function getTotalPriceLS() {
  return localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket")).totalPrice
    : 0;
}
