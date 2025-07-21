import { Input, InputGroup } from "@chakra-ui/react";
import getSymbolFromCurrency from "currency-symbol-map";

interface IPropType {
  value: string;
  ValueChangeCallback: (e: any) => void;
  currencyCode: string;
}

export const CurrencyInput = ({
  value,
  ValueChangeCallback,
  currencyCode,
}: IPropType) => {
  const handlechange = (e: any) => {
    ValueChangeCallback(e.target.value);
  };

  return (
    <InputGroup startElement={getSymbolFromCurrency(currencyCode)}>
      <Input
        placeholder="1.00"
        variant={"flushed"}
        type="text"
        value={value}
        onChange={handlechange}
         minW={'60%'}
      />
    </InputGroup>
  );
};
