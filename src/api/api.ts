import { API_KEY, URL_RATE, URL_COUNTRY } from "../utils/const";

const requestOptions = {
  method: "GET",
  headers: {
    apikey: API_KEY,
  },
};

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

function request(url: string, options?: RequestInit) {
  return fetch(url, options).then(checkResponse);
}
//Rate
export function getLatestExchangeRates(base: string) {
  return request(`${URL_RATE}/latest?base=${base}`, requestOptions);
}
//Symbols
export function getSymbolsExchangeRates() {
  return request(`${URL_RATE}/symbols`, requestOptions);
}
//Country
export function getCountry() {
  return request(`${URL_COUNTRY}`);
}
