import { Box, Flex, Text } from '@mantine/core';
import { Logo } from '../Logo/logo';
import { Link } from 'react-router-dom';
import { IconCopyright } from '@tabler/icons-react';


export function Footer() {
  
  return (
    <Box h={60} px={20} style={{zIndex: 20}}>
      <hr/>
      <Flex justify='space-between'>
        <Logo />

        <Flex align='center' gap={4}>
          <IconCopyright size={15} color='gray'/>

          <Link 
            to='https://slapp62.github.io/portfolio_site/' 
            target='_blank' 
            style={{ textUnderlineOffset: '2px' }}
          >
            <Text c='gray'>Created by Simcha Lapp</Text>
          </Link>
        </Flex>
        
      </Flex>
    </Box>
  );
}