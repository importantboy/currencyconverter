import { Box, Button, HStack } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { getCurrencyHistory } from "./Api/CurrencyListApi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const generateFullYearDates = () => {
  const startYear = 2020;
  const currentYear = new Date().getFullYear();
  const dates = [];
  for (let i = startYear; i <= currentYear; i++) {
    dates.push(`${i}/04/04`);
  }
  return dates;
};

const QuerytoFetchCurrencies = () => {
  const yearWithDates = generateFullYearDates();
  return useQueries({
    queries: yearWithDates.map((item) => ({
      queryKey: ["rate", item],
      queryFn: () => getCurrencyHistory("USD", item),
      staleTime: 1000 * 60 * 60, // 1 hour
    })),
  });
};

function ChartHistory() {
  const [displayChart, setDisplayChart] = useState(false);

  const handleChartData = () => {
    setDisplayChart(!displayChart);
  };
  const queryData = QuerytoFetchCurrencies();
  const getQueryData = queryData
    .filter((item) => item.isSuccess && item.data)
    .map((item) => {
      return {
        name: item.data?.fullYearwithDateandMonth.slice(0, 4),
        INR: item.data?.res?.conversion_rates?.INR,
      };
    });

  //   console.log(queryData);

  return (
    <Box
      w={"full"}
      h={"50vh"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
    >
      <HStack justify={"center"}>
        <Button onClick={handleChartData}>chart history </Button>
      </HStack>
      {displayChart && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={getQueryData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Area dataKey={"KRW"} stackId={"1"} />
            <Area dataKey={"SKW"} stackId={"1"} fill="#ff5d3b" />

            <Area type="bump" dataKey="INR" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}

export default ChartHistory;
