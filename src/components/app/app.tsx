import { FC, useEffect, useState } from "react";
import { getLatestExchangeRates, getSymbolsExchangeRates } from "../../api/api";
import fileCountry from "../../file/currency.json";
import { URL_IMAGE } from "../../utils/const";

import SelectUI from "../../ui/selects/selects";

import styles from "./app.module.css";

const App: FC = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countryData: any = {};
  const [rate, setRate] = useState("");
  const [latest, setLatest] = useState({});
  const [symbols, setSymbols] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSymbol, setIsLoadingSymbol] = useState(true);

  const arrLatest = Object.entries(latest);

  Object.entries(fileCountry).map(([key, value]) => {
    countryData[value] = key.toLowerCase();
  });

  const getSymbols = async () => {
    setIsLoadingSymbol(true);
    const data = await getSymbolsExchangeRates();
    setSymbols(data.symbols);
    setIsLoadingSymbol(false);
  };

  const getLatest = async () => {
    setIsLoading(true);
    const data = await getLatestExchangeRates(rate);
    setLatest(data.rates);
    setIsLoading(false);
  };

  useEffect(() => {
    getSymbols();
  }, []);

  useEffect(() => {
    getLatest();
  }, [rate]);

  return (
    <>
      {isLoadingSymbol ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.app}>
          <h1>Exchange Rates</h1>
          <SelectUI symbols={symbols} rate={rate} setRate={setRate} />
          {rate &&
            (isLoading ? (
              <p className={styles.loading}>Loading...</p>
            ) : (
              //ToDo: Вынести в отдельный компонент
              <section className={styles.container}>
                <div className={styles.title}>
                  <img
                    className={styles.img}
                    src={`${URL_IMAGE}/32x24/${countryData[rate]}.png`}
                    alt={countryData[rate]}
                  />
                  <h3 className={styles.title_text}>{symbols[rate]}</h3>
                </div>
                <ul className={styles.list}>
                  {arrLatest.map((item, index) => (
                    <li className={styles.list_item} key={index}>
                      <div className={styles.list_country}>
                        <img
                          className={styles.list_img}
                          src={`${URL_IMAGE}/16x12/${countryData[item[0]]}.png`}
                          alt={countryData[item[0]]}
                        />
                        <p className={styles.list_name}>{symbols[item[0]]}</p>
                      </div>

                      <p className={styles.list_number}>{Number(item[1])}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      )}
    </>
  );
};

export default App;
