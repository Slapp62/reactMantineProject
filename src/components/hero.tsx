import { BackgroundImage, Center, Text, Box, Overlay, Flex } from '@mantine/core';

export function Hero() {
    return (
    <Flex mb={50}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
        h={500}
      >
        <Center m="auto" mt={200} w={300} p="md" pos="relative">
            <Overlay pos="absolute" color="#000" backgroundOpacity={0.40}/>
            <Text my='auto' c="black" size="xl">
                Make a card for your business!
            </Text>
        </Center>

      </BackgroundImage>
    </Flex>
  );
}
    //     <Box mb={50} pos="relative">
    //         <Bac
    //             src="\src\assets\dark-office.jpg"
                
    //             h={500}
    //             alt="picture"
    //         />
    //         <Overlay pos="absolute" color="#000" backgroundOpacity={0.30}/>
    //         <Center inline pos="absolute" color="white" >Hello</Center>
    //     </Box>
    // );
// }