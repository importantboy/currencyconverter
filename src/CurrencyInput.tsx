import { Input, InputGroup } from "@chakra-ui/react";
import getSymbolFromCurrency from "currency-symbol-map";

interface PropType {
  cr_code: string;
  value: number | string | any;
  onChangeval: (value: number) => void;
}

export const CurrencyInput = ({ cr_code, value, onChangeval }: PropType) => {
  return (
    <InputGroup startElement={getSymbolFromCurrency(cr_code)}>
      <Input
        placeholder="1.00"
        variant={"subtle"}
        value={value === 0 ? "" : value}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          onChangeval(val === "" ? Number("") : Number(val));
        }}
      />
    </InputGroup>
  );
};
