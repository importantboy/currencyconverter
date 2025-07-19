import { Button, Group, VStack } from "@chakra-ui/react";
import { SelectCurrency } from "./SelectCurrency";
import { CurrencyInput as Inputbox } from "./CurrencyInput";
import { GoArrowSwitch } from "react-icons/go";
import { useCrStore } from "./store/CurrencyStore";
import { useQuery } from "@tanstack/react-query";
import { convertCurrencies } from "./Api/CurrencyListApi";
import { useEffect } from "react";
function ConverterBox() {
  const {
    base_cr,
    target_cr,
    setbasecr_value,
    settargetcr_value,
    selectbase_cr,
    selecttarget_cr,
  } = useCrStore((state) => state);

  const { data, isFetched } = useQuery({
    queryKey: ["set_currencies", target_cr.code, base_cr.code],
    queryFn: () => convertCurrencies(base_cr.code, target_cr.code),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  //  return;
  const conversion_rate = isFetched && data?.conversion_rate;
  useEffect(() => {
    setbasecr_value("1");
  }, []);

  useEffect(() => {
     settargetcr_value("loading")
    if (isFetched && conversion_rate) {
       const conversion = Number(base_cr.value) * conversion_rate;
      settargetcr_value(conversion.toFixed(2));
    }
  }, [isFetched, conversion_rate]);

  const handleInputChangeOfBase = (e: any) => {
    setbasecr_value(e);
    if (conversion_rate) {
      const conversion = e * conversion_rate;
      settargetcr_value(conversion.toFixed(2));
    }
  };

  const handleInputChangeOfTarget = (e: any) => {
    settargetcr_value(e);
    if (conversion_rate) {
      const conversion = e / conversion_rate;
      setbasecr_value(conversion.toFixed(2));
    }
  };

  const handleSwap = () => {
    setbasecr_value(target_cr.value.toString());
    settargetcr_value(base_cr.value.toString());

    selectbase_cr(target_cr.code);
    selecttarget_cr(base_cr.code);
  };
  return (
    <VStack w={"full"} align={"center"} justify={"center"}>
      <Group>
        <Inputbox
          value={base_cr.value.toString()}
          ValueChangeCallback={handleInputChangeOfBase}
           currencyCode={base_cr.code}
        />
        <SelectCurrency
          SelectChangeCurrency={(e) => selectbase_cr(e.value)}
          defaultCurrency={base_cr.code}
        />
      </Group>
      <Button
        width={"40px"}
        height={"40px"}
        borderRadius={"50%"}
        my={"20px"}
        rotate={"90deg"}
        transition={"all .2s ease"}
        _hover={{ bg: "gray.400", transform: "rotate(180deg)" }}
        onClick={handleSwap}
      >
        <GoArrowSwitch />
      </Button>

      <Group>
        <Inputbox
          value={target_cr.value.toString()}
          ValueChangeCallback={handleInputChangeOfTarget}
          currencyCode={target_cr.code}
        />
        <SelectCurrency
          SelectChangeCurrency={(e) => selecttarget_cr(e.value)}
          defaultCurrency={target_cr.code}
        />
      </Group>
    </VStack>
  );
}

export default ConverterBox;
