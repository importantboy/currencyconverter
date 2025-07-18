import ConverterBox from "./ConverterBox";
import CurrencyDetails from "./CurrencyDetails";
import MainHeading from "./Heading";
import Navbar from "./Navbar";
import { Box, HStack } from "@chakra-ui/react";

function App() {
  return (
    <Box>
      <Navbar />
      <MainHeading />
      <Box
        h={"50vh"}
         flexDir={'row'}
         display={'flex'}
        sm={{
          flexDir: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ConverterBox />
        <CurrencyDetails />
      </Box>
    </Box>
  );
}

export default App;
