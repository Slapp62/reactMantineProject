import { Box, Flex, Text } from '@mantine/core';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { IconCopyright } from '@tabler/icons-react';


const Footer = () => {
  
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
            style={{ textDecorationLine: 'none' }}
          >
            <Text c='gray'>Created by Simcha Lapp</Text>
          </Link>
        </Flex>
        
      </Flex>
    </Box>
  );
}

export default Footer