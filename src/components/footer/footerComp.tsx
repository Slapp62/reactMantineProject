import { Box, Flex, Text } from '@mantine/core';
import { Logo } from '../Logo/logo';


export function MyFooter() {
  
  return (
    <Box mt={40} h={50} px={20} style={{zIndex: 20}}>
      <hr/>
      <Flex justify='space-between'>
        <Logo />
      
        <Text c='gray'>Created by Simcha Lapp</Text>
      </Flex>
    </Box>
  );
}