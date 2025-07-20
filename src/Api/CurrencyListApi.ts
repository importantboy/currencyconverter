import { Apikey } from "../Apikey";

export const fetchcurrencies = async () => {
  const apidata = await fetch(
    `https://v6.exchangerate-api.com/v6/${Apikey}/codes`
  );
  return apidata.json();
};

export const convertCurrencies = async (
  base: string,
  target: string,
  amount?: string
) => {
  const apidata = await fetch(
    `https://v6.exchangerate-api.com/v6/${Apikey}/pair/${base}/${target}/${amount ? amount : ""}`
  );
  return await apidata.json();
};


export const getCurrencyHistory = async (
  currency: string,
  fullYearwithDateandMonth: string
) => {
  
    const apidata = await fetch(
      `https://v6.exchangerate-api.com/v6/${Apikey}/history/${currency}/${fullYearwithDateandMonth}`
    );
     const res = await apidata.json();
    return {
      fullYearwithDateandMonth,
      res
    };
  
  
};
