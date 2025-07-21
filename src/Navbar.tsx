import { Box,  Heading, HStack, Link } from "@chakra-ui/react";

function Navbar() {
  return (
    <Box
      bgColor={"white"}
      height={"12vh"}
      display={"flex"}
      alignItems={"center"}
      px={"5"}
    >
      <Heading
        as={"h2"}
        color={"black"}
        className="heading-font"
        fontSize={"24px"}
        display={'inline-flex'}
        w={'1/2'}
      >
        currency converter
      </Heading>
      <HStack
        textTransform={"capitalize"}
        justify={"center"}
        align={"center"}
        height={"100%"}
        fontWeight={"500"}
        w={"full"}
        fontSize={'18px'}
      >
        <Link color={"black"}>home</Link>
      </HStack>
    </Box>
  );
}

export default Navbar;
