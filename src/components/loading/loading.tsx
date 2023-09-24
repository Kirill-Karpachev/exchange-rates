import { FC } from "react";
import styles from "./loading.module.css";

const Loading: FC = (): JSX.Element => {
  //ToDo: Добавить анимацию загрузки
  return <p className={styles.loading}>Loading...</p>;
};

export default Loading;
