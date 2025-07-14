import { Portal, Select, createListCollection, type JsxElement } from "@chakra-ui/react";
import { fetchcurrencies } from "./Api/CurrencyListApi";
import { useQuery, type AnyDataTag } from "@tanstack/react-query";
import getSymbolFromCurrency from "currency-symbol-map";
interface Icurrency {
  code: string;
  name: string;
}

interface Proptype {
  get_currency_value: (e: string) => void;
  default_value: string;
  setswap : (e : any) => void;
}
export const InputList = ({ get_currency_value, default_value  , setswap}: Proptype) => {
  const { data: serverdata, isFetched } = useQuery({
    queryKey: ["currencylist"],
    queryFn: fetchcurrencies,
    staleTime : 1000 * 60 * 60, // 1 hour
  });

  const currencies = createListCollection({
    items: isFetched
      ? serverdata?.supported_codes.map(
          ([code, name]: [string, string]): Icurrency => ({
            code,
            name,
          })
        )
      : [],
    itemToString: (item: Icurrency) => item.name,
    itemToValue: (item: Icurrency) => item.code,
  });
   const handleswap = (e : any) => {
    get_currency_value(e.value);
    setswap(e.value);
   }
  return (
    <Select.Root
      onSelect={handleswap}
      collection={currencies}
      size="md"
      width="300px"
      colorPalette={"yellow"}
      variant={"subtle"}
      value={[default_value]}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select currencies" fontSize={"15px"} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {isFetched &&
              currencies?.items?.map((cr, index) => (
                <Select.Item
                  item={cr.code}
                  key={index}
                  onChange={() => console.log("its working")}
                  fontSize={"15px"}
                >
                  <b>
                    {getSymbolFromCurrency(cr.code)} {cr.code} {cr.name}
                  </b>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
