import { ReactNode } from 'react';
import { BackgroundImage, Box, Center, Flex, Overlay } from '@mantine/core';
import heroImage from '/office-hero.jpg';

type HeroBackgroundProps = {
  children: ReactNode;
  isMobile: boolean;
};

export function HeroBackground({ children, isMobile }: HeroBackgroundProps) {
  return (
    <Box mb={20}>
      <BackgroundImage
        src={heroImage}
        aria-label="office background image"
        mih={400}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Center pos="relative" style={{ borderRadius: '20px', width: isMobile ? '90%' : '60%' }}>
          <Overlay
            pos="absolute"
            color="#000"
            backgroundOpacity={0.8}
            blur={2}
            zIndex={1}
            radius="lg"
          />
          <Flex direction="column" gap={20} p={30} style={{ zIndex: 2 }} w="100%">
            {children}
          </Flex>
        </Center>
      </BackgroundImage>
    </Box>
  );
}