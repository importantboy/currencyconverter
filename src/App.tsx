import ChartHistory from "./ChartHistory";
import ConverterBox from "./ConverterBox";
import CurrencyDetails from "./CurrencyDetails";
import MainHeading from "./Heading";
import { Box } from "@chakra-ui/react";
function App() {
  return (
    <Box>
      <MainHeading />
      <Box
        h={"50vh"}
        display={'flex'}
         flexDirection={{base : "column" , md : 'row'}}
         shadow={'md'}
         mx={'5'}
         divideX={'1px'}
      >
        <ConverterBox />
        <CurrencyDetails />
      </Box>
       <Box display={'flex'} justifyContent={'center'}>
          <ChartHistory />
        </Box>
    </Box>
  );
}

export default App;
