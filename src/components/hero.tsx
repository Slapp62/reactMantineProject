import { BackgroundImage, Center, Text, Box, Overlay, Flex } from '@mantine/core';

export function Hero() {
    return (
    <Flex mb={50}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        h={500}
      >
        <Center m="auto" mt={200} w={300} p="md" pos="relative" style={{borderRadius: "20px"}}>
          <Box pos="relative" px="lg" py="md" style={{borderRadius: "20px"}}>
            <Overlay pos="absolute" color="#000" backgroundOpacity={0.80} zIndex={1} radius="lg"/>
            <Text 
              my='auto' 
              c="white"
              style={{
                position: 'relative',
                zIndex: 2,
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center"}}
            >
                Make a card for your business!
            </Text>
          </Box>
        </Center>

      </BackgroundImage>
    </Flex>
  );
}
