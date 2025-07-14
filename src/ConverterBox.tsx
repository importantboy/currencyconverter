import { Button, Group, VStack } from "@chakra-ui/react";
import { InputList } from "./InputList";
import { CurrencyInput } from "./CurrencyInput";
import { GoArrowSwitch } from "react-icons/go";
import { useCrStore } from "./store/CurrencyStore";
import { useQuery } from "@tanstack/react-query";
import { convertCurrencies } from "./Api/CurrencyListApi";
function ConverterBox() {
  const {
    base_cr,
    target_cr,
    selectbase_cr,
    selecttarget_cr,
    setbasecr_value,
    settargetcr_value,
  } = useCrStore((state) => state);

  const { data, isFetched } = useQuery({
    queryKey: ["set_currencies", base_cr.code, target_cr.code],
    queryFn: () => convertCurrencies(base_cr.code, target_cr.code),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const conversion_rate = isFetched && data?.conversion_rate;

  const handlebasechange = (val: number) => {
    setbasecr_value(val);
    if (conversion_rate) {
      settargetcr_value(Number((val * conversion_rate).toFixed(2)));
    }
  };
  const handletargetchange = (val: number) => {
    settargetcr_value(val);
    if (conversion_rate) {
      setbasecr_value(Number((val / conversion_rate).toFixed(2)));
    }
  };
  const handleswap = () => {
    selectbase_cr(target_cr.code);
    selecttarget_cr(base_cr.code);
    setbasecr_value(target_cr.value);
    settargetcr_value(base_cr.value);

  };
  return (
    <VStack w={"full"} align={"center"} justify={"center"}>
      <Group attached>
        <CurrencyInput
          cr_code={base_cr.code}
          value={base_cr.value}
          onChangeval={handlebasechange}
        />
        <InputList
          setswap={(e) => selectbase_cr(e)}
          get_currency_value={(e) => selectbase_cr(e)}
          default_value={base_cr.code}
        />
      </Group>
      <Button
        width={"40px"}
        height={"40px"}
        borderRadius={"50%"}
        my={"20px"}
        rotate={"90deg"}
        transition={"all .2s ease"}
        _hover={{ bg: "gray.400" , transform: "rotate(180deg)" }}
        onClick={() => handleswap()}
      >
        <GoArrowSwitch />
      </Button>

      <Group attached>
        <CurrencyInput
          onChangeval={handletargetchange}
          value={target_cr.value}
          cr_code={target_cr.code}
        />
        <InputList
         setswap={(e) => selecttarget_cr(e)}
          get_currency_value={(e) => selecttarget_cr(e)}
          default_value={target_cr.code}
        />
      </Group>
    </VStack>
  );
}

export default ConverterBox;
