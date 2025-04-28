import { BackgroundImage, Center, Text, Box, Overlay } from '@mantine/core';

export function Hero() {
    return (
    <Box mb={50}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        mih={500}
        style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}
      >
      
      <Center maw={600} pos='relative'  style={{borderRadius: "20px"}}>
          <Overlay pos='absolute'  color="#000" backgroundOpacity={0.80} blur={2} zIndex={1} radius="lg"/>
          <Text 
            p={35}
            c="white"
            fw='bold'
            fz={30}
            style={{zIndex: 2}}>
              Make a card for your business!
          </Text>
      </Center>

      </BackgroundImage>
    </Box>
  );
}
