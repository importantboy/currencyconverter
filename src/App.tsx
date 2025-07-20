import ChartHistory from "./ChartHistory";
import ConverterBox from "./ConverterBox";
import CurrencyDetails from "./CurrencyDetails";
import MainHeading from "./Heading";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";
function App() {
  return (
    <Box>
      <Navbar />
      <MainHeading />
      <Box
        h={"50vh"}
         flexDir={'row'}
         display={'flex'}
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
