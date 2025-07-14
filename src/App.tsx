import ConverterBox from "./ConverterBox";
import MainHeading from "./Heading";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box>
      <Navbar />
      <MainHeading />
      <ConverterBox />
    </Box>
  );
}

export default App;
