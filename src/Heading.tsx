import { Heading } from "@chakra-ui/react"
function MainHeading() {
  return (
          <Heading
          py={'8'}
        as={"h1"}
        className="header-font"
        fontSize={{base : 'xl' , md : 'lg' , lg : '4xl'}}
        textAlign={"center"}    
         textTransform={'capitalize'}
        lineHeight={"normal"}
      >
        convert & compare <br></br>
        global currencies
      </Heading>
  )
}

export default MainHeading