import { Input, InputGroup } from "@chakra-ui/react";
import getSymbolFromCurrency from "currency-symbol-map";

interface PropType {
  cr_code: string;
  value: number;
  onChangeval : (value: number) => void;
}

export const CurrencyInput = ({
  cr_code,
  value,
  onChangeval
}: PropType) => {

  return (
    <InputGroup startElement={getSymbolFromCurrency(cr_code)}>
      <Input
        placeholder="1.00"
        variant={"subtle"}
        value={value}
        type="number"
        onChange={e => onChangeval(Number(e.target.value))}
      />
    </InputGroup>
  );
};
