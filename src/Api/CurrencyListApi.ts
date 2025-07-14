import { Apikey } from "../Apikey";


export const fetchcurrencies = async () => {
  const apidata = await fetch(
    `https://v6.exchangerate-api.com/v6/${Apikey}/codes`
  );
  return apidata.json();
};

export const convertCurrencies = async (base : string , target : string) => {
  const apidata = await fetch(
    `https://v6.exchangerate-api.com/v6/${Apikey}/pair/${base}/${target}`
  );
  return await apidata.json();
};
