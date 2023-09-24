import { FC } from "react";
import styles from "./card-rate.module.css";
import { URL_IMAGE } from "../../utils/const";

type TObjectData = {
  [key: string]: string;
};

interface ICardRate {
  countryData: TObjectData;
  item: [string, unknown];
  symbols: TObjectData;
}

const CardRate: FC<ICardRate> = ({
  countryData,
  item,
  symbols,
}): JSX.Element => {
  return (
    <li className={styles.item}>
      <div className={styles.item_country}>
        <img
          className={styles.item_img}
          src={`${URL_IMAGE}/16x12/${countryData[item[0]]}.png`}
          alt={countryData[item[0]]}
        />
        <p className={styles.item_name}>{symbols[item[0]]}</p>
      </div>

      <p className={styles.item_number}>{Number(item[1])}</p>
    </li>
  );
};

export default CardRate;
