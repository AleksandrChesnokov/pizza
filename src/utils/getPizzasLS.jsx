export function getPizzasLS() {
  return localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket")).pizzas
    : {};
}
