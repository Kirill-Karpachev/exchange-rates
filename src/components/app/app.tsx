import { FC, useEffect, useState } from "react";
import { getLatestExchangeRates, getSymbolsExchangeRates } from "../../api/api";
import fileCountry from "../../file/currency.json";
import { URL_IMAGE } from "../../utils/const";

import SelectUI from "../../ui/selects/selects";

import styles from "./app.module.css";
import CardRate from "../card-rate/card-rate";
import Loading from "../loading/loading";

const App: FC = (): JSX.Element => {
  const countryData: { [key: string]: string } = {};
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
        <Loading />
      ) : (
        <div className={styles.app}>
          <h1>Exchange Rates</h1>
          <SelectUI symbols={symbols} rate={rate} setRate={setRate} />
          {rate &&
            (isLoading ? (
              <Loading />
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
                    <CardRate
                      key={index}
                      countryData={countryData}
                      item={item}
                      symbols={symbols}
                    />
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
