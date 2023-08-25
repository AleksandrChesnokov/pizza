import { Header } from "../Header/Header";
import { Link } from "react-router-dom";
import sad from "../../img/free-icon-sad-5793656.png";
import styles from "./ErrorPage.module.scss";

export function ErrorPage() {
  return (
    <div className="ErrorPage">
      <Header />
      <div className={styles.content}>
        <div className={styles.messageNotFound}>
          <h1>Ой... Мы не можем найти эту страницу!</h1>
          <img src={sad} alt="q" />
        </div>
        <p>Попробуйте проверить корректность введенного запроса или</p>
        <Link to={"/"}>Вернутся на главную</Link>
      </div>
    </div>
  );
}
