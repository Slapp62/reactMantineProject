import { useSelector } from 'react-redux';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { HeroBackground } from '@/components/Hero/HeroBackground';
import { WelcomeMessage } from '@/components/Hero/WelcomeMessage';
import { SearchBar } from '@/components/Hero/SearchBar';
import { SortControls } from '@/components/Hero/SortControls';
import { FilterControls } from '@/components/Hero/FilterControls';
import { ActionButtons } from '@/components/Hero/ActionButtons';
import { RootState } from '@/store/store';

export function Hero() {
  const isMobile = useMediaQuery('(max-width: 700px)') ?? false;
  const user = useSelector((state: RootState) => state.authSlice.currentUser);

  return (
    <HeroBackground isMobile={isMobile}>
      <WelcomeMessage user={user} />

      <Flex gap={10} align="center" direction={isMobile ? 'column' : 'row'}>
        <SearchBar isMobile={isMobile} />
        <SortControls isMobile={isMobile} />
      </Flex>

      <FilterControls isMobile={isMobile} />

      <ActionButtons user={user} />
    </HeroBackground>
  );
}
