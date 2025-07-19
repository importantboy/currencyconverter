import { Box, Heading, Text } from "@chakra-ui/react";
import getSymbolFromCurrency from "currency-symbol-map";
import { useCrStore } from "./store/CurrencyStore";
import { useQuery } from "@tanstack/react-query";
import { convertCurrencies } from "./Api/CurrencyListApi";
function CurrencyDetails() {
  const { base_cr, target_cr } = useCrStore((state) => state);

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ["set_currencies" , base_cr.code , target_cr.code],
    queryFn: () => convertCurrencies(base_cr.code, target_cr.code, "1"),
    refetchOnWindowFocus : false ,
  });
  // console.log(data);
  const conversion_result = isFetched && data?.conversion_result;
  return (
    <Box
      w={"full"}
      display={"flex"}
      justifyContent={"center"}
      flexDir={"column"}
      alignItems={"center"}
      height={"100%"}
      textAlign={"center"} // corrected this prop
      p={"4"}
    >
      <Heading as={"h2"} fontSize={"40px"}>
        {1} {getSymbolFromCurrency(base_cr.code)}
      </Heading>
      {/* <Text>Country: {}</Text> */}
      <Text fontSize={'25px'} fontWeight={'800'}>
        Exchange Rate: 1 {getSymbolFromCurrency(base_cr.code)} = {" "}
        {isFetching ? "loading" : isFetched && conversion_result?.toFixed(2) }{" "}
        {getSymbolFromCurrency(target_cr.code)}
      </Text>
    </Box>
  );
}

export default CurrencyDetails;
