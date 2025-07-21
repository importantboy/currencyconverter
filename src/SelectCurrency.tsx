import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { fetchcurrencies } from "./Api/CurrencyListApi";
import { useQuery } from "@tanstack/react-query";
import getSymbolFromCurrency from "currency-symbol-map";
interface Icurrency {
  code: string;
  name: string;
}

interface Proptypes { 
  SelectChangeCurrency: (e: any) => void;
  defaultCurrency : string
}

export const SelectCurrency = ({ SelectChangeCurrency , defaultCurrency }: Proptypes) => {
  const { data: serverdata, isFetched } = useQuery({
    queryKey: ["currencylist"],
    queryFn: fetchcurrencies,
    staleTime: 1000 * 60 * 60, // 1 hour
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

  return (
    <Select.Root
      onSelect={(e) => SelectChangeCurrency(e)}
       value={[defaultCurrency]}
      collection={currencies}
      size="md"
       w={'100%'}
      colorPalette={"yellow"}
      variant={"outline"}
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
                <Select.Item item={cr.code} key={index} fontSize={"15px"}>
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
